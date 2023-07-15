import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import userAvatar from "../userAvatar.png";
import { BASE_URL } from "../services/helper";
import Loading from "./Loading";

const WelcomeBody = () => {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/posts/`
          );
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching postz:", error);
        } 
      };
  
      fetchPosts();
    });
  
    if (!posts) {
      return <Loading />;
    }
    else if(posts.length===0){
        return <div className="container py-md-5 container--narrow">
            <h2 className="text-center mb-4">No Feed ;-;</h2>
        </div>
    }
    return (

        <div className="container py-md-5 container--narrow">
            <div className="container mt-3">
                <div className="alert alert-primary">Welcome Aboard! {localStorage.getItem("currentUser")}</div>
            </div>
            <h2 className="text-center mb-4">!SpAcE!</h2>
            <div className="list-group">
                {posts.map(post => (
                    <a href={"/post/" + post._id} className="list-group-item list-group-item-action" key={post._id} suppressContentEditableWarning>
                        <img className="avatar-tiny" src={userAvatar} alt="user avatar"/>
                        <i><strong> {post.title}</strong></i>
                        <p>{post.content}</p>
                        <span className="text-muted small" >by <a href={"/profile/" + post.username}>{post.username}</a>  on {post.date}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default WelcomeBody;
