import React from "react";
import "./poster.css";
import img1 from "../../assets/booking online flight.png";

const Poster =() => {
    return (
        <div className="poster">
            <div className="container">
                <div>
                    <div>
                        <h3>Why Book in Our Site ??</h3>
                        <ul>
                            <li><span>Book your trip in simple steps</span></li>
                            <li><span>Cancel reservation before 48 hours</span></li>
                            <li><span>See reviews and rate</span></li>
                            <li><span>Find your next destination</span></li>
                            <li><span>Search the best value hotel</span></li>
                            <li><span>See reviews and rate</span></li>
                            <li><span>Find your next destination</span></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <img src={img1} alt="pic"></img>
                </div>
            </div>
        </div>
    )
}
export default Poster;