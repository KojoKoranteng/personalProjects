const express = require("express")
const router = express.Router();

const Task = require("../models/TaskModel")

//Endpoints for Tasks

router.get("/tasks", async (req,res)=>{
   
    let tasks = await Task.find({});

   try {
     if(!tasks){
        res.status(404).send("Tasks not found")
    }
      return res.status(200).send(tasks)

   } catch (error) {
    return res.status(500).send(error)
   }
})

router.get("/tasks/:id", async(req,res)=>{
    let taskId = req.params.id;

    let result = await Task.findById(taskId)
    
    //this is the same as code on line 45
    //let result = await Task.find({_id:taskId})

    try {
        if(result){
            res.status(201).send({data: result, message:"success"})
        }else{
            res.status(400).send("Task not found")
        }
    } catch (error) {
        res.status(500).send(error)
    } 
})

router.post("/addTask", async (req,res)=>{
    let newTask = new Task({...req.body, dateCreated: new Date(),isComplete:false})
    try {
        if(!newTask){
            return res.status(400).send()
        }
        await newTask.save();
        res.send({data:newTask, message:"New task created"})
    } catch (error) {
        return res.status(500).send(error.errors.title.message);
    }
})

router.put("/updateTask/:id", async (req,res)=>{

    let taskId = req.params.id
    //let taskToUpdate = Task.findById(taskId)

    let updatedTask =  req.body

    let taskToUpdate = await Task.findByIdAndUpdate(taskId,{...updatedTask}) 

    if(!taskToUpdate){
        res.status(400).send({message:"update success"})
    }else{
        return res.status(200).send({data:taskToUpdate})
    }
})

module.exports =  router;