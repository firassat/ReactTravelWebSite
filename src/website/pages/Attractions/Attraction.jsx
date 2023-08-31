import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Adverts from "../../components/poster&adverts/Adverts";
import Sliding from "../../components/Sliding/Slide";
import img1 from "../../../assets/good-quality.png";
import img2 from "../../../assets/beach.png";
import img3 from "../../../assets/booknow.png";

const Attraction =() => {
    const arrr1 =[
        {key:0,img:img1,title:"Explore top attractions",subtitle:"Experience the best of your destination with tours, activities, and more."},
        {key:1,img:img2,title:"Explore more destinations",subtitle:" Find things to do in cities around the world."},
        {key:2,img:img3,title:"Discover new place with our site",subtitle:"Book your ticket to visit amazing place."},
        
    ];
    return (
        <div>
            <div>
            <Header name="attractions"/>
            <Adverts data={arrr1}/>
            <Sliding type="attraction"/>
            <Footer/>
        </div>
        </div>
    )
}
export default Attraction;