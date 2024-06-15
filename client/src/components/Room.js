import React from 'react';
import { Link } from 'react-router-dom';

function Room({room,fromdate,todate}) {
    // const[show,setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return (
        <div className = 'row bs'>
            <div className = "col-md-4">
                <img src = {room.imageUrls[0]} className = "smallimg" alt = "Room Image"/>
            </div>
            <div className = "col-md-7">
                <h1>{room.roomId}</h1>
                <b>
                    <p>Max Count : {room.maxcount}</p>
                    <p>Type : {room.type}</p>
                    <p>Rent Per Day : {room.rentPerDay} BDT</p>
                </b>
                {(fromdate && todate) && (
                    <div style={{float: "right"}}>
                    <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                        <button className='btn btn-primary'>Book Now</button>
                    </Link>
                </div>
                )}
                 
                
            </div>

        </div>
    )
}
export default Room;