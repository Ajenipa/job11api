const {CustomAPIerror} = require("../errors")
const {StatusCodes} =  require("http-status-codes")
const errorHandlerMiddleware=(err,req,res,next)=>{
    console.log(err)
    let customError = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || "Something Went Wrong, Try"
    }
    // if(err instanceof CustomAPIerror){
    //     return res.status(err.statusCode).json({msg:err.message})

    // }
    if(err.name === 'ValidatorError' ){
        customError.msg = Object.values(err.errors).map((item)=>
        item.message).join(",")
        customError.statusCode = 400

    }
    if(err.code && err.code === 11000){
        customError.msg = `Duplicate Value Entered for ${Object.keys(err.keyValue)} & ${err.keyValue} field, Please Enter Another Value`,
        customError.statusCode = 400
    }
    if(err.name === "CastError"){
        customError.msg = `Item with id :${err.value._id} does not exist`,
        customError.statusCode = 404
    }
    
    return res.status(customError.statusCode).json({msg:customError.msg})
    //return res.status(customError.statusCode).json({err})   remove  the "//" to get the full error from mongoose
    

}
module.exports = errorHandlerMiddleware


//below is an automated mongoose error
// {
//     "err": {
//         "errors": {
//             "name": {
//                 "name": "ValidatorError",
//                 "message": "Please Enter Your Name",
//                 "properties": {
//                     "message": "Please Enter Your Name",
//                     "type": "required",
//                     "path": "name"
//                 },
//                 "kind": "required",
//                 "path": "name"
//             }
//         },
//         "_message": "User validation failed",
//         "name": "ValidationError",
//         "message": "User validation failed: name: Please Enter Your Name"
//     }
// }

///////mongooose error for invalid id

// {
//     "err": {
//         "stringValue": "\"{ _id: '6225', createdBy: '6226c8f62855ad25390a734f' }\"",
//         "valueType": "Object",
//         "kind": "ObjectId",
//         "value": {
//             "_id": "6225",
//             "createdBy": "6226c8f62855ad25390a734f"
//         },
//         "path": "_id",
//         "reason": {},
//         "name": "CastError",
//         "message": "Cast to ObjectId failed for value \"{ _id: '6225', createdBy: '6226c8f62855ad25390a734f' }\" (type Object) at path \"_id\" for model \"Job\""
//     }
// }