import React from "react";
import { HalfRating , IconCheckboxes } from "../Stars&favoriteIcons/star";
import {BsArrowUpRight} from 'react-icons/bs';
import {SiGooglemaps} from 'react-icons/si';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./heading.css";
const Heading = (props) => {

    function gettime(val) {
        const date = new Date(val);
        const hour = date.getHours();
        const minute = date.getMinutes();
        return (hour +":" + minute);

    }

    function getdays(available_days) {
        let true_days = [];
        for (let day in available_days) {
            if (available_days[day]) {
                true_days.push(day + " - ");
            }
        }

        return(true_days);
    }

    if(props.type==="attraction") {
        return(
            <div className="heading">
                <h3>
                    {props.data.name}
                </h3>
                <div className="rate-reviwes">
                    <HalfRating numberofstar={props.data.rate} type="read"/>
                    <span> reviews {props.data.num_of_ratings} </span>
                    <span className="centring-flex" style={{color:"black",fontWeight:"600"}}><SiGooglemaps color="black"/> <span>#{props.data.city.name}</span>/{props.data.location}</span>
                    <a href={props.data.website_url}><BsArrowUpRight color="black"/>Visit website</a>
                </div>
                <div style={{fontWeight:"600"}}>open at: {gettime(props.data.open_at)} /close at: {gettime(props.data.close_at)}</div>
                <div>{getdays(props.data.available_days)}</div>
                <div className="topright" >
                    <IconCheckboxes/>
                </div>
            </div>
        )
    }
    if(props.type==="trip") {
        return(
            <div className="heading">
                <h3>
                    {props.data.description}
                </h3>
                <div className="rate-reviwes">
                    <HalfRating numberofstar={props.data.rate} type="read"/>
                    <span> reviews {props.data.num_of_ratings} </span>
                    <div className="centring-flex" ><SiGooglemaps color="black"/><span style={{color:"blue"}}>#{props.data.destination.name}</span></div>
                </div>
            </div>
        )
    }
    if(props.type==="hotel") {
        return(
            <div className="heading">
                <h3>
                    {props.data.name}
                </h3>
                <div className="rate-reviwes">
                    <HalfRating numberofstar={props.data.rate} type="read"/>
                    <span> reviews {props.data.num_of_ratings} </span>
                    <span className="centring-flex" style={{fontWeight:"600"}}><SiGooglemaps color="black"/> <span>#{props.data.city.country.name}/{props.data.city.name}</span>/{props.data.location}</span>
                    <a href={props.data.website_url}><BsArrowUpRight color="black"/>Visit website</a>
                </div>
                <div className="email_phone">
                    <div> <MdEmail size="1.5rem"/>Email : {props.data.email}</div>
                    <div> <FaPhoneAlt size="1.5rem"/>phone number : {props.data.phone_number}</div>
                </div>
                <p className="hoteltype">{props.data.type.name}</p>
                <div className="topright">
                    <IconCheckboxes/>
                </div>
            </div>
        )
    }
}
export default Heading;