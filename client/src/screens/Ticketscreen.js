import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'
import Error from '../components/Error'


function Ticketscreen() {
    const [packages, setPackages] = useState([]);
    const [packageDetails, setPackageDetails] = useState({});
    const navigate = useNavigate();
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setloading(true);
                const { data } = await axios.get(`/api/packages/getallpackages`);
                setPackages(data);
                const initialDetails = data.reduce((acc, pack) => {
                    acc[pack._id] = { checked: false, totalHours: 0, costPerHour: pack.costPerHour, charge: 0 };
                    return acc;
                }, {});
                setPackageDetails(initialDetails);
                setloading(false); 
                seterror(false);  
                
            } catch (error) {
                setloading(false); 
                seterror(true);
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleCheckboxChange = (id) => {
        setPackageDetails(prevState => ({
            ...prevState,
            [id]: { ...prevState[id], checked: !prevState[id].checked }
        }));
    };

    const getSelectedPackages = () => {
        return Object.keys(packageDetails)
            .filter(id => packageDetails[id].checked)
            .map(id => ({
                id,
                name: packages.find(pack => pack._id === id)?.name,
                costPerHour: packageDetails[id].costPerHour,
                totalHours: packageDetails[id].totalHours,
                charge: packageDetails[id].charge
            }));
    };

    const selectedPackages = getSelectedPackages();

    const handleInputChange = (id, field, value, value2, value3) => {
        setPackageDetails(prevState => ({
            ...prevState,
            [id]: { ...prevState[id], [field]: value, ['costPerHour']: value3, ['charge']: value2 }
        }));
    };

    const handleAddPackages = () => {
        navigate('/addTicket/selectedPackages', { state: { selectedPackages } });
    };

    return (
        <div className="container mt-5">
            {loading ? (<h1><Loader /></h1>) : error ? (<h1><Error message="Something went wrong, Try Again Later" /></h1>) : (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="text-center">Add Tickets</h1>
                    {packages.map(pack => (
                        <div className="custom-checkbox bs my-3" key={pack._id}>
                            <div className="form-check d-flex align-items-center">
                                <input
                                    className="col-md-2 form-check-input me-2"
                                    type="checkbox"
                                    checked={packageDetails[pack._id]?.checked || false}
                                    onChange={() => handleCheckboxChange(pack._id)}
                                    id={`Check-${pack._id}`}
                                />
                                <label className="col-md-4 form-check-label" htmlFor={`Check-${pack._id}`}>
                                    {pack.name}
                                </label>
                                <div className="col-md-3 ms-3">
                                    <b>Per Hour : {pack.costPerHour} BDT</b>
                                </div>
                                {packageDetails[pack._id]?.checked && (
                                    <div className="col-md-4 mt-2 bs">
                                        <b>Total Hours: </b>
                                        <input
                                            type="Number"
                                            className="form-control"
                                            value={packageDetails[pack._id].totalHours}
                                            onChange={(e) => handleInputChange(pack._id, 'totalHours', e.target.value, e.target.value * pack.costPerHour, pack.costPerHour)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <button className="col-md-12 btn btn-primary mt-3" onClick={handleAddPackages}>ADD Packages</button>
                </div>
            </div>)}
            
        </div>
    );
}

export default Ticketscreen;
