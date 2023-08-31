import React from "react";
import "./Header.css";
import SearchBar from "../searchbar&itscomponenet/SearchBar";
import videosrc from "../../../assets/motor-boat-23011-١.mp4";

const Header = (props) => {
  if (props.name === "home") {
    return (
      <div style={{ height: "65vh" }}>
        <div className="home-header"></div>
        <div className="homepage-searchbar">
          <SearchBar name="homesearchbar" />
        </div>
      </div>
    );
  } else if (props.name === "hotels") {
    return (
      <div className="header hotel-header centring-flex">
        <div className="form">
          <p>Latest reviews. Lowest Prices</p>
          <SearchBar name="hotelsearchbar" />
        </div>
      </div>
    );
  } else if (props.name === "flights") {
    return (
      <div className="header flight-header centring-flex">
        <div className="form">
          <SearchBar name="flightsearchbar" />
        </div>
      </div>
    );
  } else if (props.name === "trips") {
    return (
      <div className="header trip-header centring-flex">
        <video
          src={videosrc}
          muted={true}
          autoPlay={true}
          loop={true}
          type="video/mp4"
        ></video>
        <div className="form">
          <p>
            Search your <span>Holiday</span>
          </p>
          <SearchBar name="tripsearchbar" />
        </div>
      </div>
    );
  } else if (props.name === "attractions") {
    return (
      <div className="header attraction-header centring-flex">
        <div className="form">
          <SearchBar name="attractionsearchbar" />
        </div>
      </div>
    );
  }
};

export default Header;
