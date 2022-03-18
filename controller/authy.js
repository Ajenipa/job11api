const User = require("../model/UserModel")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError} =  require("../errors")
const {unathenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const login=async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please enter email and Password')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new unathenticatedError('invalid credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new unathenticatedError('invalid credentials')
    }
    const token = user.createJWT()
    return res.status(200).json({user:{name:user.name}, token:token})
   
}
const register=async(req,res)=>{
    //const {name,email,password}= req.body
    // if(!name || !email || !password){
    //     throw new BadRequestError ("Please Enter Your Full Details")
    //     res.status(200).json({data:"please enter password"})
    // }
    //console.log(name,email,password)
   // await User.deleteMany({})
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password,salt)
    // const tempUser = {name,email,password:hashedPassword}
    //await User.deleteMany({})
    const user = await User.create({...req.body})
    
    //const token = await jwt.sign({userID:user._id,name:user.name}, "secret", {expiresIn:'30d'})
    const token = user.createJWT() ///this is obtained from our model(UserModel)
    return res.status(200).json({user:{name:user.name}, token:token})
}
module.exports = {login,register}