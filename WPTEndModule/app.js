const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const router=require("./Router/router.js")

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// app.use(req,resp,next,function(){
//     resp.setHeader("Access-Control-Allow-Origin","*");
//     resp.setHeader("Access-Control-Allow-Methods",'(GET,POST,PUT,DELETE)');
//     resp.setHeader("Access-Control-Allow-Headers",'ALL');
//     resp.setHeader("Access-control-Allow-Credentials",true)

// })

app.use("/",router)

app.listen("3002",()=>{
    console.log("coonnected with 3002 port")
})
module.exports=app;