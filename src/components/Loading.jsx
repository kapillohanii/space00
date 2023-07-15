import React from "react";
import loading from "../P9q.gif";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Loading = () =>{

    return <div className="Lcontainer">
    <div className="flex-row">
        <div className="loadgif-container">
         <img className="load" src={loading} alt="loading..." />
        </div>
    </div>   
</div>
   
}

export default Loading;