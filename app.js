
require("dotenv").config()
require('express-async-errors')
const rateLimiter = require("express-rate-limit")
const xss = require("xss-clean")
const helmet = require('helmet')
const cors = require('cors')
const authenticateUser = require("./middleware/auth")
const express =  require("express")
const connectDB = require("./db/connect")
const notFoundMiddleWare = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const jobRouter = require("./route/jobs")
const authRouter = require("./route/authy")
const app = express()
const port = process.env.PORT

app.get("/hellova", (req,res)=>{
    res.send("hello there")
})
//middleware
app.set('trust proxy', 1) //required, since we are pushing to heroku
app.use(rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
);
app.use(express.json())
app.use(xss())
app.use(helmet())
app.use(cors())
app.use("/api/v1/jobs",authenticateUser, jobRouter)
app.use("/api/v1/auth", authRouter)


app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleware) 

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("ok")
        app.listen(port, ()=>{
            console.log(`listening on port ${port} `)
        })


    }
    catch(error){
        console.log(error)

    }
}
start()
