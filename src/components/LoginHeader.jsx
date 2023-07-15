import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Icon from "./Icon";
import {BASE_URL} from "../services/helper";

const LoginHeader = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const user = {
      username: username,
      password: password,
    };
    
    axios.post(BASE_URL + "/users/login", user)
      .then(response => {
        navigate('/loading');
        console.log(response.data); // Token or authentication status from the server
        setUsername("");
        setPassword("");
        setLoginError("");
        localStorage.setItem("currentUser", user.username);
        navigate("/");
      })
      .catch(error => {
        console.error("Error logging in:", error);
        setLoginError("Invalid username or password");
      });
  };

  return (
    <div>
      <header className="header-bar mb-3">
        <div className="container d-flex flex-column flex-md-row p-4">
          <h4 className="my-0 mr-md-auto font-weight-normal">
            <a href="/" className="text-white">
              <Icon />space
            </a>
          </h4>
          <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
            <div className="row align-items-center">
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input
                  name="username"
                  className="form-control form-control-sm input-dark"
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
                <input
                  name="password"
                  className="form-control form-control-sm input-dark"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-md-auto">
                <button className="btn btn-primary btn-sm">Log In</button>
              </div>
            </div>
          </form>
        </div>
      </header>
      {loginError && (
        <div className="container mt-3">
          <div className="alert alert-danger">{loginError}</div>
        </div>
      )}
    </div>
  );
}

export default LoginHeader;
