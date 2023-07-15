import React from "react";
import Post from "../components/Post";
import LoggedinHeader from "../components/LoggedinHeader";
import Footer from "../components/Footer";

function EditPost(){
    return <div>
        <LoggedinHeader />
        <Post />
        <Footer />
    </div>
}

export default EditPost;