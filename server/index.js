const express = require('express');
// const path = require('path');
require('dotenv').config();
const app = express();  
const dbconfig = require('./db');
const usersRoute = require('./routes/userRoute');
const roomsRoute = require('./routes/roomRoute');
const bookRoute = require('./routes/bookingRoute');
const packageRoute = require('./routes/packageRoute');
const ticketbookRoute = require('./routes/ticketbookingRoute');

const cors = require('cors');
dbconfig();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
// app.use('/',(req,res) => {
//   res.send("server is running");
// })


app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/booking', bookRoute);
app.use('/api/packages', packageRoute);
app.use('/api/ticketbook', ticketbookRoute);

const port = process.env.PORT;
// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });



app.listen(port, () => console.log(`Node server started on port ${port}`));
// module.exports = app; 

