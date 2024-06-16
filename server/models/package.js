const mongoose = require('mongoose')
const packageSchema = mongoose.Schema({
    name : {
        type : String,  
        required : true,   
        unique : true,
    },
    costPerHour : {
        type : Number,
        required : true,   
    }

},{
    timestamps : true,
})
const packageModel = mongoose.model('packages',packageSchema)

module.exports = packageModel