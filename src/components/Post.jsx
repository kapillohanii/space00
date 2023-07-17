import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import userAvatar from "../userAvatar.png";
import Loading from "./Loading";
import { BASE_URL } from "../services/helper";
import Sentiment from  "./Sentiment";
const Post = () => {
  const postId = Object.values(useParams())[0];
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  });

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${postId}`);
      setPost(response.data[0]);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };


  const handleDelete = async () => {
    navigate('/loading');
    try {
      console.log(postId);
      await axios.delete(`${BASE_URL}/posts/`+ postId);
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    }
  };

  if (!post) {
    return <Loading />;
  }
  if(post.username===localStorage.getItem("currentUser")){ 
    return (
    <div className="container py-md-5 container--narrow">
      <div className="d-flex justify-content-between">
        <h2><Sentiment colorCode={post.sentiment} /> {post.title}</h2>
         <span className="pt-2">
          {/* <a
            href="/"
            className="text-primary m-2"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <FontAwesomeIcon icon={faEdit} />
          </a>  */}
          <form className="delete-post-form d-inline" action="#" method="post">
            <button
              className="delete-post-button text-danger m-1"
              data-toggle="tooltip"
              data-placement="top"
              title="Delete"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </form>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <a href={"/profile/" + post.username}>
          <img
            className="avatar-tiny"
            src={userAvatar}
            alt="user avater"
          />
        </a>
        Posted by <a href={"/profile/" + post.username}>{post.username}</a> on {post.date}
      </p>

      <div className="body-content">
        {post.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
  }
  return     <div className="container py-md-5 container--narrow">
  <div className="d-flex justify-content-between">
    <h2><Sentiment colorCode={post.sentiment} /> {post.title}</h2>
  </div>
  <p className="text-muted small mb-4">
    <a href={"/profile/" + post.username}>
      <img
        className="avatar-tiny"
        src={userAvatar}
        alt="user avater"
      />
    </a>
    Posted by <a href={"/profile/" + post.username}>{post.username}</a> on {post.date}
  </p>

  <div className="body-content">
    {post.content.split("\n").map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
  </div>
</div>


};

export default Post;
