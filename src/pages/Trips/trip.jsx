import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Adverts from "../../components/poster&adverts/Adverts";
import Slide from "../../components/Sliding/Slide";
import img1 from "../../assets/booknow.png";
import img2 from "../../assets/flight.png";
import img3 from "../../assets/like.png";

const Trip =() => {
    const arrr1 =[
        {img:img1,title:"Book your trip now ",subtitle:"Search your "},
        {img:img2,title:"Find your next dstination",subtitle:""},
        {img:img3,title:"See the best flight offers",subtitle:"Choose what suits your request from many offers."},
        
    ];
    return (
        <div>
            <div>
            <Header name="trips"/>
            <Adverts data={arrr1}/>
            <Slide type="contr"/>
            <Slide type="contr"/>
            <Footer/>
        </div>
        </div>
    )
}
export default Trip;