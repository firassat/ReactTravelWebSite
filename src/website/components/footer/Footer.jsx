import React from "react"
import "./Footer.css";
import logo from "../../../assets/logo.png";
import {BsTwitter,BsFacebook} from 'react-icons/bs';
import {FaGooglePlus} from 'react-icons/fa';
import { NavLink } from "react-router-dom";

const Footer =() => {
    return(
            <div className="footer">
                <div className="container">
                    <div>
                        <img src={logo} alt="logo"></img>
                    </div>
                    <div>
                        <p>Travel site.</p>
                        <p>Discover your Dream destination.</p>
                        <p>Search your Holiday.</p>
                        <p>Book Tours and attraction Tickets.</p>
                        <p>Plan and book Your Trip.</p>
                    </div>
                    <div>
                        <h5>Links</h5>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/hotels">Our Hotels</NavLink>
                        <NavLink to="/trips">Our Trips</NavLink>
                        <a href="n">Tickets</a>
                        <NavLink to="/attractions">Attractions</NavLink>
                    </div>
                    <div>
                        <h5>About us</h5>
                        <NavLink to="/login">Sign In</NavLink>
                        <NavLink to="/register">Register</NavLink>
                        <a href="a2">Blog</a>
                        <a href="a3">Contact Us</a>
                    </div>
                    <div>
                        <h5>Contact Us</h5>
                        <p>Get In Touch With Us</p>
                        <a href="a"><BsTwitter size="2em" color="#1da1f2"/></a>
                        <a href ="ab"><BsFacebook size="2em" color="#1877f2"/></a>
                        <a href="aa"><FaGooglePlus size="2em" color="#dd4b39"/></a>
                    </div>
                </div>  
            </div>
    )
}
export default Footer;