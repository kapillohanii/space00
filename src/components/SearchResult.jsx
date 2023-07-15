import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import userAvatar from "../userAvatar.png";
import { BASE_URL } from "../services/helper";

const SearchResult = () => {
    const [users, setUsers] = useState([]);
    const searchTerm = localStorage.getItem("searchTerm");
    useEffect(() => {
        axios.get(`${BASE_URL}/users/search?term=${searchTerm}`)
            .then(response => {
                setUsers(response.data); 
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
            });
    });

    return (
        <div className="container py-md-5 container--narrow">
            <h2 className="text-center mb-4">Search Results:</h2>
            <div className="list-group">
                {users.map(user => (
                    <a href={"/profile/" + user.username} className="list-group-item list-group-item-action" key={user._id} suppressContentEditableWarning>
                        <img className="avatar-tiny" src={userAvatar} alt="user avatar"/>
                        <i><strong> {user.username}</strong></i>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default SearchResult;