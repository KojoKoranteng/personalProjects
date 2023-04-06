const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    
    title:{type:String, required:true, trim: true},
    author:{type:mongoose.SchemaTypes.ObjectId, ref:"User"},
    //dateCreated: Date,
    isComplete: Boolean 
   
},{
    timestamps:true,
    versionKey:false
})

const Task = mongoose.model("Task", taskSchema)
module.exports = Task