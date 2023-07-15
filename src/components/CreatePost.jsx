
import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import { BASE_URL } from "../services/helper";
import Loading from "./Loading";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postAlert, setPostAlert] = useState("");

  const handleSubmit = (event) => {
    setPostAlert("load");
    event.preventDefault();
    const newPost = {
      username: localStorage.getItem("currentUser"),
      title: title,
      content: content,
      date: new Date().toISOString(), // Set the current date as the post date
    };

    axios.post(BASE_URL + "/posts/add", newPost)
      .then(response => {
        console.log(response.data); // Log the response from the server
        // Clear the input fields
        setTitle("");
        setContent("");
        setPostAlert("post created!");
      })
      .catch(error => {
        console.error("Error publishing post:", error);
      });
  };
  if(postAlert==="load"){
    return <Loading />
  }
  return (
    <div className="container py-md-5 container--narrow">
      {postAlert && (
        <div className="container mt-3">
          <div className="alert alert-success">{postAlert}</div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            required
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1">
            <small>Content</small>
          </label>
          <textarea
            required
            name="body"
            id="post-body"
            className="form-control tbody-content"
            rows="8"
            type="text"
            autoComplete="off"
            value={content}
            onChange={event => setContent(event.target.value)}
          ></textarea>
        </div>

        <button className="btn btn-primary m-3">Publish Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
