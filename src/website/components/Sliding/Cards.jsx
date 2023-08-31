import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card} from 'react-bootstrap';
import {HalfRating , IconCheckboxes} from '../Stars&favoriteIcons/star';
import {AiFillStar} from 'react-icons/ai';
import {SiGooglemaps} from 'react-icons/si';
import {BsPersonFillUp} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Popitwindow from '../popitwindow/Popitwindow';
import { useState } from 'react';
const Cards =(props) => {
    
    const navigate = useNavigate();

    const [alertwindow,setalertwindow] = useState(false);

    function handleclick (e,id) {
        e.preventDefault();
        navigate('/details', { state: { type:props.type , id:id } });
    }

    function setfavorite (val) {
        if(localStorage.getItem('token')){
            console.log(val);
        }
        else {
            
        }
    }

    if (props.type==="hotel"){
        return (
            <div  className='cart'>
                <button onClick={(e)=>handleclick(e,props.ItemData.id)}>
                    <Card className=" p-0 overflow-hidden" style={{}}>
                        <div  className='overflow-hidden rounded p-0 bg-light'>
                            <Card.Img variant="top" src={props.ItemData.photo[0].path} />
                            <div className='item-name'>{props.ItemData.name}
                            </div>
                            <div className='bottomright centring-flex'>{props.ItemData.stars} <AiFillStar size="1em" color="white"/></div>
                        </div>
                        <div className='details'>
                            <label className='hotellocation'><SiGooglemaps/>{props.ItemData.city.country.name}/{props.ItemData.location}</label>
                            <label>price from <span style={{color:"#008234"}}>{props.ItemData.price_start_from} $</span> per night</label><br/>
                            <label>Rooms number: {props.ItemData.num_of_rooms}</label><br/>
                            <label><HalfRating numberofstar={props.ItemData.rate} type="read"/></label><br/>
                            <label style={{color:"gray"}} >reviews : {props.ItemData.num_of_ratings}</label><br/>
                        </div> 
                    </Card>
                </button>
                <div className="topright" onClick={()=>setfavorite(props.ItemData.id)}>
                    <IconCheckboxes/>
                </div>
                
            </div>
            );}


    else if (props.type==="attraction"){
        return (
            <div  className='cart'>
                <button onClick={(e)=>handleclick(e,props.ItemData.id)}>
                    <Card className=" p-0 overflow-hidden">
                        <div className='overflow-hidden rounded p-0 bg-light'>
                            <Card.Img variant="top" src={props.ItemData.photo.path} />
                            <div className='item-name'>{props.ItemData.name}
                            </div>
                        </div>
                        <div className='details'>
                            <label style={{color: "rgb(1, 113, 188)"}}>
                                {props.ItemData.city.name.charAt(0).toUpperCase() + props.ItemData.city.name.slice(1)}
                            </label><br/>
                            <label><span style={{color:"black"}}>Price for adult : <span style={{ background: "#ccff8d",color: "rgb(1, 113, 188)"}}>
                                {props.ItemData.adult_price} $ </span></span>
                                </label><br/>
                            <label><HalfRating numberofstar={props.ItemData.rate} type="read"/></label><br/>
                            <label style={{ color:"gray"}} >reviews : {props.ItemData.num_of_ratings}</label><br/>
                        </div> 
                    </Card>
                </button>
                <div className="topright" onClick={()=>setfavorite(props.ItemData.id)}>
                    <IconCheckboxes/>
                </div>
            </div>

            );}


    else if (props.type==="trip"){
        return (
            <div  className='cart'>
                <button onClick={(e)=>handleclick(e,props.ItemData.id)}>
                    <Card className=" p-0 overflow-hidden" style={{width:"280px",border:"none"}}>
                        <div  className='overflow-hidden rounded p-0 bg-light'>
                            <Card.Img variant="top" src={props.ItemData.photo.path} />
                            <div className='item-name'>{props.ItemData.description}
                            </div>
                            {props.ItemData.offer &&  <div className='topleft centring-flex'>Offer {props.ItemData.offer[0].percentage_off}%</div>}
                        </div>
                        <div className='details'>
                            <label>{props.ItemData.destination.country.name}/{props.ItemData.destination.name}</label><br/>
                            <label>Number of Days : {props.ItemData.days_number}</label><br/>
                            <label>Max of Persons : {props.ItemData.max_persons}</label>
                            <label>ages start from  {props.ItemData.start_age}<BsPersonFillUp size="1.5em" color="black"/></label><br/>
                            <label><HalfRating numberofstar={props.ItemData.rate} type="read"/></label><br/>
                            <label style={{color:"gray"}} >reviews : {props.ItemData.num_of_ratings}</label><br/>
                        </div> 
                    </Card>
            </button>
            <div className="topright" onClick={()=>setfavorite(props.ItemData.id)}>
                <IconCheckboxes/>
            </div>
            </div>

    );}
    else if(props.type==="flight") {
        return(
            <div className="popcontry">
                    <div className='container'>
                        <h3>Popular destination : </h3>
                        <p style={{color:"#887e7e"}}>The most popular choice for travelers in recent times</p>
                        <div className='pop'>
                    {props.data && props.data.map((item,index) => {
                        return(
                            <div className='country' key={index}>
                                <img src={item.path} alt='img'/>
                                <p>{item.name}</p>
                            </div>
                        )
                    })}
                    </div>
                    </div>
            </div>
        )
    }
    
}

export default Cards;
