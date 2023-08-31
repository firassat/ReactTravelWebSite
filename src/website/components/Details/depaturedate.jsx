import React from "react";
import { useNavigate } from "react-router-dom";

const Departdate = (props) => {
    const navigate = useNavigate();

    function getdate(val) {
        const date = new Date(val);
        const day = date.getDate();
        const month = date.getMonth()+1;
        const year = date.getFullYear()
        return `${year} / ${month} /  ${day}`;
    
    }
    // function getdate(dateString) {
    //     const date = new Date(dateString);
    //     const year = date.getFullYear();
    //     const month = date.getMonth() + 1; // add 1 to get the correct month (January is 0)
    //     const day = date.getDate();
    //     return `${year}-${month}-${day}`;}
    function handleClick (id,departure_date) {
        navigate('/reservation', { state: { type:"trip",id:id,data:props.data,departure_date:departure_date} });
    }
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                <p style={{fontSize:"25px",fontWeight:"600" ,margin :"20px 0"}}>Select a departure month</p>
                <div>
                {props.data.dates && 
                props.data.dates.map((item,index) =>(
                <button className='departuredate' onClick={()=>handleClick(item.id,item.departure_date)} key={index}>{getdate(item.departure_date)}
                <br/>
                <span>Price :<span className="price">{item.price} $</span> </span></button>
            ))
            }
            </div>
            
                </div>
    )


}
export default Departdate;