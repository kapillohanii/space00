import React from "react";
import LoggedinHeader from "../components/LoggedinHeader";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

function LoadingPage(){
    return <div>
        <LoggedinHeader />
        <Loading />
        <Footer />
    </div>
}

export default LoadingPage;