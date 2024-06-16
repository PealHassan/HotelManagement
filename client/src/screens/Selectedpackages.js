import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader'
import Error from '../components/Error'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Selectedpackages() {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedPackages } = location.state || { selectedPackages: [] };
    const [totalamount, settotalamount] = useState(0);
    const [paymentMethod, setpaymentmethod] = useState();
    const [paymentReceived, setpaymentreceived] = useState();
    const [changesGiven, setchangesgiven] = useState();
    const [customerName, setcustomername] = useState();
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);

    useEffect(() => {
        console.log(selectedPackages);
        const countTotal = async () => {
            var val = 0;
            selectedPackages.map(pack => {
                val += pack.charge;
            })
            settotalamount(val);
        };

        countTotal();
    });
    function sendDocument() {

        const bookinginfo = {
            'packages': selectedPackages,
            'name': customerName,
            'totalamount': totalamount,
            'paymentMethod': paymentMethod,
            'paymentReceived': paymentReceived,
            'changesGiven': changesGiven
        }

        navigate('/printticketdocument', { state: { bookinginfo } });

    }
    async function addTicket() {
        var packages = [];
        selectedPackages.map((pack) => {
            packages.push({
                id: pack.id,
                name: pack.name,
                costPerHour: pack.costPerHour,
                totalHours: pack.totalHours,
                charge: pack.charge
            })

        });

        const ticket = {
            packages: packages,
            name: customerName,
            totalamount: totalamount,
            paymentMethod: paymentMethod,
            paymentReceived: paymentReceived,
            changesGiven: changesGiven
        }
        try {
            setloading(true);
            await axios.post(`https://hotel-management-server-eight.vercel.app/api/ticketbook/addticket`, ticket).data;
            setloading(false);
            Swal.fire({
                title: "Success",
                text: "Ticket Purchased Successfully",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    sendDocument();
                }
            });
        } catch (error) {
            console.log(error);
            seterror(true);
            setloading(false);
        }
    }
    return (
        <div className='m-5 mt-5'>
            {loading ? (<h1><Loader /></h1>) : error ? (<h1><Error message="Something went wrong, Try Again Later" /></h1>) : (
                <div className='row justify-content-center mt-5 bs'>
                    <div className="col-md-5">
                        <div style={{ textAlign: 'left' }}>
                            <h2 id="book">Selected Packages</h2>
                            <hr />
                            {selectedPackages.length > 0 ? (
                                <ol>
                                    {selectedPackages.map(pack => (
                                        <li key={pack.id} >
                                            <b>{pack.name} </b>for <b>{pack.totalHours} Hours</b>, Charge: <b>{pack.charge} BDT</b>
                                        </li>
                                    )
                                    )}
                                </ol>

                            ) : (
                                <p>No packages selected</p>
                            )}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <h2 id="book">Amount Charged</h2>
                            <hr />
                            <b>Total Amount Charged : {totalamount} BDT</b>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <h2 id="book">Payment</h2>
                            <hr />
                            <b>
                                <p>Name :  <input type="text" className="form-control" value={customerName} onChange={(e) => { setcustomername(e.target.value) }}></input> </p>

                                <p>Payment Method : <input type="text" className="form-control" value={paymentMethod} onChange={(e) => { setpaymentmethod(e.target.value) }}></input></p>
                                <p>Payment Received : <input type="Number" className="form-control" value={paymentReceived} onChange={(e) => { setpaymentreceived(e.target.value) }}></input></p>
                                <p>Changes Given : <input type="Number" className="form-control" value={changesGiven} onChange={(e) => { setchangesgiven(e.target.value) }}></input></p>
                            </b>
                        </div>
                        <button className="col-md-12 btn btn-primary mt-3" onClick={addTicket}>Confirm</button>



                    </div>
                </div>)}
        </div>
    );
}

export default Selectedpackages;
