const express = require('express');
// const path = require('path');
const app = express();  
// const dbconfig = require('./db');
// const usersRoute = require('./routes/userRoute');
// const roomsRoute = require('./routes/roomRoute');
// const bookRoute = require('./routes/bookingRoute');
// const packageRoute = require('./routes/packageRoute');
// const ticketbookRoute = require('./routes/ticketbookingRoute');

// const cors = require('cors');
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
// app.use(express.json());
app.use('/',(req,res) => {
  res.send("server is running");
})
// require('dotenv').config();

// app.use('/api/rooms', roomsRoute);
// app.use('/api/users', usersRoute);
// app.use('/api/booking', bookRoute);
// app.use('/api/packages', packageRoute);
// app.use('/api/ticketbook', ticketbookRoute);

// const port = process.env.PORT || 5000;
// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });



app.listen(5000, () => console.log(`Node server started on port 5000`));
// module.exports = app; 

