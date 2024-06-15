import React, { useState, useEffect } from "react";
import Room from '../components/Room';
import axios from "axios";
import 'antd/dist/antd';
import moment from 'moment';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker} from 'antd';
const { RangePicker } = DatePicker;
function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState({});
  const [chosenrooms, setchosenrooms] = useState({});

  const [type, settype] = useState("All");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const { data } = await axios.get(`/api/rooms/getallrooms`);
        setrooms(data);
        setduplicaterooms(data);
        setchosenrooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error(error);
        setloading(false);
      }
    };

    fetchData();
  }, []);
  function filterByDate(Dates) {

    setfromdate(Dates[0].format("DD-MM-YYYY"));
    settodate(Dates[1].format("DD-MM-YYYY"));
    var temprooms = []
    
    for (const room of duplicaterooms) {
      var availability = true;
      if (room.currentBookings.length > 0) {
        
        for (const booking of room.currentBookings) {
          console.log(`I am here ${moment(Dates[0].format("DD-MM-YYYY"),"DD-MM-YYYY").isBetween(
            moment(booking.fromdate, "DD-MM-YYYY"), 
            moment(booking.todate, "DD-MM-YYYY"))} ${room.roomId}`);
          if (
            moment(Dates[0].format("DD-MM-YYYY"),"DD-MM-YYYY").isBetween(
              moment(booking.fromdate, "DD-MM-YYYY"), 
              moment(booking.todate, "DD-MM-YYYY"), 
              
            ) ||
            moment(Dates[1].format("DD-MM-YYYY"),"DD-MM-YYYY").isBetween(
              moment(booking.fromdate, "DD-MM-YYYY"), 
              moment(booking.todate, "DD-MM-YYYY"), 
              
            ) ||
            moment(booking.fromdate, "DD-MM-YYYY").isBetween(
              moment(Dates[0].format("DD-MM-YYYY"),"DD-MM-YYYY"),
              moment(Dates[1].format("DD-MM-YYYY"),"DD-MM-YYYY")
              
            ) ||
            moment(booking.fromdate, "DD-MM-YYYY").isBetween(
              moment(Dates[0].format("DD-MM-YYYY"),"DD-MM-YYYY"),
              moment(Dates[1].format("DD-MM-YYYY"),"DD-MM-YYYY")
              
            ) ||
            Dates[0].format("DD-MM-YYYY") === booking.fromdate || 
            Dates[1].format("DD-MM-YYYY") === booking.todate ||
            Dates[0].format("DD-MM-YYYY") === booking.todate ||
            Dates[1].format("DD-MM-YYYY") === booking.fromdate
          ) {
            console.log(`I am here ${moment(Dates[0]).isBetween(
              moment(booking.fromdate, "DD-MM-YYYY"), 
              moment(booking.todate, "DD-MM-YYYY"), 
              null, '[]'
            )} ${booking.fromdate}`);
            availability = false;
            break;
          }
        }
      }
      if (availability === true || room.currentBookings.length === 0) {
        temprooms.push(room);
      }
      
    }
    setrooms(temprooms);
    setchosenrooms(temprooms);

  }

  function filterByType(e) {
    settype(e);
    if (e !== `All`) {
      const temprooms = chosenrooms.filter(room => room.type.toLowerCase() === e.toLowerCase());
      setrooms(temprooms);
    }
    else setrooms(chosenrooms);

  }
  return (

    <div className="container mt-5">


      {loading ? (<h1><Loader /></h1>) : error ? (<h1><Error message="Something Went Wrong. Please Try again Later" /></h1>) : (


        <div className="row justify-content-center mt-5">
          <div className="row col-md-9 mt-5 bs">
            <div className="col-md-6">
              <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
            </div>

            <div className="col-md-5">
              <select className="form-control" value={type} onChange={(e) => { filterByType(e.target.value) }}>
                <option value="All">All</option>
                <option value="Delux">Delux</option>
                <option value="Non-Delux">Non-Delux</option>

              </select>
            </div>
          </div>
          {
            rooms.map((room) => {
              return <div className="col-md-9 mt-2">
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>

              // console.log(room)
            })
          }
        </div>)}

    </div>
  )
}
export default Homescreen