const mongoose = require("mongoose")
require('dotenv').config()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        minlength:3,
        maxlength:500

    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your PassWord"],
        minlength:2,
        maxlength:100


    }
})
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(10)
    this.password = await  bcrypt.hash(this.password, salt)

    next()
})
userSchema.methods.createJWT = function (){
    return jwt.sign({userID:this._id, name:this.name}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFE})

}
userSchema.methods.comparePassword = async function (userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch

}
module.exports = mongoose.model('User', userSchema)