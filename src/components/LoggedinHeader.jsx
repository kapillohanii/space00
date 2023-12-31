import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userAvatar from "../userAvatar.png";
import SearchBar from "./SearchBar";
import { BASE_URL } from "../services/helper";


const LoggedinHeader = () => {
  const navigate = useNavigate();
  const user = {
    username: localStorage.getItem("currentUser")
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    navigate('/loading');
    axios.post( BASE_URL + "/users/logout", user)
      .then(response => {
        console.log(response.data);
        localStorage.removeItem("currentUser");
        navigate('/login');
      })
      .catch(error => {
        console.error("Error signing out:", error);
      });
  };
  
  return (
    <div>
      <header className="header-bar mb-3">
        <div className="container d-flexi flexi-column flexi-md-row align-items-center p-3">
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <a href="/" className="text-white">
              <Icon />space
            </a>
          </h4>
          <div className="flexi-row my-3 my-md-0">
            <SearchBar />
            <a href={"/profile/" + user.username} className="m-2">
              <img className="avatar" title="My Profile" data-toggle="tooltip" data-placement="bottom" src={userAvatar} alt="user avatar" />
            </a>
            <a className="btn btn-sm btn-success m-2" href="/newpost">Create Post</a>
            <form onSubmit={handleSignOut} method="POST" className="d-inline">
              <button className="btn btn-sm btn-secondary m-2">Sign Out</button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LoggedinHeader;
