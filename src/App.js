import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Liked from './components/liked/Liked';
import FilterForm from './components/Form/FilterForm';
import data from './components/data';
import Context from './components/Context/Context';

const App = () => {
  const [ myData, setMyData ] = useState(data);
  const [liked, setLiked] = useState([]);
  useEffect(() => {
    const storedLiked = JSON.parse(localStorage.getItem('liked'));
    if (storedLiked) {
      setLiked(storedLiked);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('liked', JSON.stringify(liked));
  }, [liked]);

  return (
    <Context.Provider value={{
      liked: liked,
      setLiked: setLiked
    }}>
      
      <BrowserRouter>
      <Navbar setMyData={setMyData} />
      <FilterForm setMyData={setMyData} />
        <Routes>
          <Route path='/' element={<Home data={myData} ></Home>} />
          <Route path='/liked' element={<Liked />} />
        </Routes>
      </BrowserRouter>

    </Context.Provider>
  )
}

export default App