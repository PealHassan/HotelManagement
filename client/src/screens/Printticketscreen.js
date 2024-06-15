import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useLocation } from "react-router-dom";

function Invoice() {
    const location = useLocation();
    const { bookinginfo } = location.state || { bookinginfo: {} };
    const componentRef = useRef();
    function goBack() {
        window.location.href = "/addTicket";
    }
    return (
        <div>

            <div className="container mt-5">
                <div ref={componentRef} className="p-4" style={{ border: '1px solid #ddd', borderRadius: '10px' }}>
                    <h2 className="text-center mb-4">Booking Invoice</h2>

                    <div>
                        <h3>Customer Details</h3>
                        <hr />
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><b>Name:</b></td>
                                    <td>{bookinginfo.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3>Package Details</h3>
                        <hr />
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Package Name</th>
                                    <th>Cost Per Hour</th>
                                    <th>Purchased For Hours</th>
                                    <th>Cost Charged</th>
                                </tr>
                                {bookinginfo.packages.map((pack)=>{
                                    return (<tr>
                                        <td>{pack.name}</td>
                                        <td>{pack.costPerHour}</td>
                                        <td>{pack.totalHours}</td>
                                        <td>{pack.charge}</td>
                                    </tr>)
                                })}
                                
                            </tbody>
                        </table>

                    </div>
                    <div>
                        <h3>Payment Details</h3>
                        <hr />
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td><b>Total Amount:</b></td>
                                    <td>{bookinginfo.totalamount} BDT</td>
                                </tr>
                                <tr>
                                    <td><b>Payment Method:</b></td>
                                    <td>{bookinginfo.paymentMethod}</td>
                                </tr>
                                <tr>
                                    <td><b>Payment Received:</b></td>
                                    <td>{bookinginfo.paymentReceived} BDT</td>
                                </tr>
                                <tr>
                                    <td><b>Changes Given:</b></td>
                                    <td>{bookinginfo.changesGiven} BDT</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <ReactToPrint
                        trigger={() => <button className="btn btn-primary">Print Invoice</button>}
                        content={() => componentRef.current}
                        documentTitle="Booking Invoice"
                    />
                    <button className="btn btn-primary" onClick={goBack}>Back</button>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
