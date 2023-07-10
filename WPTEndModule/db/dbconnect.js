// const bodyparser = require("body-parser")
const mysql=require("mysql")

const connection=mysql.createConnection({
    "host":"127.0.0.1",
    "user":"root",
    "password":"root123",
    "database":"test",
    "port":3306
})

connection.connect((err)=>{
    if(err)
    {
        console.log("Not connected"+JSON.Stringify(err))
    }
    else{
        console.log("Database connected successfully")
    }
})

module.exports=connection