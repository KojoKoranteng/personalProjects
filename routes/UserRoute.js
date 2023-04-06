const express = require("express");
const router = express.Router();

const User = require("../models/UserModel")

router.get("/users", async (req,res)=>{

    let users = await User.find({})

    try {
        if(!users){
            res.status(400).send("Users not found")
        } else{
           return res.send({data: users, message: "success"})
        }
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.get("/user/:id", async (req,res)=>{
    let userId = req.params.id
    let result = await User.findById(userId)

    try {
        if(!result){
            res.status(400).send("User not found")
        }else{
            res.status(200).send({data:result, message:"Success"})
        }

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post("/auth/login", async (req, res) => {
    
    try {
        const user = await User.findByCredential(req.body.email, req.body.password)

        if (user) {
            return res.status(200).send(user);
        } else {
            res.send("user not found")
        }

    } catch(error) {
        res.send(error)
    }
})

router.post("/createUser", async (req,res)=>{
    let newUser = new User(req.body)

    try {
        if(!newUser){
            return res.status(400).send("User addition failed");
        } else{
            await newUser.save();
            res.send({data:newUser, message:"New user created"})
        }
        
    } catch (error) {
        return res.status(500).send(error);
    }
    
})

router.put("/updatedUser/:id", async(req,res)=>{
    let userId = req.params.id

    let updatedUser = req.body

    let userToUpdate = await User.findByIdAndUpdate(userId,{...updatedUser})

    try {
        if(!userToUpdate){
            res.status(404).send("User not found")
        }else{
            res.status(200).send({data: updatedUser})
        }
    } catch (error) {
        res.status(500).send(error)
    }
    
})

module.exports =  router;