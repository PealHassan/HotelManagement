import axios from 'axios';
import React, {useState,useEffect} from "react";
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'
function Loginscreen() {
    
    const[email,setemail] = useState("")
    const[password,setpassword] = useState("")
    const [loading, setloading] = useState(false);
    const [error,seterror] = useState(false);
    const [success,setsuccess] = useState(false);
    async function login() {
        
            const user = {
                
                email,
                password,
            }
            console.log(user);
            try {
                setloading(true);
                const result = await axios.post(`${window.location.origin}/api/users/login`,user)
                console.log(result)
                setloading(false);  
                setsuccess(true);  
                seterror(false);
                localStorage.setItem('currentUser', JSON.stringify(result.data));
                window.location.href = "/home";
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
                <div className="col-md-5">
                    {error && <h1><Error message = "Invalid Credentials"/></h1>}

                    <div className="bs">
                        <h2>Log In</h2>
                        
                        <input type = "text" placeholder="Email" className="form-control" value = {email} onChange={(e) =>{setemail(e.target.value)}}></input>
                        <input type = "text" placeholder="Password" className="form-control" value = {password} onChange={(e) =>{setpassword(e.target.value)}}></input>
                        <button className="btn btn-primary mt-3" onClick={login}>Log In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Loginscreen