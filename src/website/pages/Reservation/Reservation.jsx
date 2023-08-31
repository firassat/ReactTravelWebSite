import React, { useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reservation.css";
import ReservationContent from "../../components/reservationContent/ReservationContent";
import ReservationContent2 from "../../components/reservationContent/ReservationContent2";
import ReservationContent3 from "../../components/reservationContent/ReservationContent3";
import { HalfRating } from "../../components/Stars&favoriteIcons/star";
import { FaPhoneAlt ,FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { ArrowRight } from "@mui/icons-material";
import { IoPersonSharp , IoBed } from "react-icons/io5";

const Reservation = () => {

  function gettime(val) {
    const date = new Date(val);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return (hour +":" + minute);
  
  }
  

  const [next, setnext] = useState(0);
  const location = useLocation();
  const[data,setData] = useState([]);
const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  }
  console.log(location.state.data);
  console.log("deep"+location.state.departure_date)
  console.log("room_id"+location.state.id);

  return (
    <div className="reservation">
      <div className="container">
        <div className="topButton">
          <div>
            <button onClick={handleClick}>
            <span className={next === 0 ? "active" : "none"}></span>
            <h4>Traveler Details</h4>
            </button>
          </div>
          
          <div>
            <span className={next === 1 ? "active" : "none"}></span>
            <h4>Payment Details</h4>
          </div>
          <div>
            <span className={next === 2 ? "active" : "none"}></span>
            <h4>Review Order</h4>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="container">
          <div className="content">
            <div
              className="info"
              style={{ display: next === 0 ? "block" : "none" }}
            >
              <ReservationContent setnext={setnext} type={location.state.type} id={location.state.id} data={(e)=>setData(e)}/>
            </div>
            <div
              className="info"
              style={{ display: next === 1 ? "block" : "none" }}
            >
              <ReservationContent2 setnext={setnext} />
            </div>
            <div
              className="info"
              style={{ display: next === 2 ? "block" : "none" }}
            >
              {next===2 && <ReservationContent3 type={location.state.type} data={data}/>}
            </div>
            <div className={location.state.type==="flight" ? "flightsidpar sidpar" : "sidpar "}>
              <div className="showInfo">
                {location.state.type !=="flight" && <div>
                <h3 className="title">Review Order Details</h3>
                <div className="showPhoto">
                  {(location.state.type==="attraction"||location.state.type==="trip")&&
                  <img src={location.state.data.photos[0].path} alt="" />}
                  {location.state.type==="hotel"&&
                  <img src={location.state.data.photo[0].path} alt="" />}
                  <h3 className="title">
                    {location.state.type==="attraction"&&
                    <span>{location.state.data.name}</span>}
                    {location.state.type==="trip"&&
                    <span>{location.state.data.description}</span>}
                  

                  </h3>
                </div >
                {location.state.type==="attraction" &&<div className="order-info">
                  <HalfRating type="read" numberofstar={location.state.data.rate}/>
                  <p>location : {location.state.data.city.name}/{location.state.data.location}</p>
                  <p>open at : {gettime(location.state.data.open_at)}</p>
                  <p>close at : {gettime(location.state.data.close_at)}</p>
                  <p>price for adult {location.state.data.adult_price} $</p>
                  <p>price for children {location.state.data.chilld_price} $</p>
                </div>}
                {location.state.type==="trip" &&
                <div  className="order-info">
                  <HalfRating type="read" numberofstar={location.state.data.rate}/>
                  <p>location {location.state.data.destination.name}</p>
                  <p>numbrer of days {location.state.data.days_number}</p>
                  <p>departuredate {location.state.departure_date}</p>
                  {location.state.data.offers && <p className="off">Offer {location.state.data.offers[0].percentage_off} %</p>}
                </div>}
                {location.state.type==="hotel" &&<div  className="order-info">
                <p>{location.state.data.hotel.name}</p>
                  <HalfRating type="read" numberofstar={location.state.data.hotel.rate}/>
                  <p>location {location.state.data.hotel.location}</p>
                  <p className="roomtype">{location.state.data.room_type}</p>
                  {/* <p>Beds : {location.state.data.Beds}</p>
                  <p>Sleeps : {location.state.data.sleeps}</p>/ */}
                  <p style={{fontSize:"16px"}}><IoBed/> Beds  {location.state.data.Beds}</p>
                  <p  style={{fontSize:"16px"}}><IoPersonSharp/> Sleeps  {location.state.data.Sleeps}</p>
                  <p>price for night : <span className="price">{location.state.data.Price_for_night} $</span></p>
                  
                </div>}
              </div>}
              {location.state.type==="flight" && <div  className="order-info">
                <h3>{location.state.data[0].outbound_flights.from} <FaArrowRight/> {location.state.data[0].outbound_flights.to}</h3>
                <p>{location.state.data[0].outbound_flights.airline_name}</p>
                <p>{location.state.data[0].outbound_flights.From_hour}</p>
                <p>{location.state.data[0].outbound_flights.To_hour}</p>
                <p>{location.state.data[0].outbound_flights.duration}</p>
                <p>{location.state.data[0].outbound_flights.available_weight} Kg</p>
              </div>}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
