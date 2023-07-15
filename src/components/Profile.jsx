import React, {useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import userAvatar from "../userAvatar.png";
import { BASE_URL } from "../services/helper";


const Profile = () =>{
    const navigate = useNavigate();
    const user = {username: Object.values(useParams())[0]};
    if(user.username.length<3){
        navigate('/404');
    }
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL}/posts/profile/${user.username}?sort=-createdAt`)
            .then(response => {
                setPosts(response.data); 
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, [user.username]);

    return     <div className="container py-md-5 container--narrow">
    <h2><img className="avatar-small" src={userAvatar} alt="user avatar" /> {user.username}
    </h2>
    <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="/" className="profile-nav-link nav-item nav-link active">Posts</a>
    </div>

    <div className="list-group">
        {posts.map(post => (
            <a href={"/post/" + post._id} className="list-group-item list-group-item-action" key={post._id}>
                <img className="avatar-tiny" src={userAvatar} alt="user avatar"/>
                <i><strong> {post.title}</strong></i>
                <p>{post.content}</p>
                <span className="text-muted small" suppressContentEditableWarning>by <a href={"/profile/" + post.username}>{post.username}</a> on {post.date}</span>
            </a>
        ))}
    </div>
</div>
}

export default Profile;