import { useNavigate } from "react-router-dom";
import '../Details/about.css';
import {MdErrorOutline} from "react-icons/md";
import img from "../../../assets/20945897.jpg";
const About = (props) => {
  const navigate = useNavigate();

  function bookTicket () {
    navigate('/reservation', { state: { type:props.type , id:props.data.id , data:props.data} });

  }
  if(props.type==="attraction") {
    return (
      <div className="attraction-about">
        <h4 style={{fontWeight:"bold"}} >About</h4><hr/>
        <p className="rating">
          {props.data.rate}
          {props.data.rate >=4 && <span> Excellent</span>}
          {props.data.rate >=0 && props.data.rate <4 && <span> Good</span>}
        </p>
        <p>{props.data.details}</p><hr/>
        <p style={{display:"flex"}}><MdErrorOutline size="1.5em" color="red"/>{props.data.type.type} :</p>
        <p> {props.data.type.details}</p><hr/>
        <p>email: {props.data.email}</p><br/>
        <p>Adult ability per day : {props.data.adult_ability_per_day}</p><br/>
        <p>child ability per day : {props.data.child_ability_per_day}</p><br/>
        <p>price for adult visitors : <span className="price">{props.data.adult_price} $ </span></p><br/>
        <p>price for child visitors : <span className="price">{props.data.child_price} $ </span></p><br/>
        <div className="wrap">
          <button className="bookbutton" onClick={()=>bookTicket()}>book now</button>
        </div>  
      </div>
    );
  }
  else if(props.type==="trip") {
    return(
    <div>
      <h1 style={{fontWeight:"600"}}>
        {props.data.description}
      </h1>
      {props.data.offers && <p className="off">
        Offer {props.data.offers[0].percentage_off} %</p>}
      <p style={{fontSize:"22px",fontWeight:"600px",marginTop:"20px"}}>
        {props.data.days_number} days
      </p>
      <p>{props.data.details}</p>
      <div style={{display:"flex",flexWrap:"wrap"}}>
        {props.data.services.map((item,index) =>(
            <p className="tripfeatures" key={index}>{item.service}</p>
          )
        )}
      </div>
      <div style={{display:"flex",flexWrap:"wrap"}}>
        {props.data.activities.map((item,index) =>(
            <p className="tripfeatures" key={index}>{item.activity}</p>

          )
        )}
      </div>
      <div style={{marginTop:"30px"}}>
      <p style={{fontWeight:"600"}}>Max persons in a group : {props.data.max_persons}</p>
      <p style={{fontWeight:"600"}}>Start age from : {props.data.start_age}</p>
      </div>    
    </div>
    )
  }
    if(props.type==="hotel") {
    return (
      <div className="hotel-about">
        <img src={img} alt="img"/>
        <div>{props.data.details}</div>
      </div>
    );
  }
}
export default About;