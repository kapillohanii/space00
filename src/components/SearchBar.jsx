import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../App.css"
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false); // Reset loading state on component mount
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      localStorage.setItem("searchTerm", searchTerm);
      await navigate(`/search?term=${searchTerm}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }

    setLoading(false); // Set loading state to false
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit" className="search-button">
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </button>
      {loading && <span className="loading-text">Loading...</span>}
    </form>
  );
}

export default SearchBar;
