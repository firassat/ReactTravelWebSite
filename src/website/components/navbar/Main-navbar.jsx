import {React , useState , useEffect} from "react";
import "./Main-navbar.css";
import { NavLink , useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import flag from "../../../assets/Us@3x.png";
import {HiLanguage} from 'react-icons/hi2';
import {FaBed,FaPlane} from 'react-icons/fa';
import {GiCampingTent,GiPalmTree } from 'react-icons/gi';
import { useTranslation } from "react-i18next";

const MainNavbar = (props) => {


    const [name,setname] = useState('');
    const [first_name,setFname] = useState('');
    const [last_name,setLname] = useState('');
    const [profileImage,setprofileImage] = useState('');
    const token = localStorage.getItem("token");

    const [Lan,i18n] = useTranslation();
    // {t{'title'}}

    useEffect(()=> {
        if(token) {
          try {
            setFname(JSON.parse(localStorage.getItem("first_name")));
            setLname(JSON.parse(localStorage.getItem("last_name")));
            setname(first_name.charAt(0).toUpperCase()+last_name.charAt(0).toUpperCase());
            setprofileImage(JSON.parse(localStorage.getItem('profilephoto')));
          }
          catch {}
        }
    },[first_name,last_name,profileImage,token]);

    
const languageOptions = [{ label: 'Eng' },{ label: 'Ar' },];
const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].value);
const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    if(event.target.value==="Ar") {
      i18n.changeLanguage('ar');
    }
    if(event.target.value==="Eng") {
      i18n.changeLanguage('en');
    }
}

// const handleSignin = () => {
//     localStorage.setItem('NavbarState', 'sign-nav');
//     setNavbarState("sign-nav");
// };

// const handleLogout = () => {
//     localStorage.setItem('NavbarState', 'main-navbar');
//     setNavbarState("main-navbar");
// };
// const handleLog = () => {
//     localStorage.setItem('NavbarState', 'second-nav');
//     setNavbarState("second-nav");
// };

//     return(
//         <div className={navbarState==="sign-nav" ? "sign-nav": navbarState==="main-navbar" ?"main-navbar":"white-navbar"}>
//             <div className="container">
//                 <div className="up-navbar">
//                     <div>
//                         <NavLink to="/" onClick={() => handleLogout()}>
//                             <img src={logo} alt="logo"></img>
//                         </NavLink>
//                     </div>
//                     <div className="centring-flex">
//                         <div>
//                             <HiLanguage/>
//                             <select value={selectedLanguage} onChange={handleLanguageChange}>
//                             {languageOptions.map((option,index) => (
//                             <option key={index} value={option.value}>
//                             {option.label}
//                             </option>))}
//                             </select>
//                         </div>
//                         <div>
//                             <img src={flag} alt="flag"></img>
//                             Usd
//                         </div>
//                         <div className={localStorage.getItem('token')?"hidden":""}>
//                             <NavLink to="login" onClick={() => handleSignin()}>Sign in</NavLink>
//                         </div>
//                         <div className={localStorage.getItem('token')?"":"hidden"}>
//                             <NavLink to="/profile" onClick={() => handleSignin()}>{name}</NavLink>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={navbarState==="main-navbar" ? "firstnav" : "secondnav"}>
//                     <NavLink  to="hotels" onClick={()=> handleLog()}>
//                         <span>Hotels</span>
//                         <div><FaBed size="1.5em"/></div>
//                     </NavLink>
//                     <NavLink  to="flights" onClick={()=> handleLog()}>
//                         <span>Flights</span>
//                         <div><FaPlane size="1.5em"/></div>
//                     </NavLink>
//                     <NavLink to="trips" onClick={()=> handleLog()}>
//                         <span>Trips</span>
//                         <div><GiCampingTent size="1.5em"/></div>
//                     </NavLink>
//                     <NavLink  to="attractions" onClick={()=> handleLog()}>
//                         <span>Attractions</span>
//                         <div><GiPalmTree size="1.5em"/></div>
//                     </NavLink>
//                 </div>
//             </div>
//         </div>
//     )
  const location = useLocation();
  const initialNavbarState = localStorage.getItem('NavbarState') || 'main-navbar';
  const [navbarState, setNavbarState] = useState(initialNavbarState);
  

  useEffect(() => {
    if (location && location.pathname!== '/') {
      const navbarState = localStorage.getItem('NavbarState') || 'main-navbar';
      setNavbarState(navbarState);
    }
  }, [navbarState, location]);

  const handleSignin = () => {
    localStorage.setItem('NavbarState', 'sign-nav');
    setNavbarState("sign-nav");
  };

  const handleLogout = () => {
    localStorage.setItem('NavbarState', 'main-navbar');
    setNavbarState("main-navbar");
  };

  const handleLog = () => {
    localStorage.setItem('NavbarState', 'second-nav');
    setNavbarState("second-nav");
  };

  return(
    <div className={navbarState==="sign-nav"? "sign-nav": navbarState==="main-navbar"?"main-navbar":"white-navbar"}>
    {/* // <div className={props.name}> */}
      <div className="container">
        <div className="up-navbar">
          <div>
            <NavLink to="/" onClick={() => handleLogout()}>
              <img src={logo} alt="logo"></img>
            </NavLink>
          </div>
          <div className="centring-flex">
            <div>
              <HiLanguage/>
              <select value={selectedLanguage} onChange={handleLanguageChange}>
                {languageOptions.map((option,index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <img src={flag} alt="flag"></img>
              Usd
            </div>
            <div className={localStorage.getItem('token')?"hidden":""}>
              <NavLink to="login" onClick={() => handleSignin()}>{Lan('signin')}</NavLink>
            </div>
            <div className={localStorage.getItem('token')?"":"hidden"}>
              
              {profileImage && <NavLink to="/profile" onClick={() => handleSignin()} className="profile-photo">
              <img src={profileImage} style={{width:"50px",height:"50px",borderRadius:"50%"}} alt="img"/>
              </NavLink>}
              {!profileImage && <NavLink to="./profile"  onClick={() => handleSignin()}>
              {name}
                </NavLink>}
            </div>
          </div>
        </div>
        <div className={navbarState==="main-navbar"? "firstnav" : "secondnav"}>
          <NavLink  to="hotels" onClick={()=> handleLog()}>
            <span>{Lan('hotel')}</span>
            <div><FaBed size="1.5em"/></div>
          </NavLink>
          <NavLink  to="flights" onClick={()=> handleLog()}>
            <span>{Lan('flights')}</span>
            <div><FaPlane size="1.5em"/></div>
          </NavLink>
          <NavLink to="trips" onClick={()=> handleLog()}>
            <span>{Lan('trips')}</span>
            <div><GiCampingTent size="1.5em"/></div>
          </NavLink>
          <NavLink  to="attractions" onClick={()=> handleLog()}>
            <span>{Lan('attraction')}</span>
            <div><GiPalmTree size="1.5em"/></div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default MainNavbar;


    // const [navbarState, setNavbarState] = useState(localStorage.getItem('NavbarState') !== null ? 
    // (localStorage.getItem('NavbarState') === 'sign-nav' ? "sign-nav":
    // localStorage.getItem('NavbarState')  === "second-nav" ? "second-nav" :
    // localStorage.getItem('NavbarState')  === "white-navbar"?"white-navbar" : "main-navbar")
    // :"main-navbar");