import react, { useState } from 'react'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';

import {imageDb} from '../firebase';
import {v4} from "uuid";
import axios from 'axios';
import { ref, uploadBytes, getDownloadURL,deleteObject } from 'firebase/storage';
function Addnewroom() {
    const [roomId, setroomId] = useState();
    
    const [maxcount, setmaxcount] = useState();
    const [rentPerDay, setrentPerDay] = useState();
    const [type, settype] = useState('Delux');
    const [image,setimage] = useState(null);
    const [loading,setloading] = useState(false);
    const [error,seterror] = useState(false);
    const imageuploader = async () => {
        const imgRef = ref(imageDb, `files/${v4()}`);
        await uploadBytes(imgRef, image);
        const imageUrl= await getDownloadURL(imgRef);
        return { imageUrl, imgRef }; // Return the URL from this function
    };

    async function addNewRoom() {
        setloading(true);
        const { imageUrl, imgRef } = await imageuploader();
        try {
            const room = {
                roomId,
                maxcount,
                rentPerDay,
                imageUrls: [imageUrl], // Use the URL directly here
                type
            };
            const result = await axios.post(`${window.location.origin}/api/rooms/addRoom`, room);
            console.log(result.data);
            setloading(false);
            Swal.fire({
                title: "Success",
                text: "Room Added Successfully",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/addNewRoom';
                }
            });
        } catch (error) {
            console.log(error);
            if (imgRef) {
                // Delete the image from Firebase Storage
                await deleteObject(imgRef).catch((delError) => {
                    console.error("Failed to delete the image from storage:", delError);
                });
            }
            setloading(false);
            seterror(true);
        }
    }

    return (
        <div>
            <div className="row justify-content-center mt-5">
                {loading ? <Loader /> :
                <div className="col-md-5">
                    {error && <h1><Error message="Room Not Added" /></h1>}

                    <div className="bs">
                        <h2>ADD New Room</h2>

                        <p><b>Room Id : </b><input type="text" className="form-control" value={roomId} onChange={(e) => { setroomId(e.target.value) }}></input></p>
                        <p><b>MaxCount : </b><input type="Number" className="form-control" value={maxcount} onChange={(e) => { setmaxcount(e.target.value) }}></input></p>
                        <p><b>Rent Per Day : </b><input type="Number" className="form-control" value={rentPerDay} onChange={(e) => { setrentPerDay(e.target.value) }}></input></p>
                        <p><b>Room Type : </b><select className="form-control" value={type} onChange={(e) => { settype(e.target.value) }}>
                            <option value="Delux">Delux</option>
                            <option value="Non-Delux">Non-Delux</option>
                        </select>
                        </p>
                        <p><b>Image : </b>
                        <input type="file" onChange={(e) => { setimage(e.target.files[0]) }}/>
                        </p>

                        <button className="btn btn-primary mt-3" onClick={addNewRoom}>ADD Room</button>
                        
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Addnewroom