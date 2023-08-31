import { React , useState , useEffect }from "react";
import  "./reviews.css";
import { HalfRating } from "../Stars&favoriteIcons/star";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import img2 from "../../../assets/why-us-web-development.png";
import img from "../../../assets/home-tab2-hero-1367x520-prog.jpg";
import axios from "axios";

const Reviews = (props) => { 

  const color=[
    "red",
    "green",
    "blue",
    "blueviolet",
    "deeppink",
    "darkblue"
  
  ]


  const token = localStorage.getItem('token');

  const [data,setdata] = useState([]);

  const [comment,setComment] = useState('');
  const [rate,setrate] = useState(0);

  const [message,setmessage] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleChange = (event, value) => {
    setPage(value);
};

useEffect(()=> {
  setmessage('');

  if(props.name==="hotel"){
    const getdata = async () =>{
      const response =await axios.post(`http://127.0.0.1:8000/api/AllHotelInfo?page=${page}`,{
              id:props.id,
          });
          setdata(response.data.Reviews)
          setTotalPages(response.data.Reviews.last_page);
    }
    getdata()
  }
  if(props.name==="attraction"){
    const getdata = async () =>{
      const response =await axios.post(`http://127.0.0.1:8000/api/attraction/viewAttractionDetails?page=${page}`,{
              attraction_id:props.id,
          });
          setdata(response.data.reviews)
          setTotalPages(response.data.reviews.last_page);
    }
    getdata()
  }
  if(props.name==="trip"){
    const getdata = async () =>{
      const response =await axios.get(`http://127.0.0.1:8000/api/trip/viewTripDetails?id=${props.id}?page=${page}`)
          setdata(response.data.reviews)
          setTotalPages(response.data.reviews.last_page);
    }
    getdata()
  }

},[totalPages,props.id])


  const sendComment = (event) => {
    event.preventDefault();

    if(props.name==="hotel"){
      const sendcomment = async () =>{
        const response = await axios.post('http://127.0.0.1:8000/api/user/addReview', {
                    comment:comment,
                    rate:rate,
                    hotel_id:props.id,
                    },
                    {headers:{
                      'Authorization': `Bearer  ${token}`,
                      'accept':"application/json"
                    }});
            setmessage(response.data.message);
      }
    sendcomment();
    }

    if(props.name==="attraction"){
      const sendcomment = async () =>{
        const response = await axios.post('http://127.0.0.1:8000/api/attraction/sendReview', {
                    comment:comment,
                    stars:rate,
                    attraction_id:props.id,
                    },
                    {headers:{
                      'Authorization': `Bearer  ${token}`,
                      'accept':"application/json"
                    }});
            setmessage(response.data.message);
      }
  sendcomment();
  }
  if(props.name==="trip"){
    const search = async () =>{
      const response = await axios.post('http://127.0.0.1:8000/api/trip/sendReview', {
                  comment:comment,
                  stars:rate,
                  trip_id:props.id,
                  },
                  {headers:{
                    'Authorization': `Bearer  ${token}`,
                    'accept':"application/json"
                  }});
          setmessage(response.data.message);
    }
  search();
  }
}
  return(
    <div className="comments">
      {data && data.data && <div className="container">
        <h3>Comments:</h3>
        <div className="comment_addcomment">
          <div style={{width:"400px"}}>
          <Stack spacing={2}>
            {data.data.map((item,index)=> {
              return(
                <div key={index}>
                  <div style={{display:"flex",alignItems:"center"}} key={index}>
                    {item.user.photo &&<img src={img} alt="pic" className="comment_pic"/>}
                    {!item.user.photh &&<span style={{backgroundColor:color[index]}} className="user_comments_name">
                    {item.user.first_name.charAt(0).toUpperCase()+item.user.last_name.charAt(0).toUpperCase()}</span>}
                    <span style={{marginLeft:"10px",fontSize:"18px",fontWeight:"600"}}>{item.user.first_name + item.user.last_name}</span>
                  </div>
                  <div style={{marginTop:"7px"}}><HalfRating numberofstar={item.stars} type="read"/></div>
                  <p className="personcomment">{item.comment}</p>
                  <hr/>
                </div>
              )
              
            })}
            <Pagination count={totalPages} page={page} onChange={handleChange} 
              color="primary" sx={{ margin: 'auto !important' }} />
              </Stack>
            </div>
          <div className="addcomment">
          <img src={img2} alt="img"></img>
            <p>
              Share with our Your experiance !
            </p>
            <div><HalfRating type="controlled" value={(e)=>setrate(e)}/></div>
            <form>
            <input type="text" placeholder="Write a comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
            </form>
            <button className="sendreviewbutton"  onClick={(e)=>sendComment(e)}>Send a review</button>
            {message &&<p>{message}</p>}
          </div>
          </div>
          </div>
          }
          </div>




  )
}

export default Reviews;