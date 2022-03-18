const express = require('express')
const jobRouter = express.Router()
const {getAlljobs,getJob,createJob,deleteJob,updateJob} =require("../controller/jobs")
jobRouter.route("/").get(getAlljobs).post(createJob)
jobRouter.route("/:id").get(getJob).patch(updateJob).delete(deleteJob)
module.exports = jobRouter