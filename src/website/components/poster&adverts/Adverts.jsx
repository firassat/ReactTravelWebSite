import React from "react";
import "./Adverts.css";

const Adverts = (props) => {
    let items=props.data.map((item,index) => (
                    <div key={index}>
                        <img src={item.img} alt="pic"></img>
                        <h5>{item.title}</h5>
                        <p>{item.subtitle}</p>
                    </div>
    ));
    return(
        <div className="advert">
                <div className="container">
                    {items}
                </div>
                </div>
    )
}
export default Adverts;