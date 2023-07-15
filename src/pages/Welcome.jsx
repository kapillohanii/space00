import React from "react";
import LoggedinHeader from "../components/LoggedinHeader";
import WelcomeBody from "../components/WelcomeBody";
import Footer from "../components/Footer";

function Welcome(){
    return <div>
        <LoggedinHeader />
        <WelcomeBody />
        <Footer />
    </div>
}

export default Welcome;