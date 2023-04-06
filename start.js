//express allows you to create a server
const express = require("express")
const app = express()
require("./db/DB_CONNECTION")

const taskRouter = require("./routes/TaskRouter")
const userRouter = require("./routes/UserRoute")

//middleware that allows to pass json
app.use(express.json())

app.use(taskRouter)
app.use(userRouter)
//const {v4} = require("uuid")



require("dotenv").config()

const port = process.env.PORT

app.listen(port, ()=>console.log("App is listening on", port))


app.get("/", (req,res)=>{
    res.send("Welcome to my api")
})





