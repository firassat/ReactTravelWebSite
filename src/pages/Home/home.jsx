import React from "react";
import Header from "../../components/header/Header";
import Slide from "../../components/Sliding/Slide";
import Poster from "../../components/poster&adverts/poster";
import Footer from "../../components/footer/Footer";

const Home = () => {
    return(
        <div>
        <Header name="home"/>
        <Slide type="contr"/>
        <Slide type="hotel"/>
        <Poster/>
        <Footer/>
        </div>
    )
}

export default Home;