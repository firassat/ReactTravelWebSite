import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./gallery.css";

const Gallery = (props) => {

  if(props.type==="rounded") {
  return (
    <div>
      <Carousel className="gallery rounded">
        {props.data.map((photo,index) => (
          <img src={photo.path} alt="img" key={index} ></img>
        ))}
      </Carousel>
    </div>
  );
  }
  else if(props.type==="rounded-small") {
  return (
    <div>
      <Carousel className="gallery rounded-small">
        {props.data.map((photo,index) => (
          <img src={photo.path} alt="img" key={index} ></img>
        ))}
      </Carousel>
    </div>
  );
  }
  return (
    <div>
      <Carousel className="gallery">
        {props.data.map((photo,index) => (
          <img src={photo.path} alt="img" key={index} ></img>
        ))}
      </Carousel>
    </div>
  );
};


export default Gallery;
