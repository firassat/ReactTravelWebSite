import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import "./popitwindow.css";
import img from "../../../assets/login-requird.jpg";

const Popitwindow = (props) =>{
  const [state,setstate] = useState(true);
      
    return (
        <div className="showdeal" style={{display: state?"flex":"none"}}>
          <div className="abs">
            <img src={img} style={{width:"300px"}} alt="img"></img>
            <p>Log In required</p>
            <p>please Log in for no limit actions </p>
            <RxCrossCircled onClick={()=>setstate(!state)} className="crossbutton "/>
            <NavLink to="/login">go to log in</NavLink>
          </div>
        </div>
    )
}
export default Popitwindow;