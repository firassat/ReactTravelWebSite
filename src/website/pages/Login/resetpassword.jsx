import {React,useState,useEffect} from "react";
import { Link , useSearchParams} from "react-router-dom";
import "./login.css";
import Logo from "../../../assets/logo.png";
import axios from "axios";

const Resetpassword =()=> {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmpassword] = useState('');
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/reset-password', {
          email:email,
          password:password,
          password_confirmation:password_confirmation,
          token: token,
        },
        // {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }
        );
    //   if(response.data.success){
    //     console.log(response.data);
    //   }
    console.log(response);
      
      
      setError(response.data.message);
      console.log(error);
      console.log(localStorage.getItem('token'));

    } catch (error) {
      setError(error.message);
    }
  };
const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  console.log(token);
  

return (
  <div className="mainWrap">
    <div className="container">
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">
            <img src={Logo} alt="logo"/>
          </span>
          <span className="title">reset password</span>
          <form onSubmit={handleSubmit}>
            <label form="email">Email address</label>
            <input type="email" style={error==="email is not valid"? {border:"2px solid red"}:{border:"none"}}
            placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label form="password">Password</label>
            <input type="password" style={error==="incorrect password"? {border:"2px solid red"}:{border:"none"}}
            placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label form="confirmpassword">Confirm Password</label>
            <input type="password" value={password_confirmation} onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder="Confirm Password" id="confirmpassword" />
            <button onClick={handleSubmit}>Verify</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}
export default Resetpassword;