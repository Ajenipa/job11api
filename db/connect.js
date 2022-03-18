const mongoose = require('mongoose')
connectDB=(uri)=>{
    mongoose.connect(uri)

}
module.exports = connectDB