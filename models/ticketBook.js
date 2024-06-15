const mongoose = require('mongoose');
const ticketBookSchema = mongoose.Schema({
    packages : [
        {
            id: String,
            name: String,
            costPerHour: Number,
            totalHours: Number,
            charge: Number
        }
    ],
    name : {
        type : String,   
        required : true,  
    },
    totalamount : {
        type : Number,  
        required : true,   
    },
    paymentMethod : {
        type : String,  
        required : true,    
    },
    paymentReceived : {
        type : Number,   
        required : true,    
    },   
    changesGiven : {
        type : Number, 
        required : true,  
    }

    
}, {
    timestamps : true,  
})

const ticketBookModel = mongoose.model('ticketBookings',ticketBookSchema);

module.exports = ticketBookModel