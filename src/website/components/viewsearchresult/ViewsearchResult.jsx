import {React , useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewsearchResult.css";
import {HalfRating ,IconCheckboxes} from "../Stars&favoriteIcons/star";
import { MdLocationOn } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { FaArrowsAltH } from "react-icons/fa";
import {AiFillStar} from 'react-icons/ai';
import { FaPhoneAlt ,FaArrowRight, FaArrowLeft } from "react-icons/fa";


const ViewsearchResultcard = (props) => {
    
    const [visibledeal,setVisibledeal] = useState({});

    const handleClick = (index) => {
    setVisibledeal(prevState => ({...prevState, [index]: !prevState[index]}));
    }

    const navigate = useNavigate(); 
    function handleclick (e,id) {
        e.preventDefault();
        navigate('/details', { state: { type:props.type , id:id } });
    }

    function gettime(val) {
        const timeParts = val.split(':');
        const hour = parseInt(timeParts[0]);
        const minute = parseInt(timeParts[1]);
        return (hour + "h " + minute + "m");
    } 
    const handlebookflight = (data) => {
        navigate('/reservation', { state: { type:"flight",data:data} });
    }


    if(props.type==="hotel"){
        return(
            <div className="hotel-searchresultcard">
            {props.data && props.data.map((cc,index)=>{
            return(
                <div className="searchresultcard" key={index}>
                    <div>
                        <img src={cc.photo[0].path} alt="img"></img>
                        <span>
                            <IconCheckboxes />
                        </span>
                    </div>
                    <div className="hotelviewdealbutton">
                        <button className="hotelviewdealbutton" onClick={(e)=>handleclick(e,cc.id)}>View deal</button>
                        <p>&Show rooms</p>
                    </div>
                    <div className="description">
                        <h3 style={{color:"#006ce4"}}>{cc.name}</h3>
                        <HalfRating numberofstar={cc.rate} type="read"/>
                        <label>{cc.details}</label><br/>
                        <label><MdLocationOn size="1.5rem"/> location:{cc.city.country.name} / {cc.city.name} / {cc.location}</label><br/>
                        <label><MdEmail size="1.5rem"/> email : {cc.email}</label><br/>
                        <label><FaPhoneAlt size="1.5rem"/> phone number: {cc.phone_number} </label><br/>
                        <label> price for night start from : <span style={{fontWeight:"600",color: "rgb(0, 130, 52)"}}>{cc.price_start_from} $ </span></label><br/>
                    </div>
                    <div className='hotelstars centring-flex'>{cc.stars}<AiFillStar size="1em" color="white"/></div>
                </div>
            // </div>
            )
                })
            }
            </div>
                ) 
                }

                
    if(props.type==="attraction"){
        console.log(props.data);
        return(
            <div className="attractionserachresult">
            {props.data && props.data.map((cc,index) =>{
            return(
                <div key={index}>
                <div className="searchresultcard">
                    <div >
                    <img src={cc.photo.path} alt="img">
                    </img>
                    <span><IconCheckboxes/></span>
                    </div>
                    <div className="description">
                            <h3>{cc.name}</h3>
                        <HalfRating numberofstar={cc.rate} type="read"/>
                        <label>{cc.details}</label><br/>
                        <label><MdLocationOn size="1.5rem"/> location:{cc.city.name} / {cc.location}</label><br/>
                        <label><MdEmail size="1.5rem"/> email : {cc.email}</label><br/>
                        <label><FaPhoneAlt size="1.5rem"/> phone number: {cc.phone_number} </label><br/>
                        <label>open at: {cc.open_at} &nbsp;&nbsp;&nbsp; close at: {cc.close_at}</label><br/>
                        <label>for adult visitor : <span className="price">{cc.adult_price} $</span> &nbsp;&nbsp;&nbsp; 
                        for children : <span className="price">{cc.child_price} $</span></label><br/>
                        <button className="attractionviewdealbutton" onClick={(e)=>handleclick(e,cc.id)}>View deal</button>
                    </div>
                </div>
            </div>
            )
        })}
        </div>
        )
    }
    if(props.type==="trip"){
        console.log(props.data);
        return(
            <div>
            {props.data && props.data.map((cc,index) =>{
            return(
                <div key={index}>
                <div className="searchresultcard">
                    <div >
                    <img src={cc.photo.path} alt="img">
                    </img>
                    <span><IconCheckboxes/></span>
                    </div>
                    <div className="description">
                        <h3>{cc.description}</h3>
                        <HalfRating numberofstar={cc.rate} type="read"/>
                        <label>{cc.details}</label><br/>
                        <label><MdLocationOn size="1.5rem"/> location:{cc.destination.country.name} / {cc.destination.name}</label><br/>
                        <label>start age: {cc.start_age} &nbsp;&nbsp;&nbsp; end age: {cc.end_age}</label><br/>
                        <button className="attractionviewdealbutton" onClick={(e)=>handleclick(e,cc.id)}>View deal</button>
                </div>
            </div>
            </div>
            )
        })
    }
    </div>)
    }
    else if(props.type==="flight"){
        
        return( 
            <div className="flight">
                <div className="container">
                {props.data && props.data.map((cc,index) => (
                    <div key={index}>
                        <div className="flightcard" style={{opacity: visibledeal[index]? "0.5" : "1"}}>
                            <div className="flightdet">
                                <div className="airlinepic"><img src={cc[0].outbound_flights.airline_photo} alt="img"/></div>
                                <div className="centring-flex">
                                    <FaArrowRight/>
                                    <p>{cc[0].outbound_flights.departe_day}</p>
                                </div>
                                <div>
                                    <p>{cc[0].outbound_flights.From_hour} - {cc[0].outbound_flights.To_hour}</p>
                                    <p>{cc[0].outbound_flights.airline_name}</p>
                                </div>
                                <div>
                                    <p>{gettime(cc[0].outbound_flights.duration)}</p>
                                </div>
                            </div>
                            {cc[1].return_flights && <div className="flightdet">
                                <div className="airlinepic"><img src={cc[1].return_flights.airline_photo} alt="img"/></div>
                                <div>
                                    <FaArrowLeft/>
                                    <p>{cc[1].return_flights.departe_day}</p>
                                </div>
                                <div>
                                    <p>{cc[1].return_flights.From_hour} - {cc[1].return_flights.To_hour}</p>
                                    <p>{cc[1].return_flights.airline_name}</p>
                                </div>
                                <div>
                                    <p>{gettime(cc[1].return_flights.duration)}</p>
                                </div>
                            </div>}
                            <div>
                            <p className="price">1112,9$</p>
                                <button className="bottomright" onClick={()=> handleClick(index)}>
                                    View deal
                                </button>
                            </div>
                            </div>
                        
                        <div className="showdeal" style={{display: visibledeal[index]? "flex" : "none"}}>
                            <div className="showinside">
                                <h3>{cc[0].outbound_flights.from} <FaArrowRight/> {cc[0].outbound_flights.to} </h3>
                                <p>View your flights details</p>
                                <div>
                                    <div className="detailsofflight">
                                        <h4><span style={{fontWeight:"600"}}>Depart</span> {cc[0].outbound_flights.departe_day}</h4>
                                        <hr/><br/>
                                        <div className="insidedetailsofflight">
                                            <div>
                                                <p>{cc[0].outbound_flights.airline_name}</p>
                                                <img src={cc[0].outbound_flights.airline_photo} alt="img" width={"60"} height={"60"}/>
                                            </div>
                                            <div className="centring-flex" style={{fontSize: "20px"}}>
                                                {cc[0].outbound_flights.From_hour}  &nbsp; <FaArrowsAltH size="2em"/>  &nbsp; {cc[0].outbound_flights.To_hour}
                                            </div>
                                            <p>Duration : {gettime(cc[0].outbound_flights.duration)}</p>
                                        </div>
                                    </div>
                                {cc[1].return_flights && <div className="detailsofflight">
                                    <h4><span style={{fontWeight:"600"}}>return</span> {cc[1].return_flights.departe_day}</h4>
                                    <hr/><br/>
                                    <div className="insidedetailsofflight">
                                        <div>
                                        <p>{cc[1].return_flights.airline_name}</p>
                                            <img src={cc[1].return_flights.airline_photo} alt="img" width={"60"} height={"60"}/>
                                        </div>
                                        <div className="centring-flex" style={{fontSize: "20px"}}>
                                            {cc[1].return_flights.From_hour} &nbsp; <FaArrowsAltH size="2em"/>  &nbsp; {cc[1].return_flights.To_hour}
                                        </div>
                                        <p>Duration : {gettime(cc[1].return_flights.duration)}</p>
                                    </div>
                                </div>}
                            </div>
                            <button className="bookflight" onClick={()=>handlebookflight(cc)}>Book now</button>
                            <div className="crossbutton">
                                <RxCrossCircled size="2em" onClick={()=>handleClick(index)}/>
                            </div>
                        </div> 
                        </div>
                        </div>
                        ))}
                        </div>
                        </div>)
    }

} 
export default ViewsearchResultcard; 
