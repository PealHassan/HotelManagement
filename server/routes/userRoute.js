const express = require("express");  
const router = express.Router();   

const User = require("../models/user")

router.post("/register",async(req,res) =>{
    const newuser = new User(req.body)
    // console.log(req.body)
        
        try {
            const user = await newuser.save()
            return res.status(201).json({ message: "User registered successfully" });
        }catch(error) {
            return res.status(400).json({ message: "User not registered", error: error.message });
        }
    
})

router.post("/login",async(req,res) =>{
    const {email,password} = req.body
    console.log(req.body)
    try {
        const user = await User.findOne({email : email,password : password})
        
        if(user) {
            const temp = {
                name : user.name,  
                email : user.email,
                isAdmin : user.isAdmin,
                _id : user._id
            }
            res.send(temp)
        }
        else {
            return res.status(400).json({message : "Wrong credentials"});

        }
        
    }catch(error) {
        return res.status(400).json({message : "Error Occured"});
    }
})

module.exports = router;