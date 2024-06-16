import axios from 'axios';
import React, { useState } from "react";
import Loader from '../components/Loader'
import Error from '../components/Error'
import Swal from 'sweetalert2';

function Addpackage() {

    const [name, setname] = useState("")
    const [costPerHour, setcostperhour] = useState("")
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);
    
    async function addPackage() {

        const ticket = {
            name,
            costPerHour
        }
        console.log(ticket);
        try {
            setloading(true);
            const result = await axios.post(`https://hotel-management-server-eight.vercel.app/api/packages/addpackage`, ticket)
            console.log(`i am her ${result}`)
            setloading(false);
            setsuccess(true);
            seterror(false);
            Swal.fire({
                title: "Success",
                text: "Package Added Successfully",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/home';
                }
            });
        } catch (error) {
            setloading(false);
            seterror(true);
            setsuccess(false);
            console.log(error);
        }



    }
    return (
        <div>
            <div className="row justify-content-center mt-5">
                {loading ? <Loader /> :
                    <div className="col-md-5">
                        {error && <h1><Error message="Package Not Addedd" /></h1>}

                        <div className="bs">
                            <h2>ADD Package</h2>

                            <p><b>Package Name : </b><input type="text" className="form-control" value={name} onChange={(e) => { setname(e.target.value.toUpperCase()) }}></input></p>
                            <p><b>Cost Per Hour(BDT) : </b><input type="text" className="form-control" value={costPerHour} onChange={(e) => { setcostperhour(e.target.value) }}></input></p>
                            <button className="btn btn-primary mt-3" onClick={addPackage}>ADD</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}
export default Addpackage