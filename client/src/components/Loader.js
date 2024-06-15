import { useState } from "react";
import React  from "react";
import HashLoader from "react-spinners/HashLoader";
function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    // const override = css`
    //     display: "block",
    //     margin: "0 auto",
    //     borderColor: "red",`;
    return (
        <div className="sweet-loading center-loader">
            <HashLoader
                color='#000000'
                loading={loading}
                css=''
                size={80}
            />
        </div>
    )
}

export default Loader