const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.DB_CONNECTION_STRING
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log("Connection successful")
}).catch((error)=>{
    console.log(error)
})