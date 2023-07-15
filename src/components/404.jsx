import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const ErrorCall = () =>{
    return     <div class="container py-md-5 container--narrow">
    <div class="text-center">
        <h2>Whoops, we cannot find that page.</h2>
        <p class="lead text-muted">You can always visit the <a href="/">homepage</a> to get a fresh start.</p>
    </div>
</div>

}

export default ErrorCall;