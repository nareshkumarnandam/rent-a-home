import React, { useRef } from "react";
import "./Navbar.css";
import { GiBirdHouse } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import data from "../data";

const Navbar = ({setMyData}) => {
  const searchRef = useRef(); 
  const navigate = useNavigate();
  function handleSearch(e){
    e.preventDefault();
    let filteredData;
    const search = searchRef.current.value.toUpperCase();
    filteredData = data.filter((item) => {
      return (
        item.city === search
      )
    })
    setMyData(filteredData);
    
  }
  return (
    <div className="navbarMain">
      <div className="navbar">
        <div className="logo">
          <GiBirdHouse onClick={() => navigate("/")} />
        </div>
        <div className="heading">
          <h1>Search properties to rent</h1>
        </div>
        <div className="liked">
          <button onClick={() => navigate("/liked")}>Liked <FcLike/></button>
        </div>
      </div>
      <div className="formDiv">
        <form onSubmit={(e) => handleSearch(e)}>
            <input type="text" ref={searchRef} placeholder="Search for the city you want to stay.." />
            <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
