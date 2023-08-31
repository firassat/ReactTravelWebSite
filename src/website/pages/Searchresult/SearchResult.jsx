import {React,useEffect,useState} from "react";
import { useLocation }from "react-router-dom";
import ViewsearchResultcard from "../../components/viewsearchresult/ViewsearchResult";
import {BsSearch} from 'react-icons/bs';
import BasicDatePicker from "../../components/searchbar&itscomponenet/othercomponent/Basicdatebicker";
import SelectNumberofPerson from "../../components/searchbar&itscomponenet/othercomponent/SelectNumberofPerson";
import MultipleSelectChip from "../../components/searchbar&itscomponenet/othercomponent/SelectTravelCity";
import BoxSlider from "../../components/searchbar&itscomponenet/othercomponent/Slider";
import axios from "axios";
import {ColorRadioButtons ,IndeterminateCheckbox}from "../../components/searchbar&itscomponenet/othercomponent/Checkbuttons&Radio";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const SearchResult=() => {


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleChange = (event, value) => {
        setPage(value);
    };



    function convertdate(str){
        var date = new Date(str),
        mnth=("0"+(date.getMonth()+1)).slice(-2),
        day=("0"+date.getDate()).slice(-2);
        return [date.getFullYear(),mnth,day].join("-");
    }
    
    const location = useLocation();

    const[searchQuery,setSearchQuery]=useState(location.state.word);

    const [check_in,setCheckin] = useState(location.state.checkIn);
    const [check_out,setCheckout] = useState(location.state.checkOut);

    const[fromcountry,setfromCountry] = useState(location.state.fromcountry);
    const[tocountry,setToCountry] = useState(location.state.tocountry);

    const [sliderMinvalue,setsliderMinvalue]=useState(location.state.sliderMinvalue);
    const [sliderMaxvalue,setsliderMaxvalue]=useState(location.state.sliderMaxvalue);

    const [adultnum,setAdultnum] = useState(location.state.adultnum);
    const [childnum,setChildnum] = useState(location.state.childnum);
    const [roomNum,setRoomNum] = useState(location.state.roomnum);

    const [hotelStars,setHotelstars] = useState(1);
    const [hotelType,setHoteltype] = useState('');
    const [hotelRate,setHotelrate] = useState(1);
    const [hotelcheckedfacilities,setHotelcheckedfacilities] = useState([]);

    const[data,setdata]=useState([]);

    const [checked,setChecked] = ([false,false]);

    const handleCheckboxChange = (index) => {
        setChecked(prevState => {
            const checked = [...prevState.checked];
            checked[index] = !checked[index];
            return { checked };
        });
    }

console.log("roomnum"+roomNum);

    const [ar,setar]=useState(location.state.ar);



useEffect(()=> {

    if(location.state.data==="home"){
        const search = async () =>{
            const response = await axios.post(`http://127.0.0.1:8000/api/user/searchForAll?page=${page}`, {
                        word:searchQuery
                        });
                console.log(response);
                setdata(response.data);
                // setTotalPages(response.data.data.last_page);
        }
    search();
    }

    if(location.state.data==="hotel"){
        console.log(searchQuery);
        const search = async () =>{
            try {

                const formData = new FormData();
            
                Object.entries(hotelcheckedfacilities).forEach(([key, value], index) => {
                    formData.append(hotelcheckedfacilities[index], value);
                });
                console.log(check_in);
                formData.append('word',searchQuery);
                formData.append('check_in',check_in);
                formData.append('check_out',check_out);
                formData.append('num_of_rooms',roomNum);
                formData.append('num_of_adult',adultnum);
                formData.append('num_of_children',childnum);
                if(hotelRate) {
                    formData.append('rate',hotelRate);
                }
                if(hotelStars) {
                    formData.append('stars',hotelStars);
                }
                if(hotelType) {
                    formData.append('hotel_type',hotelType);
                }
                


            const response = await axios.post(`http://127.0.0.1:8000/api/hotel/Hotelsearch?page=${page}`,
                        // word:searchQuery,
                        // check_in:check_in,
                        // check_out:check_out,
                        // num_of_rooms:2,
                        // num_of_adults:adultnum,
                        // num_of_children:childnum,
                        formData
                        );
                setdata(response.data.All_hotels.data);
                setTotalPages(response.data.All_hotels.last_page);
                    }
                    catch(error) {

                    }
        
    }
    search();
    }

    if(location.state.data==="attraction"){
        const search = async () =>{

            const formData = new FormData();
            
            formData.append('word',searchQuery);

            if(sliderMaxvalue>0) {
                formData.append('price',sliderMaxvalue);
            }
            const response = await axios.post(`http://127.0.0.1:8000/api/attraction/search?page=${page}`, formData);
                setdata(response.data.data.data)
                setTotalPages(response.data.data.last_page);
    }
    search();
    }

    if(location.state.data==="trip"){
        const search = async () =>{
            const response = await axios.post(`http://127.0.0.1:8000/api/trip/search?page=${page}`, {
                        to:searchQuery,
                        min_price:sliderMinvalue,
                        max_price:sliderMaxvalue
                        });
                console.log(response);
                console.log(response.data.data.data);
                setdata(response.data.data.data)
                setTotalPages(response.data.data.last_page);
        
    }
    search();
    }
    // if(location.state.data==="flight"){
    //     console.log(location.state.fromcountry);
    //     console.log(location.state.tocountry);
    //     console.log(location.state.checkOut);
    //     const search = async () =>{

    //         if(check_out !== 'NaN-aN-aN'){
    //         const response = await axios.post('http://127.0.0.1:8000/api/searchFlights', {
    //             from:fromcountry,
    //             distination:tocountry,
    //             departe_day:'2023-8-20',
    //             return_day:'2023-8-30',
    //             // adults:2,
    //             // children:2
    //             });
    //             console.log("ahmadmohsain");
    //             console.log(response);
    //             // console.log(response.data.final_flights);
    //             // setdata(response.data.final_flights);
    //             // setTotalPages(response.data.data.last_page);
    //         }
    //         else {
    //             const response = await axios.post('http://127.0.0.1:8000/api/searchFlights', {
    //                 from: fromcountry,
    //                 destiantion: tocountry,
    //                 departe_day:check_in,
    //                 });
    //                 console.log("leema");
    //                 console.log(check_out);
    //         console.log(response);
    //         console.log(response.data.final_flights);
    //         setdata(response.data.final_flights);
    //         }
        
    // }
    // search();
    if(location.state.data==="flight"){
        console.log(location.state.fromcountry);
        console.log(location.state.tocountry);
        console.log(location.state.checkOut);
        const search = async () =>{

            if(check_out !== 'NaN-aN-aN'){
            const response = await axios.post('http://127.0.0.1:8000/api/searchFlights', {
                from:fromcountry,
                destiantion:tocountry,
                departe_day:check_in,
                return_day:check_out
                // adults:2,
                // children:2
                });
                console.log("ahmadmohsain");
                console.log(response);
                console.log(response.data.final_flights);
                setdata(response.data.final_flights);
            }
            else {
                const response = await axios.post(`http://127.0.0.1:8000/api/searchFlights?page=${page}`, {
                    from:location.state.fromcountry,
                    distination:location.state.tocountry,
                    departe_day:check_in,
                    });
                    console.log("leema");
                    console.log(check_out);
            console.log(response);
            console.log(response.data.final_flights);
            setdata(response.data.final_flights);
            }
        
    }
    search();
    }
    
},[searchQuery,check_in,check_out,page,hotelcheckedfacilities,sliderMaxvalue,sliderMinvalue,hotelRate,hotelStars,hotelType,roomNum])



    if(location.state.data==="home"){
        return(
            <div>
                <div className="container">
                <div className="searchbar">
                    <form >
                        <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="homeserachbar" placeholder="Where to ?"
                        />
                    </form>
                    <div className="search-icon"><BsSearch size="1em"/></div>
                </div>
                {data.attractions && 
                <div>
                    <p>attraction</p>
                    <ViewsearchResultcard type="attraction"data={data.attractions.data}/>
                </div>}
                {data.hotels && 
                <div>
                    <p>hotels</p>
                    <ViewsearchResultcard type="hotel"data={data.hotels.data}/>
                </div>}
                {data.trips && 
                <div>
                    <p>trips</p>
                    <ViewsearchResultcard type="trip"data={data.trips.data}/>
                </div>}
                </div>
            </div>
        )
    }
    if(location.state.data==="attraction"){
        console.log(sliderMaxvalue);
        return(
            <div>
                <div className="container">
                <div className='attractionsearchbar attractionserachresult'>
                    <div className="searchbar">
                        <form >
                            <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            className="attractionsearchbar" placeholder="Search a destination , attraction or activity."
                            />
                        
                        </form>
                        <div className="search-icon"><BsSearch size="1.5em"/></div>
                    </div>
                    <div className="slider">
                        <span>Max price : {sliderMaxvalue}</span>
                        <BoxSlider slidervalue={(e)=>setsliderMaxvalue(e)} value={sliderMaxvalue}/>
                    </div>
                    <div className='findbutton'>
                        <button>Find</button>
                    </div>
                </div>
                </div>
                {data&&<div style={{marginTop:"20px",background:"#efefef"}}>
                <Stack spacing={2}>
                <div className="container" >
                    <div className="cardcontainer">
                <ViewsearchResultcard type="attraction"data={data}/>
                </div>
                </div>
                <Pagination count={totalPages} page={page} onChange={handleChange} 
                color="primary" sx={{ margin: 'auto !important' }} />
                </Stack>
                </div>}
            </div>
        )
    }
    if(location.state.data==="trip"){
        return(
            <div className="first">
                <div className="container">
                <div className='tripsearchbar'>
                <div className="searchbar">
                    <form >
                        <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="tripsearchbar" placeholder="Trip To ? or Location."
                        />
                    </form>
                    </div>
                    <div className="slider">
                        <span>Min price : {sliderMinvalue}</span>
                        <BoxSlider slidervalue={(e)=>setsliderMinvalue(e)} value={sliderMinvalue}/>
                    </div>
                    <div className="slider">
                        <span>Max price : {sliderMaxvalue}</span>
                        <BoxSlider slidervalue={(e)=>setsliderMaxvalue(e)} value={sliderMaxvalue}/>
                    </div>
                    <div className='findbutton'>
                    <button >Find</button>
                    </div>
                    </div>
                    </div>
                    <div style={{background:"#f9f9ea"}}>
                <Stack spacing={2}>
                <div className="container">
                <div className="cardcontainer">
                <ViewsearchResultcard type="trip"data={data}/>
                </div>
                <Pagination count={totalPages} page={page} onChange={handleChange} 
                color="primary" sx={{ margin: 'auto !important' }} />
                </div>
                </Stack>
                </div>
            </div>
        )
    }
    
    if(location.state.data==="flight"){
        console.log(convertdate(check_in));
        return(
            <div className="popup-overlay">
                <div className="container">
                <div className="flightsearchbarresult flightsearchbar">
                    <div className='typeoftravelbutton'>
                        <button onClick={()=>setar(!ar)} className={ar===true ? "clicked":"not-clicked"}>One - Way</button>
                        <button onClick={()=>setar(!ar)}  className={ar===true ? "not-clicked":"clicked"}>Round - Trip</button>
                    </div>
                    <div className={ar===false ? "round-trip":"one-way"}>
                        <div className="selectcountry"><MultipleSelectChip name="from" value={fromcountry} country={(e)=>setfromCountry(e)}/></div>
                        <div className="selectcountry"><MultipleSelectChip name="to" value={tocountry} country={(e)=>setToCountry(e)}/></div>
                        <div className="selectdate"><BasicDatePicker value={check_in} date={(e)=>setCheckin(e)}/></div>
                        <div className={ar===false ? "selectdate":"hidden"}><BasicDatePicker value={check_out} date={(e)=>setCheckout(e)}/></div>
                        <div className="selectperson">
                            <SelectNumberofPerson type="flight" adult_number={(e)=>setAdultnum} adultnum={adultnum}
                            child_number={(e)=>setChildnum(e)} childnum={childnum}/>
                            </div>
                        <button className="searchbut" style={{color:"white"}}><BsSearch/></button>
                    </div>
            </div>
                </div>
                <ViewsearchResultcard type="flight"data={data} ty="1"/>
            </div>
        )
    }
    if(location.state.data==="hotel"){
        console.log(convertdate(check_in));
        console.log(hotelStars);
        console.log(hotelType);
        console.log(checked);
        console.log(hotelRate+"e");
        console.log("roomnum"+location.state.roomnum);
        console.log("facilities"+hotelcheckedfacilities)
        return(
            <div>
                <div className="container">
                <div className="hotelsearchresult hotelsearchbar">
                <div className="searchbar">
                    <form >
                        <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className="hotelsearchresult" placeholder="hotel name or destination"
                        />
                    </form>
                    <div className="search-icon"><BsSearch size="1.5em"/></div>
                </div>
                <div className="date">
                    <BasicDatePicker name="Check in" value={check_in} date={(e)=>setCheckin(e)}/>
                    <BasicDatePicker name="Check out" value={check_out} date={(e)=>setCheckout(e)}/>

                </div>
                <div className="select_room_person">
                    <SelectNumberofPerson type="hotel" adult_number={(e)=>setAdultnum} adultnum={adultnum}
                    room_number={(e)=>setRoomNum(e)} roomnum={roomNum} child_number={(e)=>setChildnum(e)} childnum={childnum}/>
                    </div>
                <button className="searchbutton" >Find Hotels</button> 
            </div>
            </div>
            <div className="second">
                        <div className="container">
                        <div className="inside">
                        <div style={{backgroundColor:"white",marginTop:"10px",padding:"25px"}}>
                            <h5>filter by :</h5>
                            <ColorRadioButtons name="hotelstar" value={(e)=>setHotelstars(e)}/><hr/>
                            <IndeterminateCheckbox value={(e)=>setHotelcheckedfacilities(e)}/><hr/>
                            <ColorRadioButtons name="hoteltype" value={(e)=>setHoteltype(e)}/><hr/>
                            <ColorRadioButtons name="hotelrate" value={(e)=>setHotelrate(e)}/><hr/>
                            </div>
                            <Stack spacing={2}>
                <ViewsearchResultcard type="hotel" data={data}/>
                <Pagination count={totalPages} page={page} onChange={handleChange} 
                color="primary" sx={{ margin: 'auto !important' }} />
                </Stack>
                </div>
            </div>
            </div>
            </div>
        )
    }

}
export default SearchResult;