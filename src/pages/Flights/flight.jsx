import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Adverts from "../../components/poster&adverts/Adverts";
import Slide from "../../components/Sliding/Slide";
import img1 from "../../assets/booknow.png";
import img2 from "../../assets/flight.png";
import img3 from "../../assets/like.png";

const Flight =() => {
    const arrr1 =[
        {img:img1,title:"Book your trip now ",subtitle:"See and book your ticket on various airlines."},
        {img:img2,title:"Select your travel date",subtitle:"View flights in your date or the nearest date."},
        {img:img3,title:"See the best flight offers",subtitle:"Choose what suits your request from many offers."},
        
    ];
    return (
        <div>
            <div>
            <Header name="flights"/>
            <Adverts data={arrr1}/>
            <Slide type="contr"/>
            <Footer/>
        </div>
        </div>
    )
}
export default Flight;