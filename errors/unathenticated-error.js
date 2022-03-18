const customApiError = require("./custom-error")
const {StatusCodes} = require('http-status-codes')
class unathenticatedError extends customApiError {
    constructor(message,statusCode){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}
module.exports = unathenticatedError