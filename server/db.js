const mongoose = require("mongoose");
require('dotenv').config();
var mongoUrl = process.env.MONGO_URI;

mongoose.connect(mongoUrl);

var connection = mongoose.connection;

connection.on('error', () => {
    console.log(`Mongo DB connection Failed`);  
})

connection.on('connected', ()=> {
    console.log(`Monge DB connected Successfully`);
})

module.exports = mongoose