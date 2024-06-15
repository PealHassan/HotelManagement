import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Bookingscreen() {
  const navigate = useNavigate();
  const { roomid, fromdate, todate } = useParams();
  const [room, setRoom] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentReceived, setPaymentReceived] = useState('');
  const [changesGiven, setChangesGiven] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fromDateMoment = moment(fromdate, 'DD-MM-YYYY');
  const toDateMoment = moment(todate, 'DD-MM-YYYY');
  const totaldays = moment.duration(toDateMoment.diff(fromDateMoment)).asDays() + 1;



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const x = {
          id: roomid,
        };
        const dat = await axios.post(`${window.location.origin}/api/rooms/getroombyid`, x);
        setRoom(dat.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.error(error);
      }
    };

    fetchData();
  }, [roomid]);
  const sendDocument = () => {
    const bookinginfo = {
      'bookingId' : roomid,
      'name' : customerName,
      'fromdate' : fromdate,  
      'todate' : todate,   
      'roomid' : room.roomId,   
      'type' : room.type,  
      'maxcount' : room.maxcount,   
      'totaldays' : totaldays,
      'rentperday' : room.rentPerDay, 
      'totalamount' : room.rentPerDay*totaldays,  
      'paymentMethod' : paymentMethod,  
      'paymentReceived' : paymentReceived,  
      'chargesGiven' : changesGiven
    }
    navigate('/printbookingdocument', { state: { bookinginfo } });
  };

  async function BookRoom() {
    setLoading(true);
    const bookingDetails = {
      roomId: room.roomId,
      name: customerName,
      fromdate,
      todate,
      totalamount: room.rentPerDay * totaldays,
      totaldays,
      paymentMethod,
      paymentReceived,
      changesGiven
    };
    
    

    try {
      const result = await axios.post(`${window.location.origin}/api/booking/bookroom`, bookingDetails);
      console.log(result.data);
      setLoading(false);
      Swal.fire({
        title: "Success",
        text: "Room Booked Successfully",
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          sendDocument();
        }
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Failed to book the room. Please try again.",
        icon: "error"
      });
    }
  }

  return (
    <div className="m-5 mt-5">

      {loading ? (
        <h1><Loader /></h1>
      ) : error ? (
        <h1><Error message="Something went wrong. Please try again later." /></h1>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5">
              <h1>{room.roomId}</h1>
              <div style={{ textAlign: 'left' }}>
                <h2 id="book">Booking Details</h2>
                <hr />
                <b>
                  <p>Name: <input type="text" className="form-control" value={customerName} onChange={(e) => setCustomerName(e.target.value)} /></p>
                  <p>Room Type: {room.type}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h2 id="book">Amount</h2>
                <hr />
                <b>
                  <p>Total Days: {totaldays}</p>
                  <p>Rent Per Day: {room.rentPerDay} BDT</p>
                  <p>Total Amount: {room.rentPerDay * totaldays} BDT</p>
                </b>
              </div>
              <div style={{ textAlign: 'left' }}>
                <h2 id="book">Payment</h2>
                <hr />
                <b>
                  <p>Payment Method: <input type="text" className="form-control" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} /></p>
                  <p>Payment Received: <input type="Number" className="form-control" value={paymentReceived} onChange={(e) => setPaymentReceived(e.target.value)} /></p>
                  <p>Changes Given: <input type="Number" className="form-control" value={changesGiven} onChange={(e) => setChangesGiven(e.target.value)} /></p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <button className="btn btn-primary" onClick={BookRoom}>Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Bookingscreen;
