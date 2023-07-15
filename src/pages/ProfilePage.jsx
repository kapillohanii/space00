import React from "react";
import LoggedinHeader from "../components/LoggedinHeader";
import Profile from "../components/Profile";
import Footer from "../components/Footer";

function ProfilePage(){
    return <div>
        <LoggedinHeader />
        <Profile />
        <Footer />
    </div>
}

export default ProfilePage;