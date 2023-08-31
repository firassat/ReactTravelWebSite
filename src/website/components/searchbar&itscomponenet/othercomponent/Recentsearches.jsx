import {React,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Recentsearches.css";
import {BsSearch} from 'react-icons/bs';
const Recentsearch =() => {

  const [recentSearches, setRecentSearches] = useState([]);

  const navigate = useNavigate();

  useEffect(() => { 
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);
  }, []);

const handleSearch = (val) => {

  navigate("/searchresult" , { state: {data: "home", word:val}});}

return (
    <div className="container" style={{marginTop: "-130px",
      marginBottom:"80px"}}>
  <div>
    <h3>Your recent Searches</h3>
    <div className="res ">
    {recentSearches.map((search, index) => (
      <div className="res1" key={index}>
        <button  key={index}  onClick={(e)=>handleSearch(search)}>
          <div className="centring-flex">
            <BsSearch size='25px'/>
            <div className="serachword">{search}</div>
          </div>
        </button>
        </div>))}
    </div>
  </div> 
    </div>
);
}
export default Recentsearch;



