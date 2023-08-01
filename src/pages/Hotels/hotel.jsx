import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Adverts from "../../components/poster&adverts/Adverts";
import Slide from "../../components/Sliding/Slide";
import img1 from "../../assets/hotel.png";
import img2 from "../../assets/recommended2.png";
import img3 from "../../assets/highclass.png";

const Hotel =() => {
    const arrr1 =[
        {img:img1,title:"Search your dream hotel",subtitle:"See the most beautiful hotel in the world."},
        {img:img2,title:"Find the top rated",subtitle:"View visitor reviews and ratings."},
        {img:img3,title:"See high class hotel",subtitle:"Book and pay for your stay in five star hotels around world."},
        
    ];
    return(
        <div>
            <Header name="hotels"/>
            <Adverts data={arrr1}/>
            <Slide type="contr"/>
            <Slide type="hotel"/>
            <Footer/>
        </div>
    )
}

export default Hotel;