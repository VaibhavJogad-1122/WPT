const express = require("express")
const router = express.Router()
const connection = require("../db/dbconnect")

router.get("/employees", (req,resp)=>{
    connection.query("select * from employee",(err,data)=>{
        if(err)
        {
            resp.status(500).send("data not found"+JSON.stringify(err))
        }
        else
        {
            resp.send(data)
        }
    })

})

router.get("/employees/employee/:empid",(req,resp)=>{
    connection.query("select * from employee where empid=?",[req.params.empid],(err,data)=>{
        if(err)
        {
            resp.status(500).send("Data not found "+JSON.stringify(err))
        }
        else
        {
            resp.send(data[0])
        }
    })
})

router.post("/employees/employee/:empid",(req,resp)=>{
   var empid = req.body.empid
   var ename = req.body.ename
   var sal = req.body.sal
    connection.query("insert into employee values(?,?,?)",[empid,ename,sal],(err,result)=>{
        if(err)
        {
            resp.status(500).send("Data not inserted")
        }
        else
        {
            if(result.affectedRows > 0)
            {
                resp.send("{'msg':'inserted successfully'}")
            }
            else{
                resp.send("{'msg':'not inserted'}")
            }
        }
   })
})

router.put("/employees/employee",(req,resp)=>{
   var empid = req.body.empid
   var ename = req.body.ename
   var sal = req.body.sal
   connection.query("update employee set ename=?,sal=? where empid=?",[ename,sal,empid],(err,result)=>{
        if(err){
            resp.status(500).send("Data not updated")
        }
        else{
            if(result.affectedRows>0)
            {
                resp.send("{'msg':'Data updated successfully'}")
            }
            else{
                resp.send("{'msg':'Data not updtaed'}")
            }
        }
   })
})

router.delete("/employees/employee/:empid",(req,resp)=>{
    connection.query("delete from employee where empid=?",req.params.empid,(err,result)=>{
        if(err){
            resp.status(500).send("Data is not deleted"+JSON.stringify(err))
        }
        else{
            if(result.affectedRows>0)
            {
                resp.send("{'msg':'Data is deleted successfully'}")
            }
            else{
                resp.send("{'msg':'Data is not deleted'}")
            }
        }
    })
})

module.exports=router