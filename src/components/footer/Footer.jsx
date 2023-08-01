import React from "react"
import "./Footer.css";
import logo from "../../assets/logo.png";
import {BsTwitter,BsFacebook} from 'react-icons/bs';
import {FaGooglePlus} from 'react-icons/fa';

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
                        <a href="a">Home</a>
                        <a href="b">Our Hotels</a>
                        <a href="b">Our Trips</a>
                        <a href="n">Tickets</a>
                        <a href="m">Attractions</a>
                    </div>
                    <div>
                        <h5>About us</h5>
                        <a href="a">Sign In</a>
                        <a href="a1">Register</a>
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