
const express = require("express");  
const router = express.Router();   

const ticketbooking = require("../models/ticketBook")
router.get('/packageEarnings', async (req, res) => {
    try {
        const earnings = await ticketbooking.aggregate([
            { $unwind: '$packages' },
            {
                $group: {
                    _id: {
                        packageId: '$packages.id',
                        packageName: '$packages.name'
                    },
                    totalEarnings: { $sum: '$packages.charge' }
                }
            },
            {
                $project: {
                    _id: 0,
                    packageId: '$_id.packageId',
                    packageName: '$_id.packageName',
                    totalEarnings: 1
                }
            },
            { $sort: { totalEarnings: -1 } }
        ]);

        res.json(earnings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/packageSalesMonthly', async (req, res) => {
    try {
        const sales = await ticketbooking.aggregate([
            { $unwind: '$packages' },
            {
                $group: {
                    _id: { 
                        month: { $month: '$createdAt' }, 
                        year: { $year: '$createdAt' },
                        packageId: '$packages.id',
                        packageName: '$packages.name'
                    },
                    totalSold: { $sum: 1 },
                    totalEarnings: { $sum: '$packages.charge' }
                }
            },
            {
                $group: {
                    _id: {
                        month: '$_id.month',
                        year: '$_id.year'
                    },
                    packages: {
                        $push: {
                            packageId: '$_id.packageId',
                            packageName: '$_id.packageName',
                            totalSold: '$totalSold',
                            totalEarnings: '$totalEarnings'
                        }
                    }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/earningsMonthly', async (req, res) => {
    try {
        const earnings = await ticketbooking.aggregate([
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
router.get('/monthly', async (req, res) => {
    try {
        const ticketPurchases = await ticketbooking.aggregate([
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
router.post("/addticket",async(req,res) =>{
    const { packages, name, totalamount, paymentMethod, paymentReceived, changesGiven } = req.body;

    const newTicket = new ticketbooking({
        packages,
        name,
        totalamount,
        paymentMethod,
        paymentReceived,
        changesGiven
    });

    try {
        
        // console.log(newBooking);
        const book = await newTicket.save();
        return res.send("ticket purchased successfully");
    }catch(error) {
        return res.status(400).json({message : error});
    }
})


module.exports = router;