
const express = require("express");  
const router = express.Router();   

const booking = require("../models/booking")
const Room = require("../models/room")
router.get('/earningsMonthly', async (req, res) => {
    try {
        const earnings = await booking.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalAmount: { $sum: "$totalamount" },
                },
            },
        ]);
        res.json(earnings);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint to get monthly booking rate
router.get('/bookingsMonthly', async (req, res) => {
    try {
        const bookings = await booking.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalBookings: { $sum: 1 },
                },
            },
        ]);
        res.json(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint to get room-wise booking rate
router.get('/bookingsRoomwise', async (req, res) => {
    try {
        const roomwiseBookings = await booking.aggregate([
            {
                $group: {
                    _id: "$roomId",
                    totalBookings: { $sum: 1 },
                },
            },
        ]);
        res.json(roomwiseBookings);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.post("/bookroom",async(req,res) =>{
    const {
        roomId,   
        name,
        fromdate,
        todate,  
        totalamount,
        totaldays,
        paymentMethod,
        paymentReceived,
        changesGiven
     } = req.body;
    console.log(name);
    try {
        const newBooking = new booking({
            roomId : roomId,   
            name : name,  
            fromdate : fromdate,  
            todate : todate,
            totalamount : totalamount, 
            totaldays : totaldays,
            paymentMethod : paymentMethod,  
            paymentReceived : paymentReceived,
            changesGiven : changesGiven
        });
        // console.log(newBooking);
        const book = await newBooking.save();
        const roomtemp = await Room.findOne({roomId : roomId});
        console.log(book._id);
        
        roomtemp.currentBookings.push({
            bookingid : book._id, 
            fromdate : fromdate, 
            todate : todate,    
            name : name,
        });
        // console.log(x);
        await roomtemp.save();
        return res.send("Room Booked Successfully");
    }catch(error) {
        return res.status(400).json({message : error});
    }
})


module.exports = router;