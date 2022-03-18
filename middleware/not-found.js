const notFound=(req,res,next)=>{
    res.send(`<h1>404 Route Does Not Exist</h1>`)
    next()

}
module.exports = notFound