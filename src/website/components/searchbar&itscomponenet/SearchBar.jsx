import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./SearchBar.css";
import {BsSearch} from 'react-icons/bs';
import BasicDatePicker from "./othercomponent/Basicdatebicker";
import SelectNumberofPerson from "./othercomponent/SelectNumberofPerson";
import MultipleSelectChip from './othercomponent/SelectTravelCity';
import BoxSlider from './othercomponent/Slider';
import { useTranslation } from "react-i18next";


const  SearchBar = (props) => {

    const [Lan,i18n] = useTranslation();

    
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const [recentSearches, setRecentSearches] = useState([]);

    const [ar,setar]=useState(false);

    const [sliderMinvalue,setsliderMinvalue]=useState(0);

    const [sliderMaxvalue,setsliderMaxvalue]=useState(0);
    
    const [adultnum,setAdultnum] = useState();

    const [childnum,setChildnum] = useState();

    const [roomNum,setRoomNum] = useState(1);

    const [checkIn,setCheckin] = useState('');

    const [checkOut,setCheckout] = useState('');

    const[fromcountry,setfromCountry] = useState('');

    const[tocountry,setToCountry] = useState('');
    
    function convertdate(str){
        var date = new Date(str),
        mnth=("0"+(date.getMonth()+1)).slice(-2),
        day=("0"+date.getDate()).slice(-2);
        return [date.getFullYear(),mnth,day].join("-");
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        setRecentSearches([searchQuery,...recentSearches]);
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 6)));
        }
    }
    useEffect(() => { 
        const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(savedSearches);
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        if(props.name==="homesearchbar"){
            setRecentSearches([searchQuery,...recentSearches]);
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches.slice(0, 7)));
            navigate("/searchresult" , { state: {data: "home", word:searchQuery
        }},)
        }

        if(props.name==="hotelsearchbar"){
            navigate("/searchresult" , { state: {data: "hotel", word: searchQuery, checkIn:convertdate(checkIn)
            ,checkOut:convertdate(checkOut),adultnum: adultnum,childnum: childnum,roomnum: roomNum} })
        }

        if(props.name==="flightsearchbar"){
            navigate("/searchresult" , { state: {data :"flight",fromcountry:fromcountry,tocountry:tocountry,
            checkIn:convertdate(checkIn),checkOut:convertdate(checkOut),adultnum: adultnum,childnum: childnum,ar:ar} })
        } 

        if(props.name==="attractionsearchbar"){
            navigate("/searchresult" , { state: {data: "attraction", word: searchQuery, sliderMaxvalue: sliderMaxvalue} })
        }
        
        if(props.name==="tripsearchbar"){
            navigate("/searchresult" , { state: {data: "trip", word: searchQuery, sliderMinvalue:sliderMinvalue,sliderMaxvalue:sliderMaxvalue
        }},)
        }

        
    }

    
    
    // homepage searchbar
    if(props.name==="homesearchbar"){
        return (
            <div>
                <div className="searchbar">
                    <form onSubmit={handleSearch}>
                        <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className={props.name} placeholder={Lan('homesearch')}
                        onKeyPress={handleKeyPress}
                        />
                    </form>
                    <div className="search-icon"><BsSearch size="1em"/></div>
                </div>
            </div>
    );}
    // trip searchbar
    if(props.name==="tripsearchbar"){
        return (
            <div className='tripsearchbar'>
                <div className="searchbar">
                    <form onSubmit={handleSearch}>
                        <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className={props.name} placeholder={Lan('tripsearch')}
                        />
                    </form>
                    </div>
                    <div className="slider">
                        <span>{Lan('min-price')} : {sliderMinvalue}</span>
                        <BoxSlider slidervalue={(e)=>setsliderMinvalue(e)} value={sliderMinvalue}/>
                    </div>
                    <div className="slider">
                        <span>{Lan('max-price')} : {sliderMaxvalue}</span>
                        <BoxSlider slidervalue={(e)=>setsliderMaxvalue(e)} value={sliderMaxvalue}/>
                    </div>
                    <div className='findbutton'>
                    <button onClick={handleSearch}>{Lan('tripsearchbutton')}</button>
                    </div>
                </div>
        );
    }
    // attraction serachbar
        if(props.name==="attractionsearchbar"){
            return (
                <div className='attractionsearchbar'>
                    <div className="searchbar">
                        <form onSubmit={handleSearch}>
                            <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            className={props.name} placeholder={Lan('attractionsearch')}
                            />
                        </form>
                        <div className="search-icon"><BsSearch size="1.5em"/></div>
                    </div>
                    <div className="slider">
                        <span>{Lan('max-price')} : {sliderMaxvalue}</span>
                        <BoxSlider slidervalue={(e)=>setsliderMaxvalue(e)} value={sliderMaxvalue}/>
                    </div>
                    <div className='findbutton'>
                        <button onClick={handleSearch}>{Lan('attractionsearchbutton')}</button>
                    </div>
                </div>
            );}
        //hotel searchbar 
    if(props.name==="hotelsearchbar"||props.name==="hotelsearchresult") {
        return(
            <div className={props.name==="hotelsearchresult"? "hotelsearchbar hotelsearchresult":"hotelsearchbar"}>
                <div className="searchbar">
                    <form onSubmit={handleSearch}>
                        <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className={props.name} placeholder={Lan('hotelsearch')}
                        />
                    </form>
                    <div className="search-icon"><BsSearch size="1.5em"/></div>
                </div>
                <div className="date">
                    <BasicDatePicker name="Check in" value={checkIn} date={(e)=>setCheckin(e)}/>
                    <BasicDatePicker name="Check out" value={checkOut} date={(e)=>setCheckout(e)}/>
                </div>
                <div className="select_room_person">
                    <SelectNumberofPerson type="hotel" adult_number={(e)=>setAdultnum(e)} room_number={(e)=>setRoomNum(e)} 
                    child_number={(e)=>setChildnum(e)}/>
                    </div>
                <button className="searchbutton" onClick={handleSearch}>{Lan('hotelsearchbutton')}</button>
            </div>
        )
        }
    //flight searchbar
    else if (props.name==="flightsearchbar"||props.name==="flightsearchbarresult"){
        return(
            <div className={props.name==="flightsearchbarresult"? "flightsearchbarresult flightsearchbar":"flightsearchbar"}>
                <div className='typeoftravelbutton'>
                    <button onClick={()=>setar(!ar)} className={ar===true ? "clicked":"not-clicked"}>{Lan('one-way')}</button>
                    <button onClick={()=>setar(!ar)}  className={ar===true ? "not-clicked":"clicked"}>{Lan('round-trip')}</button>
                </div>
                    <div className={ar===false ? "round-trip":"one-way"}>
                        <div className="selectcountry"><MultipleSelectChip name={Lan('from')} country={(e)=>setfromCountry(e)}/></div>
                        <div className="selectcountry"><MultipleSelectChip name={Lan('to')} country={(e)=>setToCountry(e)}/></div>
                        <div className='date'>
                            <div className="selectdate"><BasicDatePicker value={checkIn} date={(e)=>setCheckin(e)}/></div>
                            <div className={ar===false ? "selectdate":"hidden"}><BasicDatePicker value={checkOut} date={(e)=>setCheckout(e)}/></div>
                        </div>
                        <div className="selectperson">
                            <SelectNumberofPerson type="flight" adult_number={(e)=>setAdultnum(e)} room_number={(e)=>setRoomNum(e)} child_number={(e)=>setChildnum(e)}/>
                        </div>
                        <button className="searchbut" onClick={handleSearch}style={{color:"white"}}><BsSearch/></button>
                    </div>
            </div>
            )
        }
    }
export default SearchBar;