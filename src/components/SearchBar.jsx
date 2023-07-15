import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../App.css"
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      localStorage.setItem("searchTerm", searchTerm);
      navigate(`/search?term=${searchTerm}`)
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
    </form>
  );
}

export default SearchBar;
