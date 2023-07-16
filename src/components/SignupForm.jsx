import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { BASE_URL } from "../services/helper";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Remove the "loginError" item from localStorage on component mount (normal reload)
    localStorage.removeItem("signupError");
  }, []);
  const validateUsername = (value) => {
    // Check if the username contains spaces or symbols except underscores
    const regex = /^[a-z0-9_]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the username
    if (!validateUsername(username)) {
      navigate('/login');
      localStorage.setItem("signupError","Invalid username. Usernames can only contain lowercase letters, numbers, and underscores.");
      return;
    }

    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    navigate("/loading");
    axios.post(BASE_URL + "/users/add", newUser)
      .then(response => {
        navigate('/loading');
        console.log(response.data); // Confirmation message from the server
        setUsername("");
        setEmail("");
        setPassword("");
        localStorage.setItem("currentUser", newUser.username);
        localStorage.removeItem("signupError");
        navigate("/welc");
      })
      .catch(error => {
        console.error("Error creating user:", error);
        navigate('/login');
        localStorage.setItem("signupError","Username or email already exists.");
      });
  };

  return (
    <div className="col-lg-5 pl-lg-5 mb-3 py-lg-5">
      {localStorage.getItem("signupError") && (
        <div className="container mt-3">
          <div className="alert alert-warning">{localStorage.getItem("signupError")}</div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username-register" className="text-muted mb-1"><small>Username</small></label>
          <input
            name="username"
            id="username-register"
            className="form-control"
            type="text"
            placeholder="Pick a username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email-register" className="text-muted mb-1"><small>Email</small></label>
          <input
            name="email"
            id="email-register"
            className="form-control"
            type="text"
            placeholder="you@example.com"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password-register" className="text-muted mb-1"><small>Password</small></label>
          <input
            name="password"
            id="password-register"
            className="form-control"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-md mt-2">Sign up for space</button>
      </form>
    </div>
  );
};

export default SignupForm;

