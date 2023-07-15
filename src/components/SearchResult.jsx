import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import userAvatar from "../userAvatar.png";
import { BASE_URL } from "../services/helper";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const SearchResult = () => {
  useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const searchTerm = localStorage.getItem("searchTerm");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Set loading state to true before making the request
        const response = await axios.get(
          `${BASE_URL}/users/search?term=${searchTerm}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading state to false after receiving the response or in case of an error
      }
    };

    fetchUsers();
  }, [searchTerm]); // Add searchTerm as a dependency to trigger the effect on search term change

  if (loading || users === null) {
    return <Loading />;
  }

  return (
    <div className="container py-md-5 container--narrow">
      <h2 className="text-center mb-4">Search Results:</h2>
      <div className="list-group">
        {users.length === 0 && (
          <h5 className="text-center mb-6">No users!</h5>
        )}
        {users.map((user) => (
          <a
            href={"/profile/" + user.username}
            className="list-group-item list-group-item-action"
            key={user._id}
            suppressContentEditableWarning
          >
            <img
              className="avatar-tiny"
              src={userAvatar}
              alt="user avatar"
            />
            <i>
              <strong> {user.username}</strong>
            </i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
