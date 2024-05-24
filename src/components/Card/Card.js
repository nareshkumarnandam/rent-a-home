import React, { useState, useEffect } from "react";
import "./Card.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AiFillHeart } from "react-icons/ai";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { GoDiamond } from "react-icons/go";

const Card = ({
  data: { name, image, price, city, address, info, type },
  liked,
  setLiked,
}) => {
  const [likeColor, setLikeColor] = useState(false);
  const [likeClassname, setLikeClassname] = useState('');

  useEffect(() => {
    const storedLiked = JSON.parse(localStorage.getItem('liked'));
    if (storedLiked) {
      setLiked(storedLiked);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('liked', JSON.stringify(liked));
  }, [liked]);


  useEffect(() => {
    localStorage.setItem(`likeColor_${name}`, JSON.stringify(likeColor));
    localStorage.setItem(`likeClassname_${name}`, JSON.stringify(likeClassname));
  }, [likeColor, likeClassname, name]);

  useEffect(() => {
    const storedLikeColor = JSON.parse(localStorage.getItem(`likeColor_${name}`));
    if (storedLikeColor !== null) {
      setLikeColor(storedLikeColor);
    }
    const storedLikeClassname = JSON.parse(localStorage.getItem(`likeClassname_${name}`));
    if (storedLikeClassname !== null) {
      setLikeClassname(storedLikeClassname);
    }
  }, [name]);

  function handleLike(name) {
    setLikeColor(!likeColor);
    if (likeColor) {
      const filteration = liked.filter((item) => item.name !== name);
      setLiked([...filteration]);
      setLikeClassname('notLiked');
    } else {
      const unique = [...liked, { name, image, price, city, address, info, type }].filter((value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
      );
      setLiked(unique);
      setLikeClassname('liked');
    }
  }

  return (
    <div className="card">
      <img src={image} />
      <div>
        <div className="row1">
          <h4>
            <FaIndianRupeeSign className="rupee" />
            {price}/Day
          </h4>
          <h4 className="likeSvg" >
            <AiFillHeart onClick={() => handleLike(name)} className={likeColor ? 'liked' : 'notLiked'} />
          </h4>
        </div>
        <div className="mainInfo">
          <h4>{name}</h4>
          <p className="address">
            {address},{city}
          </p>
        </div>
      </div>
      <div className="extraInfo">
        <div>
            <FaBed />
            <p>{info.bed} Beds</p>
        </div>
        <div>
            <FaBath />
            <p>{info.bathrooms} Bath</p>
        </div>
        <div>
            <GoDiamond />
            <p>{info.area}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
