import {React ,useEffect,useState}from "react";
import "./poster.css";
import { NavLink } from "react-router-dom";
import {BiBadgeCheck} from "react-icons/bi";
import img1 from "../../../assets/booking online flight.png";
import img2 from "../../../assets/hoteladverts1239.png";

const Poster =(props) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 2100) {
            setIsVisible(true);
        }
        else {
            setIsVisible(false);
        }
    };
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    if(props.type==="home"){
    return (
        <div className="poster">
            <div className="container">
                <div>
                    <div>
                        <h3>Why Book in Our Site ??</h3>
                        <ul>
                            <li><span>Book your trip in simple steps</span></li>
                            <li><span>Cancel reservation before 48 hours</span></li>
                            <li><span>See reviews and rate</span></li>
                            <li><span>Find your next destination</span></li>
                            <li><span>Search the best value hotel</span></li>
                            <li><span>See reviews and rate</span></li>
                            <li><span>Find your next destination</span></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <img src={img1} alt="pic"></img>
                </div>
            </div>
        </div>
    )}

    else if(props.type==="trip"){
        return(
            <div className="trip">
                <div className="container">
                
                    <div>
                        <p>
                            <span className={` ${isVisible? 'visib' : ''}`}>Explore</span> 
                            <span className={` ${isVisible? 'visib' : ''}`}> The World </span>
                            <span className={` ${isVisible? 'visib' : ''}`}>With</span>
                            <span className={` ${isVisible? 'visib' : ''}`}> Us</span>
                        </p>
                        <p className={` ${isVisible? 'visib' : ''}`}>There are no limits with our website.</p>
                        <p className={` ${isVisible? 'visib' : ''}`}>packing up your bags and book now.</p>
                        <p className={` ${isVisible? 'visib' : ''}`}>Spend your holiday in the most beautiful place.</p>
                    </div>
                    {/* <div className="vv">
                    <a href="/login">Sign in now and start your trip</a> 
                     </div> */}
                </div>
            </div>
        )
    }
    else if(props.type==="hotel"){
        return(
            <div className="hotel">
                <div className="container ">
                    <div>
                        <img src={img2} alt="img"></img>
                    </div>
                    <div>
                        <p>Book your suiet in yout favorite hotel</p>
                        <p className="centring-flex"><BiBadgeCheck size="2em"/>View the details , ratings and opinions of visitors.</p>
                        <p className="centring-flex"><BiBadgeCheck size="2em"/>Choose what suits your request from many offers.</p>
                        <p className="centring-flex"><BiBadgeCheck size="2em"/>Book in simple and easy steps.</p>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default Poster;