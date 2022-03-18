const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, "please enter company's name "],
        maxlength:100
    },
    position:{
        type:String,
        required:[true, "please enter position"],
        maxlength:100
    },
    status:{
        type:String,
        enum:["Pending", "Interview","declined"],
        default:'Pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User' ,///the name of the model you want to get the user from
        required:[true,"enter user"],
    },
},{timestamps:true})
module.exports = mongoose.model('Job', jobSchema)

