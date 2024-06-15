const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    roomId : {
        type : String,
        required : true,  
    },
    name : {
        type : String,   
        required : true,  
    },
    fromdate : {
        type : String,   
        required : true,    
    },
    todate : {
        type : String,   
        required : true,
    },
    totalamount : {
        type : Number,  
        required : true,   
    },
    totaldays : {
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

const bookingModel = mongoose.model('bookings',bookingSchema);

module.exports = bookingModel