import React, {useEffect,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import userAvatar from "../userAvatar.png";
import { BASE_URL } from "../services/helper";
import Loading from "./Loading";

const Profile = () =>{
    const username = Object.values(useParams())[0];
    const [user,setUser] = useState(null);
  
    useEffect(() => {
        const fetchUser = async () => {
            try {
              const response = await axios.get(`${BASE_URL}/users/profile/${username}`);
              setUser(response.data[0]);
              
            } catch (error) {
              console.error("Error fetching User:", error);
            }
          };  
        fetchUser();
    },[username]);
    
    const navigate = useNavigate();
    if(user && user.length===0){
        navigate('/404');
    }

    const [posts, setPosts] = useState(null);
    useEffect(() => {
        axios.get(`${BASE_URL}/posts/profile/${username}?sort=-createdAt`)
            .then(response => {
                setPosts(response.data); 
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    }, [username]);

    if(!posts){
        return <Loading />
    }

    return     <div className="container py-md-5 container--narrow">
    <h2><img className="avatar-small" src={userAvatar} alt="user avatar" /> {username}
    </h2>
   { user && <ul>
        <li><b>email:</b> {user.email}</li>
    </ul>}
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