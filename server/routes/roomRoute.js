const express = require("express");  
const router = express.Router();   

const room = require("../models/room")
router.get('/total', async (req, res) => {
    try {
        const totalRooms = await room.countDocuments({});
        res.json({ totalRooms });
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/totalDelux', async (req, res) => {
    try {
        const totalRooms = await room.countDocuments({type : "Delux"});
        res.json({ totalRooms });
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/totalNonDelux', async (req, res) => {
    try {
        const totalRooms = await room.countDocuments({type : 'Non-Delux'});
        res.json({ totalRooms });
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/addRoom",async(req,res) =>{
    const { roomId, maxcount, rentPerDay, imageUrls, type } = req.body;

    const newRoom = new room({
        roomId,
        maxcount,
        rentPerDay,
        imageUrls,  
        currentBookings: [],
        type
    });
    // console.log(newRoom);
    try {
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);  // Return the saved room
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
})
router.get("/getallrooms",async(req,res) =>{
    res.send("we entered room");
    // try {
    //     const rooms = await room.find({})
    //     return res.send(rooms)
    // }catch(error) {
    //     return res.status(400).json({message : error});
    // }
})
router.post("/getroombyid",async(req,res) =>{
    const roomid = req.body.id;
    try {
        const rooms = await room.findOne({_id : roomid})
        console.log(`yes i am here ${rooms}}`);
        return res.send(rooms)
    }catch(error) {
        console.log(error)
        return res.status(400).json({message : error});
    }
})

module.exports = router;