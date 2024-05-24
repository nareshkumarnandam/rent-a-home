import React, { useContext, useState, useEffect } from "react";
import Context from "../Context/Context";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AiFillHeart } from "react-icons/ai";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { GoDiamond } from "react-icons/go";
import './Liked.css';

const Liked = () => {
  const { liked, setLiked } = useContext(Context);
  const [likedColor, setLikedColor] = useState(true);

  useEffect(() => {
    const storedLiked = JSON.parse(localStorage.getItem('liked'));
    if (storedLiked) {
      setLiked(storedLiked);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('liked', JSON.stringify(liked));
  }, [liked]);

  function handleDelete(deleteName) {
    const del = liked.filter((item) => item.name !== deleteName);
    setLiked([...del]);
  }

  return (
    <div className="likedDisplay">
      {liked.length === 0 ? (
        <h1>No data</h1>
      ) : (
        liked.map((item) => {
          return (
            <div className="card" key={item.image}>
              <img src={item.image} />
              <div>
                <div className="row1">
                  <h4>
                    <FaIndianRupeeSign className="rupee" />
                    {item.price}/Day
                  </h4>
                  <h4 className="likeSvg">
                    <AiFillHeart
                      onClick={() => handleDelete(item.name)}
                      className={likedColor ? "liked" : "notLiked"}
                    />
                  </h4>
                </div>
                <div className="mainInfo">
                  <h4>{item.name}</h4>
                  <p className="address">
                    {item.address},{item.city}
                  </p>
                </div>
              </div>
              <div className="extraInfo">
                <div>
                  <FaBed />
                  <p>{item.info.bed} Beds</p>
                </div>
                <div>
                  <FaBath />
                  <p>{item.info.bathrooms} Bath</p>
                </div>
                <div>
                  <GoDiamond />
                  <p>{item.info.area}</p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
    //
  );
};

export default Liked;
