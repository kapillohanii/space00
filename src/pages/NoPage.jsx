import React from "react";
import LoginHeader from "../components/LoginHeader";
import ErrorCall from "../components/404";
import Footer from "../components/Footer";

function NoPage(){
    return <div>
        <LoginHeader />
        <ErrorCall />
        <Footer />
    </div>
}

export default NoPage;