import React from "react";
import Header from "../../components/header/Header";
import Sliding from "../../components/Sliding/Slide";
import Poster from "../../components/poster&adverts/poster";
import Footer from "../../components/footer/Footer";
import Recentsearch from "../../components/searchbar&itscomponenet/othercomponent/Recentsearches";

const Home = () => {
    return(
        <div>
        <Header name="home"/>
        <Recentsearch/>
        <Sliding type="home"/>
        <Poster type="homepage"/>
        <Footer/>
        
        </div>
    )
}

export default Home;