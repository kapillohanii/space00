import React from "react";
import LoggedinHeader  from "../components/LoggedinHeader";
import CreatePost from "../components/CreatePost";
import Footer from "../components/Footer";

function NewPost(){
    return <div>
        <LoggedinHeader />
        <CreatePost />
        <Footer />
    </div>
    
}

export default NewPost;