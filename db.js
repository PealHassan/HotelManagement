const mongoose = require("mongoose");

var mongoUrl = 'mongodb+srv://pealhassan:kvzoszhhzm@hotelmanagement.j8lqtgl.mongodb.net/?retryWrites=true&w=majority&appName=HotelManagement/Rooms';

mongoose.connect(mongoUrl);

var connection = mongoose.connection;

connection.on('error', () => {
    console.log(`Mongo DB connection Failed`);  
})

connection.on('connected', ()=> {
    console.log(`Monge DB connected Successfully`);
})

module.exports = mongoose