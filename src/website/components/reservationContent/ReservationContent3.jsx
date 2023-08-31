import React from "react";
import axios from "axios";
import "./ReservationContent.css";
import { useState } from "react";

const ReservationContent3 = (props) => {
  const token = localStorage.getItem("token");
  const [error,setError] = useState('');
  const [ben,setben] = useState(false);
  const nextLaistener = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/attraction/bookingTicket', {
        check_or_book:"book",
        
        attraction_id:props.data.data.attraction_id,
        book_date: props.data.data.book_date,
        adults:props.data.data.adults,
        children:props.data.data.children,
      },
      {headers :{
        'Authorization': `Bearer  ${token}`,
        'accept':"application/json"

      }});
      // setData(response.data);
      console.log(response.data);
      if(response.data.success){
        // props.setnext(1);
      }

    }
    catch (error) {
      if(error){
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
      // setError(error);
    }
    
  };
  console.log(props.data);
  console.log(ben);
  return (
  <div>
    <h3>reservation confirmation</h3>
    <p style={{fontWeight:"600"}}>{props.data.message}</p>
    <p>booking date : {props.data.data.book_date}</p>
    <p>adults number: {props.data.data.adults}</p>
    <p>children number: {props.data.data.children}</p>
    <p>payment : {props.data.data.payment}</p>
    {props.data.message1 && 
    <span>
      <label htmlFor="check">checkpoints</label>
      <input type="checkbox" onChange={(e)=>setben(!ben)}/>
      </span>}
    {error && <p className="errormessage">{error}</p>}
    <button className="next" onClick={(e)=>nextLaistener(e)}>confirm reservation</button>
  </div>
  );

};

export default ReservationContent3;
