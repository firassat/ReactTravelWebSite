import {React , useState} from "react";
import "./Main-navbar.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import flag from "../../assets/Us@3x.png";
import {HiLanguage} from 'react-icons/hi2';
import {FaBed,FaPlane} from 'react-icons/fa';
import {GiCampingTent,GiPalmTree } from 'react-icons/gi';

const MainNavbar = () => {
    const [sta, setsta] = useState("main-navbar");
    const handleClick = (props) => {
        setsta("second-nav");
    };

const languageOptions = [{ label: 'Eng' },{ label: 'Ar' },];
const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].value);
const handleLanguageChange = (event) => {setSelectedLanguage(event.target.value);}

    return(
        <div className={ sta==="sign-nav" ? "sign-nav":"main-navbar"}>
            <div className="container">
                <div className="up-navbar">
                    <div>
                        <NavLink to="/" onClick={() => setsta("main-navbar")}>
                            <img src={logo} alt="logo"></img>
                        </NavLink>
                    </div>
                    <div className="centring-flex">
                        <div>
                            <HiLanguage/>
                            <select value={selectedLanguage} onChange={handleLanguageChange}>
                            {languageOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>))}
                            </select>
                        </div>
                        <div>
                            <img src={flag} alt="flag"></img>
                            Usd
                        </div>
                        <div>
                            <NavLink to="login" onClick={() => setsta("sign-nav")}>Sign in</NavLink>
                        </div>
                    </div>
                </div>
                <div className={sta==="main-navbar" ? "firstnav" : "secondnav"}>
                    <NavLink  to="hotels" onClick={handleClick}>
                        <span>Hotels</span>
                        <div><FaBed size="1.5em"/></div>
                    </NavLink>
                    <NavLink  to="flights" onClick={handleClick}>
                        <span>Flights</span>
                        <div><FaPlane size="1.5em"/></div>
                    </NavLink>
                    <NavLink to="trips" onClick={handleClick}>
                        <span>Trips</span>
                        <div><GiCampingTent size="1.5em"/></div>
                    </NavLink>
                    <NavLink  to="attractions" onClick={handleClick}>
                        <span>Attractions</span>
                        <div><GiPalmTree size="1.5em"/></div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
export default MainNavbar;