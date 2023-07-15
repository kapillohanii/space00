import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { BASE_URL } from "../services/helper";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    axios.post( BASE_URL + "/users/add", newUser)
      .then(response => {
        console.log(response.data); // Confirmation message from the server
        setUsername("");
        setEmail("");
        setPassword("");
        localStorage.setItem("currentUser", newUser.username);
        navigate("/");
      })
      .catch(error => {
        console.error("Error creating user:", error);
        setSignupError("username or email already exists");
      });
  };

  return (
    <div className="col-lg-5 pl-lg-5 mb-3 py-lg-5">
        {signupError && (
        <div className="container mt-3">
          <div className="alert alert-primary">{signupError}</div>
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
}

export default SignupForm;
