const Job = require("../model/JobsModel")
const {StatusCodes} = require('http-status-codes')
const { NotFoundError } = require("../errors")

const getAlljobs=async(req,res)=>{
    const user = req.user.userID
    const jobs = await Job.find({createdBy:user})
    res.status(StatusCodes.OK).json({jobs, nbHit:jobs.length})

}
const getJob = async (req,res)=>{
    const {id:jobID} = req.params ///SAME AS we set jobID = req.params.id
    const {userID:user} = req.user //SAME AS WE SET user = req.user.userID
    const job = await Job.findOne({_id:jobID,user})
    if(!job){
        throw new NotFoundError(`the ID ${jobID} does not exist`)

    }
    console.log(jobID, "ok")
    res.status(StatusCodes.OK).json({job, nbHit:job.length})
   
}
const createJob = async (req,res)=>{
     req.body.createdBy = req.user.userID ///attaching created by to the body, so it can be displayed
     //await Job.deleteMany({})
     const job = await Job.create(req.body)
     //console.log(req.body, job)
     res.status(StatusCodes.OK).json({job})
    //return res.send("cjobsa")

}
const deleteJob = async(req,res)=>{
    const {
        params:{id:jobID},
        user:{userID:user}
    } = req
    //or
    // const {id:jobID} =  req.params
    // const {userID:user} = req.user
     const job = await Job.findByIdAndRemove({_id:jobID,createdBy:user})
     if(!job){
        throw new NotFoundError(`THE ID ${jobID} DOES NOT EXIST`)
    }
    //console.log(jobID,user)
    res.status(StatusCodes.OK).send("ok")

}
const updateJob = async(req,res)=>{
    const {id:jobID} =  req.params
    const {userID:user} = req.user
    const {company,position} = req.body
    const job = await Job.findByIdAndUpdate({_id:jobID,createdBy:user},req.body,{new:true,runValidators:true})
    if(!job){
        throw new NotFoundError(`THE ${jobID} DOES NOT EXIST`)
    }
    res.status(StatusCodes.OK).json({job})

}

module.exports = {getAlljobs,getJob,createJob,deleteJob,updateJob}