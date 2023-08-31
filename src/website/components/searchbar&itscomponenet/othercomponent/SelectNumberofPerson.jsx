import {React ,useState, useEffect } from "react";
import "./SelectNumberofPerson.css"

const SelectNumberofPerson =(props) => {

    const [state,setstate]=useState(false);
    const [adult,setadult]=useState(props.adultnum||1);
    const [child,setchild]=useState(props.childnum||0);
    const [room,setrooms]=useState(props.roomnum||1);
    // const [var1,setvar1]=useState(1);

    useEffect(() => {
        props.adult_number(adult);
        props.child_number(child);
        if(props.type==="hotel"){
            props.room_number(room); 
        }
    }, [adult, child, room, props]);

    // useEffect(() => {

    //     if((adult + child)/room===5){
    //         setvar1((adult+child)/(room+1));
    //         setrooms(room + 1);
    //     }

    // }, [adult, child,room]);

    function set() { 
        setstate(!state);
    }
    
    if(props.type==="hotel"){
        return(
            <div className="drop-down">
                <button onClick={()=>set()}>{adult} adult - {room} room </button>
                <div className={ state === true ? "visible": "hidden"}>
                    <div>
                        <div className="choose">
                        <div>room</div>
                        <div>
                            {/* <button disabled={(room===1)||(((adult+child)/room) >= var1)} onClick={()=>setrooms(room - 1)}>-</button> */}
                            <button disabled={(room===1)} onClick={()=>setrooms(room - 1)}>-</button>
                            <span>{room}</span>
                            <button onClick={()=>setrooms(room + 1)}>+</button> 
                        </div>
                        </div>
                        <div className="choose">
                        <div>adult</div>
                        <div>
                            <button disabled={adult===1} onClick={()=>setadult(adult - 1)}>-</button>
                            <span>{adult}</span>
                            <button onClick={()=>setadult(adult + 1)}>+</button>
                        </div>
                        </div>
                        <div className="choose">
                        <div>child</div>
                        <div>
                            <button disabled={child===0} onClick={()=>setchild(child - 1)}>-</button>
                            <span>{child}</span>
                            <button onClick={()=>setchild(child + 1)}>+</button>
                        </div>
                        </div>
                    </div>   
                </div>
            </div>
        )
    }
    else if(props.type==="flight") {
        return(
            <div className="drop-down">
                <button onClick={()=>set()}>{adult} adult - {child} child </button>
                <div className={ state === true ? "visible": "hidden"}>
                    <div>
                        <div className="choose">
                        <div>adult</div>
                        <div>
                            <button disabled={adult===1} onClick={()=>setadult(adult - 1)}>-</button>
                            <span>{adult}</span>
                            <button onClick={()=>setadult(adult + 1)}>+</button>
                        </div>
                        </div>
                        <div className="choose">
                        <div>child</div>
                        <div>
                            <button disabled={child===0} onClick={()=>setchild(child - 1)}>-</button>
                            <span>{child}</span>
                            <button onClick={()=>setchild(child + 1)}>+</button>
                        </div>
                        </div>
                    </div>   
                </div>
            </div>
        )
    }
}
export default SelectNumberofPerson;


