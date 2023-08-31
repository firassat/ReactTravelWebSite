import {React,useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import "./login.css";
import Logo from "../../../assets/logo.png";
import tick from "../../../assets/pngwing.com.png";

const VerifyEmail = () => {

    return (
        <div className="mainWrap">
            <div className="container">
                <div className="formContainer">
                    <div className="formWrapper">
            {/* <span className="logo">
            <img src={Logo} alt="" />
            </span>
            <span className="title">Welcome Back</span> */}
                        <img src={tick} att="img" style={{width:"500px",height:"300px",objectFit:"contain"}}/>  
                        <p> Your email has been verified succesfully</p>          
                    </div>
                </div>
            </div>
      {/* <Popitwindow/> */}
        </div>
);
};

export default VerifyEmail;