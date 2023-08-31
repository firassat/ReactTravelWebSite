import {React,useEffect, useState} from 'react';
import Gallery from '../../components/Gallery/Gallery';
import About from '../../components/Details/about';
import Reviews from '../../components/Details/reviews';
import "./Details.css";
import Heading from '../../components/Details/heading';
import axios from 'axios';
import Cards from "../../components/Sliding/Cards";
import { useLocation } from 'react-router-dom';
import CustomizedList from '../../components/dropdown/dropdown';
import {MdErrorOutline} from "react-icons/md";
import Footer from "../../components/footer/Footer";
import CustomizedTables from '../../components/Details/roomtable';
import Departdate from '../../components/Details/depaturedate';

const Details = (props) => { 
    
    const [data,setdata] = useState([]);
    const location = useLocation();

    useEffect(()=> {
        const getdata = async () =>{
            let response;

            if(location.state.type==="hotel"){
                response =await axios.post('http://127.0.0.1:8000/api/AllHotelInfo',{
                    id:location.state.id,
                });
            }
            if(location.state.type==="attraction"){
                response =await axios.post('http://127.0.0.1:8000/api/attraction/viewAttractionDetails',{
                    attraction_id:location.state.id,
                });
            }
            if(location.state.type==="trip"){
                response =await axios.get(`http://127.0.0.1:8000/api/trip/viewTripDetails?id=${location.state.id}`)
            }

        setdata(response.data);
        console.log(response.data)
        
        };
        getdata();
    },[location.state.type,location.state.id]);

    if(data && data.trip && data.reviews){
        return(
            <div>
                <div className='container' style={{marginTop:"25px"}}>
                    <div className='detailspage'>
                        <div className='sec'>
                            <Gallery data={data.trip.photos} type="rounded"/>
                        </div>
                        <div className='fi'>
                            <About data={data.trip} type="trip"/>
                        </div>
                    </div>
                    <p style={{margin: "20px 0px 0 60px",display:"flex",alignItems:"center"}}><MdErrorOutline size="1.5em" color="#00a0f3"/> &nbsp; &nbsp;Introduction</p>
                    <CustomizedList data={data.trip.days}/>
                    <Departdate data={data.trip}/>
                    <Reviews data={data.reviews} name="trip" id={location.state.id}/>
                </div>
                <Footer/>
            </div>
        );
        }

    if(data && data.attraction && data.you_may_also_like && data.reviews) {
    return (
        <div>
            <div className='container'>
                <Heading data={data.attraction} type="attraction"/>
                <div className='detailspage'>
                    <div className='fi'> 
                        <About data={data.attraction} type="attraction"/>
                    </div>
                    <div className='sec'>
                        <Gallery data={data.attraction.photos}/>
                    </div>
                </div>
                <div style={{margin:"40px 0px"}}>
                    <p style={{fontSize:"28px"}}> In the nearby location</p>
                    <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"space-between",margin:"40px 30px"}}>
                        {data.you_may_also_like.map((item,index) => (
                        <Cards type="attraction" ItemData={item} key={index} />
                    ))}
                    </div>
                </div>
                <Reviews data={data.reviews} name="attraction" id={location.state.id}/>
            </div>
            <Footer/>
        </div>
        );
    }
    if(data && data.Hotel_info &&data.Nearest_Hotels) {
    return (
        
        <div className='container'>
            <Heading data={data.Hotel_info[0]} type="hotel"/>
            <div className='detailspage'>
                
            <div className='sec'>
            <Gallery data={data.Hotel_info[0].photo}/>
            </div>
            <div className='fi'> 
                <About data={data.Hotel_info[0]} type="hotel"/>
                </div>
            </div>
            {/*<div style={{margin:"30px 0px"}}>
            <p style={{fontSize:"28px"}}> In the nearby location</p>
            
            <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"space-between",margin:"40px 30px"}}>
            {data.you_may_also_like.map((item,index) => (
                <Cards type="attraction" ItemData={item} key={index} />
            ))}
            </div>
            </div>
            <Reviews data={data.reviews} /> */}
            <div style={{width:"70%"}}>
                <CustomizedTables data={data.Rooms} id={data.Hotel_info[0].id}/>
            </div>
            <div style={{margin:"30px 0px"}}>
                <p style={{fontSize:"28px"}}> In the nearby location</p>
            <div style={{display:"flex",alignItems:"center",flexWrap:"wrap",justifyContent:"space-between",margin:"40px 30px"}}>
            {data.Nearest_Hotels.map((item,index) => (
                <Cards type="hotel" ItemData={item} key={index} />
            ))}
            </div>
            </div>
            <Reviews data={data.Reviews} name="hotel" id={location.state.id}/>
        </div>
        );
    }
}

export default Details;
