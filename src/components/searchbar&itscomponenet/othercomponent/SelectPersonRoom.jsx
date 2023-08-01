import React from "react";
import { useState } from "react";
import "./SelectPersonRoom.css"

const SelectPersonRoom =(props) => {

const [state,setstate]=useState(false);
const [guest,setguests]=useState(1);
const [room,setrooms]=useState(1);

function set() { 
    setstate(!state);
}
return(
    <div className="drop-down">
        <button onClick={()=>set()}>{guest} person - {room} room</button>
        <div className={ state === true ? "visible": "hidden"}>
            <div>
                <div className="choose">
                <div>room</div>
                <div>
                    <button disabled={room===1} onClick={()=>setrooms(room - 1)}>-</button><span>{room}</span><button onClick={()=>setrooms(room + 1)}>+</button> 
                </div>
                </div>
                <div className="choose">
                <div>guests</div>
                <div>
                    <button disabled={guest===1} onClick={()=>setguests(guest - 1)}>-</button><span>{guest}</span><button onClick={()=>setguests(guest + 1)}>+</button>
                </div>
                </div>
            </div>   
        </div>
    </div>
)
}
export default SelectPersonRoom;





