const express=require("express")
const router=express.Router()
const bodyparser = require("body-parser")
const connection=require("../db/dbconnect")

router.get("/doctors",(req,resp)=>{
    connection.query("select * from Doctor",(err,data)=>{
        if(err)
        {
            resp.status(500).send("data not found"+JSON.stringify(err))
        }
        else{
            resp.send(data)
        }
    })
})

router.post("/doctors/doctor/",function(req,resp){
    var Doctor_name=req.body.Doctor_name
    var specialist=req.body.specialist
    var contact_details=req.body.contact_details
    var city =req.body.city
    var fees=req.body.fees

    connection.query("insert into Doctor values(?,?,?,?,?)",[Doctor_name,specialist,contact_details,city,fees],(err,result)=>{
        if(err)
        {
            resp.status(500).send("data not inserted")
        }
        else{
            if(result.affectedRows> 0)
            resp.send("{'msg':'inserted successfully'}")
            else
            resp.send("{'msg':'not inserted '}")
        }
    })
})

router.put("/doctors/doctor/:Doctor_name",(req,resp)=>{
    var Doctor_name=req.body.Doctor_name
    var specialist=req.body.specialist
    var contact_details=req.body.contact_details
    var city =req.body.city
    var fees=req.body.fees

    connection.query("update Doctor set specialist=?,contact_details=?,city=?,fees=? where Doctor_name=?",[specialist,contact_details,city,fees,Doctor_name],(err,result)=>{
      console.log(result);
      if(err){
          resp.status(500).send("data not updated")
      }
      else{
        if(result.affectedRows> 0)
        resp.send("{'msg':'update successfully'}")
     else
     resp.send("{'msg':'not updated '}")
      }
    })
  })

  router.delete("/doctors/doctor/:Doctor_name",(req,resp)=>{
    connection.query("delete from Doctor where Doctor_name=?",[req.params.Doctor_name],(err,result)=>{
      console.log(result);
      if(err){
          resp.status(500).send("data not deleted")
      }
      else{
        if(result.affectedRows> 0)
        resp.send("{'msg':'deleted successfully'}")
     else
     resp.status(500).send("{'msg':'not deleted '}")
      }
    })
  })

module.exports=router