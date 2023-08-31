import React, { useState ,useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import "swiper/css/free-mode";
import 'bootstrap/dist/css/bootstrap.min.css';
import './slide.css';
import Poster from '../poster&adverts/poster';
import Cards from './Cards';
import axios from 'axios';

const Sliding = (props) => {
    const [data,setdata] = useState([]);
    
    useEffect(()=> {
        const getdata = async () =>{
            let response;
            if(props.type==="home") {
                response =await axios.get('http://127.0.0.1:8000/api/user/index');
            }
            else if(props.type==="hotel") {
                response =await axios.get('http://127.0.0.1:8000/api/TopRatedAndTypes');
            }
            else if(props.type==="flight") {
                response =await axios.get('http://127.0.0.1:8000/api/popularCountries');
            }
            else if(props.type==="trip") {
                response =await axios.get('http://127.0.0.1:8000/api/trip/index');
            }
            else if(props.type==="attraction") {
                response =await axios.get('http://127.0.0.1:8000/api/attraction/index');
            }

        setdata(response.data);
        };
        getdata();
    },[props.type]);

    if(props.type==="home") {
        return(
            <div>
                <Slide type="flight" data={data.popularCountries}/>
                <Slide type="attraction" data={data.top_attractions} title="Top Rated Attraction"/>
                <Slide type="trip" data={data.trip_offers} title="Trips offer"/>
                <Poster type={props.type}/>
                <Slide type="hotel" data={data.top_hotels} title="Top Hotels"/>
                <Slide type="trip" data={data.top_trips} title="Top Trips"/>
            </div>
        )
    }
    if(props.type==="hotel") {
        return(
            <div>
                <Slide type={props.type} data={data.topRated} title="Top Rated Hotels"/>
                <Slide type={props.type} data={data.All_suites} title="All suites Hotels"/>
                <Slide type={props.type} data={data.Chain} title="Chain Hotels"/>
                <Poster type={props.type}/>
                <Slide type={props.type} data={data.Inns} title="Inns Hotels"/>
                <Slide type={props.type} data={data.Motel} title="Motel Hotels"/>
                <Slide type={props.type} data={data.Motel} title="Resorts Hotels"/>
            </div>
        )
    }
    if(props.type==="flight") {
        return(
            <Slide type={props.type} data={data.popularCountries}/>
        )
    }
    if(props.type==="trip") {
        return(
            <div>
                <Slide type={props.type} data={data.topRated} title="Top Rated Trips"/>
                <Slide type={props.type} data={data.VIP} title="VIP Trips"/> 
                <Slide type={props.type} data={data.cheapest} title="The Cheapest Trips"/>
                <Poster type={props.type}/>
                <Slide type={props.type} data={data.local} title="Local Trips"/> 
                <Slide type={props.type} data={data.shortTrips} title="Short Trips"/> 
                <Slide type={props.type} data={data.longTrips} title="Long Trips"/>
            </div>
        )
    }
    if(props.type==="attraction") {
        return(
            <div>
                <Slide type={props.type} data={data.topRated} title="Top Rated"/>
                <Slide type={props.type} data={data.paid} title="Paid"/>
                <Slide type={props.type} data={data.free} title="Free"/>
            </div>
        )
    }
}

const Slide = (props) => {
    if(props.type==="flight"){
        return(
            <Cards data={props.data} type={props.type}/>
        )
    }

    return (
        <div className="cpppp py-4 px-4 justify-content-center" style={{position:"relative"}}>
            <h3>{props.title}</h3>
            <Swiper modules={[Navigation, Pagination, A11y]}
                    freeMode={true}
                    grabCursor={true}
                    className="mySwiper"
                    slidesPerView={4}
                    navigation
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}
                    spaceBetween={-40}>
            {props.data && props.data.map((item,index) =>{
                return(
                    <SwiperSlide key={index}>
                        <Cards ItemData={item} type={props.type} key={item.id}/>
                    </SwiperSlide>)})
    }
            </Swiper>
        </div>
    );
}


export default Sliding;
