const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    roomId : {
        type : String,  
        required : true,  
        unique : true, 
    },
    maxcount : {
        type : Number,  
        required : true,   
    },
    rentPerDay : {
        type : Number,     
        required : true,
    },    
    imageUrls : [],  
    currentBookings : [],   
    type : {
        type : String, 
        required : true,
    },   

},{
    timestamps : true,
})

const roomModel = mongoose.model('rooms',roomSchema)

module.exports = roomModel