import React, { useEffect, useState ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import Gallery from "../Gallery/Gallery";
import "./room.css";
import { RxCrossCircled } from "react-icons/rx";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoPersonSharp , IoBed } from "react-icons/io5";
import axios from "axios";

const Room = (props) => {

  const [data,setdata] = useState([]);
  const [state , setstate] = useState(false);
  const modalRef = useRef(); 

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setstate(false);
      }
    }
  
  document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
}, [modalRef]);
  


  const handleSubmit = async () => {
    try {
      const response =await axios.post('http://127.0.0.1:8000/api/ShowOneRoom',{
          id:props.id,
          selectedRoomType:props.name,
      });
      setdata(response.data.Room_info);
    }
    catch(error) {
      console.log(error.message);
    }
  }
  
  const handlebook = (e,id) => {
    e.preventDefault();
    navigate('/reservation', { state: { type:"hotel",id:id,data:data} });

  }
    
  return(
    <div>
      <button className="room_type_name" onClick={()=> {setstate(!state);handleSubmit()}}>{props.name}</button>
      <div className="room"  style={{ display: state? "flex":"none"}}>
      {data && data.hotel &&
      <div ref={modalRef} className="roomdetails"> 
        <div style={{width:"100%"}}>
          {data.photo&&<Gallery type="rounded-small" data={data.photo} />}
          </div>
          <div className="subtitleofroom">
            <h3>{data.hotel.name} hotel</h3>
            <p className="roomtype">{data.room_type}</p>
            <p>{data.details}</p>
            <p style={{fontSize:"16px"}}>{data.Beds} Beds <IoBed/></p>
            <p  style={{fontSize:"16px"}}>{data.Sleeps} sleeps <IoPersonSharp/></p>
            {data.features.map((item,index)=> ((
              <p className="roomfeatures" key={index}>
                <IoMdCheckmarkCircleOutline size="1.3em" color="rgb(15 102 202)"/>
                {item.name}
              </p>
            )))}
            <p style={{fontWeight:"600",fontSize:"18px"}}>Price for night<span className="price">  {data.Price_for_night}$</span></p>
          </div>
          <div className="topright">
          <RxCrossCircled onClick={()=>setstate(!state)} size="2em"/>
          </div>
          <button className="bookroom" onClick={(e)=>handlebook(e,data.id)}>Book now</button>
      </div>}
      </div>
    </div>
    );
}
export default Room;