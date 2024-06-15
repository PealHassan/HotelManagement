import React from 'react';
function Success({message}) {
    return (
        <div>
            <div class = "alert alert-success text-center" role = "alert">
               {message}
            </div>
        </div>
    )
}

export default Success