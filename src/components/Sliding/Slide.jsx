import React, { useState ,useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import { NavLink } from "react-router-dom";
import 'swiper/swiper-bundle.min.css';
import "swiper/css/free-mode";
import 'bootstrap/dist/css/bootstrap.min.css';
import './slide.css';
import img1 from './img/FB_IMG_1522780863499.jpg';
import img2  from './img/sea.jpg';
import img3 from './img/OM (7).jpg';
import img4 from './img/OM (6).jpg';
import img5 from './img/OM (11).jpg';
import img6 from './img/1246280_16061017110043391702.webp';
import img7 from './img/1246280_16061017110043391703.webp';
import img8 from './img/1246280_16061017110043391704.webp';
import img9 from './img/1246280_16061017110043391706.webp';
import Cards from './Cards';

const Slide=(props) =>{
    const arr11 =[
        {img :img1,name :"Hong kong",key: 1},
        {img :img2,name: "ajhj",key: 2},
        {img :img3,name:"kalj",key: 3},
        {img :img4,name :"jkglag",key: 4},
        {img :img5,name: "ajhj",key: 5},
        {img :img1,name:"kalj",key: 6},
        {img :img2,name :"jkgl",key: 7},
        {img :img3,name: "ajhj",key: 8},
        {img :img4,name:"kalj",key: 9},
    ];
    const arr2 =[
        {img :img6,name :"royal hotel",typ:"hotel",key: 1},
        {img :img7,name: "four season",typ:"hotel",key: 2},
        {img :img8,name:"sham center",typ:"hotel",key: 3},
        {img :img9,name :"tree hotel",typ:"hotel",key: 4},
        {img :img6,name :"royal hotel",typ:"hotel",key: 5},
        {img :img7,name: "four season",typ:"hotel",key: 6},
        {img :img8,name:"sham center",typ:"hotel",key: 7},
        {img :img9,name :"tree hotel",typ:"hotel",key: 8},
    ];
        
    let cards=[];

    if(props.type==="contr"){
        cards = arr11.map((item) => {
            return (
                <SwiperSlide key={item.key}>
                        <NavLink to="a">
                        <Cards data={{imgSrc: item.img,name:item.name}} typ={item.typ} key={item.key}/>
                        </NavLink>
                </SwiperSlide>
            )
        })
    }
        
    else {
        cards = arr2.map((item) => {
            return (
                <SwiperSlide key={item.key}>
                        <NavLink to="a">
                        <Cards data={{imgSrc: item.img,name:item.name}} typ={item.typ} key={item.key}/>
                        </NavLink>
                </SwiperSlide>
            )
        })}
    return (
        <div className="cpppp py-4 px-4 justify-content-center" style={{position:"relative"}}>
            <h3>Top Rated</h3>
            <p>Recommended for you </p>
            <Swiper modules={[Navigation, Pagination, A11y]}
                    freeMode={true}
                    grabCursor={true}
                    className="mySwiper"
                    slidesPerView={4}
                    navigation
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    spaceBetween={-30}>
            {cards}
            </Swiper>
        </div>
    );
}
export default Slide;

