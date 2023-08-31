import { React , useState , useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import {IoReturnUpBackOutline} from 'react-icons/io5';
import Logo from "../../../assets/logo.png";
import axios from "axios";

const Forgetpassword =()=> {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
      let timer;
      if (isDisabled) {
        timer = setTimeout(() => {
          setIsDisabled(false);
        }, 60000); // 60000 milliseconds = 1 minute
      }
      return () => {
        clearTimeout(timer);
      };
    }, [isDisabled]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    let response;
    try {
      response = await axios.post('http://127.0.0.1:8000/api/user/forget-password', { email });
      console.log(response);
      if(response.data.success){
        setMessage(response.data.message);
      }
      
      setError(response.data.error);

    } catch (error) {
      setError(error.message);
    }
  };
    return (
        <div className="mainWrap">
            <div className="container">
                <div className="formContainer">
                    <div className="formWrapper">
                        <Link to="/login"><IoReturnUpBackOutline size="2rem" color="black"/></Link>
                        <span className="logo">
                            <img src={Logo} alt="" />
                        </span>
                        <span className="title">Forget your password?</span>
                        <p style={{paddingBottom:"30px"}}>No problem. Just enter your email address below — we’ll send you a link to reset it.</p>
                        <form onSubmit={handleSubmit}>
                            <label form="email">Email address</label>
                            <input type="email" placeholder="Email" id="email"value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            {message && <p style={{color:"green",fontSize:"20px",fontWeight:"600"}}>{message}</p>}
                            {error && <p className="errormessage">{error}</p>}
                            <button onClick={()=>handleSubmit} >Send a Link</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

//     import React, { useState, useEffect } from 'react';

// function MyButton() {
//   const [isDisabled, setIsDisabled] = useState(false);

//   const handleClick = () => {
//     setIsDisabled(true);
//   };

//   useEffect(() => {
//     let timer;
//     if (isDisabled) {
//       timer = setTimeout(() => {
//         setIsDisabled(false);
//       }, 60000); // 60000 milliseconds = 1 minute
//     }
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [isDisabled]);

//   return (
//     <button onClick={handleClick} disabled={isDisabled}>
//       Click me
//     </button>
//   );
// }

// export default MyButton;
}
export default Forgetpassword;