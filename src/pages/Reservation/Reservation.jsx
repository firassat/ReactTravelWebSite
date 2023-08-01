import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reservation.css";
import ReservationContent from "../../components/reservationContent/ReservationContent";
import ReservationContent2 from "../../components/reservationContent/ReservationContent2";
import ReservationContent3 from "../../components/reservationContent/ReservationContent3";
import Photo from "../../assets/jjjj.jpg";

const Reservation = () => {
  const [next, setnext] = useState(0);
  return (
    <div className="reservation">
      <div className="container">
        <div className="topButton">
          <div>
            <span className={next === 0 ? "active" : "none"}></span>
            <h4>Traveler Details</h4>
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
              <ReservationContent setnext={setnext} />
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
              <ReservationContent3 />
            </div>
            <div className="sidpar">
              <div className="showInfo">
                <h3 className="title">Review Order Details</h3>
                <div className="showPhoto">
                  <img src={Photo} alt="" />
                  <h3 className="title">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                  </h3>
                </div>
                <div className="showDet">
                  <div className="left">
                    <h5 className="date">mon, 3, 2023</h5>
                    <h5 className="price">price</h5>
                  </div>
                  <div className="rghit">
                    <h5 className="adults">2 adults</h5>
                    <h5 className="price">100$</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
