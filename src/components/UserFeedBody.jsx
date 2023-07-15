import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import userAvatar from "../userAvatar.png";
import { BASE_URL } from "../services/helper";

const UserFeedBody = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get( BASE_URL + "/posts/?sort=-createdAt")
            .then(response => {
                setPosts(response.data); 
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, []);
    
    return (
        <div className="container py-md-5 container--narrow">
            <h2 className="text-center mb-4">!New Feed!</h2>
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

export default UserFeedBody;
