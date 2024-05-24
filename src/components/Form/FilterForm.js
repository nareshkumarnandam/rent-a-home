import React, { useRef } from "react";
import './FilterForm.css';
import data from "../data";

const FilterForm = ({setMyData}) => {
    const locationRef = useRef();
    const dateRef = useRef();
    const priceRef = useRef();
    const typeRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        const check1 = locationRef.current.value.toUpperCase();
        const check2 = dateRef.current.value;
        const check3 = typeRef.current.value.toUpperCase();
        const check4 = priceRef.current.value.toUpperCase();
        const dateCheck = +check2.split('-')[2];
        const lowerPrice = +check4.split('-')[0];
        const higherPrice = +check4.split('-')[1];
        // console.log(check1, check3, dateCheck, lowerPrice, higherPrice);
        let filteredList;
        if(check1 === 'ALL'){
            filteredList = data.filter((item) => {
                return(
                    item.info.date[0] < dateCheck && item.info.date[1] >= dateCheck && item.price >= lowerPrice && item.price <= higherPrice && item.type.toUpperCase().includes(check3)
                );
            })
        }else{
            filteredList = data.filter((item) => {
                return(
                    item.city === check1 && item.info.date[0] <= dateCheck && item.info.date[1] >= dateCheck && item.price >= lowerPrice && item.price <= higherPrice && item.type.toUpperCase().includes(check3)
                );
            })
        }
        setMyData(filteredList);
    }



  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form">
      <div className="divForm">
        <div className="firstLabel">
          <label>Enter City</label>
          <br />
          <input type="text" defaultValue="ALL" ref={locationRef} required />
        </div>
        <div>
          <label>Date</label>
          <br />
          <input type="date" ref={dateRef} required />
        </div>
        <div>
          <label>Price</label>
          <br />
          <select ref={priceRef} required>
            <option value="0-3000">0-3000</option>
            <option value="0-500">Rs. 0-500</option>
            <option value="500-1000">Rs. 500-1000</option>
            <option value="1000-1500">Rs. 1000-1500</option>
            <option value="1500-2000">Rs. 1500-2000</option>
            <option value="2000-2500">Rs. 2000-2500</option>
            <option value="2500-3000">Rs. 2500-3000</option>
          </select>
        </div>
        <div>
          <label>Property type</label>
          <br />
          <select ref={typeRef} required>
            <option>All</option>
            <option>house</option>
            <option>pg</option>
            <option>farm-house</option>
            <option>villa</option>
            <option>hotel</option>
            <option>oyo</option>
          </select>
        </div>
        <div className="submitDiv">
            <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
