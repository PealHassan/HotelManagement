const express = require("express");  
const router = express.Router();   

const Package = require("../models/package")

router.post("/addpackage",async(req,res) =>{
   
    const newpackage = new Package(req.body)
    // console.log(req.body)
        
        try {
            const package = await newpackage.save()
            return res.send(package)
        }catch(error) {
            return res.status(400).json({ message: "Package Not added", error: error.message });
        }
    
})
router.get("/getallpackages",async(req,res) =>{
   
    // console.log(req.body)
        
        try {
            const packages = await Package.find({})
            return res.send(packages)
        }catch(error) {
            return res.status(400).json({ message: "Something Went Wrong fetching packages", error: error.message });
        }
    
})


module.exports = router;