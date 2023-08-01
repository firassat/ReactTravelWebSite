import React, { useState ,useEffect } from 'react';
import "./SearchBar.css";
import {BsSearch} from 'react-icons/bs';
import BasicDatePicker from "./othercomponent/Basicdatebicker";
import SelectPersonRoom from "./othercomponent/SelectPersonRoom";
import MultipleSelectChip from './othercomponent/SelectTravelCity';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const  SearchBar = (props) => {
    
    
    const [query, setQuery] = useState('');
    
    const [ar,setar]=useState(false);

    const [slidervalues,setslidervalue]=useState('');
    
    function set1() {
        setar(!ar);
    }

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        //fetch data
    }
    
    //homepage searchbar
    if(props.name==="homesearchbar"){
        return (
            <div>
                <div className="searchbar">
                    <form onSubmit={handleSearch}>
                        <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className={props.name} placeholder="Where to ?"
                        />
                    </form>
                    <div className="search-icon"><BsSearch size="1.5em"/></div>
                </div>
            </div>
    );}
    // trip searchbar
    if(props.name==="tripsearchbar"){
        
        return (
            <div className="searchbar">
                <form onSubmit={handleSearch}>
                    <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className={props.name} placeholder="from ?"
                    />
                </form>
                <div className="search-icon"><BsSearch size="1.5em"/></div>
            </div>
        );}
        if(props.name==="attractionsearchbar"){
            return (
                <div className='attractionsearchbar'>
                    <div className="searchbar">
                        <form onSubmit={handleSearch}>
                            <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            className={props.name} placeholder="Search a destination , attraction or activity."
                            />
                        
                        </form>
                        <div className="search-icon"><BsSearch size="1.5em"/></div>
                    </div>
                    <div className="slider">
                        <span>Max price : {slidervalues}</span>
                        <Box sx={{ width: 300 }}>
                            <Slider
                                defaultValue={0}
                                valueLabelDisplay="auto"
                                onChange={(e) => setslidervalue(e.target.value)}
                                step={10}
                                marks
                                min={0}
                                max={100}
                            />
                        </Box>
                    </div>
                    <div className='findbutton'>
                        <button>Find</button>
                    </div>
                </div>
            );}
        //hotel searchbar 
    else if(props.name==="hotelsearchbar") {
        return(
            <div className="hotelsearchbar">
                <div className="searchbar">
                    <form onSubmit={handleSearch}>
                        <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className={props.name} placeholder="hotel name or destination"
                        />
                    </form>
                    <div className="search-icon"><BsSearch size="1.5em"/></div>
                </div>
                <div className="date"><BasicDatePicker name="Check in"/><BasicDatePicker name="Check out"/></div>
                <div className="selectperson"><SelectPersonRoom/></div>
                <div className="searchbutton"><button>Find Hotels</button></div>
            </div>
        )
        }
    //flight searchbar
    else if (props.name==="flightsearchbar"){
        return(
            <div className="flightsearchbar">
                <button onClick={()=>set1()} className={ar===true ? "clicked":"not-clicked"}>One - Way</button>
                <button onClick={()=>set1()}  className={ar===true ? "not-clicked":"clicked"}>Round - Trip</button>
                <div className={ar===false ? "round-trip":"one-way"}>
                    <div className="selectcountry"><MultipleSelectChip name="from"/></div>
                    <div className="selectcountry"><MultipleSelectChip name="to"/></div>
                    <div className="selectdate"><BasicDatePicker/></div>
                    <div className={ar===false ? "selectdate":"hidden"}><BasicDatePicker/></div>
                    <div className="searchbut"><button style={{color:"white"}}><BsSearch/></button></div>
                </div>
            </div>
            )
        }
    }
export default SearchBar;
// getAriaValueText={valuetext}