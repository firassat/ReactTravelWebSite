import {React,useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import "./login.css";
import Logo from "../../../assets/logo.png";
import axios from "axios";
import CustomizedList from "../../components/dropdown/dropdown";
import Popitwindow from "../../components/popitwindow/Popitwindow";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/user/login', { email, password });
          if(response.data.success){
            const token = response.data.data.token;
            const first_name = response.data.data.first_name;
            const last_name = response.data.data.last_name;
            const profilephoto = response.data.data.photo;
            localStorage.setItem('token', token);
            localStorage.setItem('profilephoto', JSON.stringify(profilephoto));
            localStorage.setItem('first_name', JSON.stringify(first_name));
            localStorage.setItem('last_name', JSON.stringify(last_name));
            console.log(response.data);
            navigate("/");
          }
          console.log(response.data);
          console.log(response.data.message);
          console.log(JSON.parse(localStorage.getItem('profilephoto')));
          setError(response.data.message);
          console.log(error);
          console.log(localStorage.getItem('token'));

        }
        catch (error) {
          setError(error.message);
        }
      };
    
  return (
    <div className="mainWrap">
      <div className="container">
        <div className="formContainer">
          <div className="formWrapper">
            <span className="logo">
              <img src={Logo} alt="" />
            </span>
            <span className="title">Welcome Back</span>
            <form onSubmit={handleSubmit}>
              <label form="email">Email address</label>
              <input type="email" style={error==="email is not valid"? {border:"2px solid red"}:{}}
              placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <label form="password">Password</label>
              <input type="password" style={error==="incorrect password"? {border:"2px solid red"}:{}}
              placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              {error && <p className="errormessage" style={{color:"red"}}>{error}</p>}
              <Link to={'/forgetpassword'}>Forgot password?</Link>
              <button onClick={()=>handleSubmit}>Sign in</button>
            </form>
            <p className="wrapparagraph">
              Not a member?
            </p>
            <p>
              <Link to={"/register"}>Join</Link> to unlock the best of Travel
            </p>
            
          </div>
        </div>
      </div>
      <CustomizedList/>
      <div style={{position:"relative"}}><Popitwindow/></div>
      
      
    </div>
  );
};

export default Login;