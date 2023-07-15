import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import SignupForm from "./SignupForm";
import spacegif from '../P9q.gif'

const GuestPageBody = () =>{
    return  <div className="container py-md-5">
                <div className="flex-row">
                    <div className="gif-container">
                        <img className="gif" src={spacegif} alt="loading..." />
                    </div>
                    <SignupForm />
                </div>   
            </div>
}

export default GuestPageBody;
