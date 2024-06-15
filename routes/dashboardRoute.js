const express = require('express');
const router = express.Router();   

const Room = require('../models/room');
const Booking = require('../models/booking');
const TicketBooking = require('../models/ticketBook');
const User = require('../models/user');


// Endpoint to get total rooms


// Endpoint to get monthly total earnings


// Endpoint to get monthly ticket purchasing rate
router.get('/api/tickets/monthly', async (req, res) => {
    try {
        const ticketPurchases = await TicketBooking.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalTickets: { $sum: { $size: "$packages" } },
                },
            },
        ]);
        res.json(ticketPurchases);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
