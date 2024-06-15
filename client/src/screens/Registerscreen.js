import axios from 'axios';
import React, {useState,useEffect} from "react";
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'
// import Loader from "../"
function Registerscreen() {
    const[name,setname] = useState("")
    const[email,setemail] = useState("")
    const[password,setpassword] = useState("")
    const[cpassword,setcpassword] = useState("")
    
    const [loading, setloading] = useState(false);
    const [error,seterror] = useState(false);
    const [success,setsuccess] = useState(false);

    async function register() {
        if(password == cpassword) {
            const user = {
                name,  
                email,
                password
            }
            try {
                setloading(true);
                const result = await axios.post(`/api/users/register`,user)
                seterror(false);
                setloading(false);  
                setsuccess(true);
                setname("");   
                setemail("");
                setpassword("");
                setcpassword("");
            } catch (error) {
                console.log(error);
                setsuccess(false);
                setloading(false);
                seterror(true);

            }
        }
        else {
            alert("Password not match");
        }
        
        
    }
    return (
        <div className='mt-5'>
            {loading && <h1><Loader/></h1>}
            {error && <h1><Error message = "Something Went Wrong, Please Try again later"/></h1>}
            
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                {success && <h1><Success message={"Registration Successful"}/></h1>}
                    <div className="bs">
                        <h2>ADD Manager</h2>
                        <input type = "text" placeholder="Name" className="form-control" value = {name} onChange={(e) =>{setname(e.target.value)}} ></input>
                        <input type = "email" placeholder="Email" className="form-control" value = {email} onChange={(e) =>{setemail(e.target.value)}}></input>
                        <input type = "password" placeholder="Password" className="form-control" value = {password} onChange={(e) =>{setpassword(e.target.value)}}></input>
                        <input type = "password" placeholder="Confirm Password" className="form-control" value = {cpassword} onChange={(e) =>{setcpassword(e.target.value)}}></input>
                        <button className="btn btn-primary mt-3" onClick={register}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Registerscreen