const express = require('express');
const path = require('path');
const app = express();  
const cors = require('cors'); 
const dbconfig = require('./db');
const usersRoute = require('./routes/userRoute');
const roomsRoute = require('./routes/roomRoute');
const bookRoute = require('./routes/bookingRoute');
const packageRoute = require('./routes/packageRoute');
const ticketbookRoute = require('./routes/ticketbookingRoute');
module.exports = app;
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors(
    {
        origin : ["https://hotel-management-five-steel.vercel.app"],
        methods : ["POST","GET"],
        credentials : true
    }
));
// API Routes
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/booking', bookRoute);
app.use('/api/packages', packageRoute);
app.use('/api/ticketbook', ticketbookRoute);
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });

const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Node server started on port ${port}`));
