import {React , useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import Logo from "../../../assets/logo.png";
import profileimg from "../../../assets/profilephoto.png";
import axios from "axios";
import "react-phone-number-input/style.css";
import {AiOutlinePlusCircle} from 'react-icons/ai';
import PhoneInput from "react-phone-number-input";

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [password_confirmation, setConfirmpassword] = useState('');
  const [phone_number,setPhonenumber] = useState('');
  const [error, setError] = useState('');
  const [profilePhoto,setProfilePhoto] = useState(profileimg);
  const [uploadedFileimage, setUploadedFileimage] = useState();


  const photoUpload = (e) =>{
    e.preventDefault();
    try {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setUploadedFileimage(file);
      setProfilePhoto(reader.result);
    }
    reader.readAsDataURL(file);
  }
  catch {

  }
  }


  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password_confirmation);
    formData.append('phone_number', phone_number);
    formData.append('image', uploadedFileimage);
    
    try {
    const  response= await axios.post('http://127.0.0.1:8000/api/user/register',formData,{
        headers: { 'Accept': 'application/json'}
    })
    console.log(response.data);
    if(response.data.success){
      const token = response.data.data.token;
      const first_name = response.data.data.first_name;
      const last_name = response.data.data.last_name;
      const profilephoto = response.data.data.photo
      localStorage.setItem('token', token);
      localStorage.setItem('first_name', JSON.stringify(first_name));
      localStorage.setItem('last_name', JSON.stringify(last_name));
      localStorage.setItem('profilephoto',JSON.stringify(profilephoto));
      navigate("/");
    }

    setError(response.data.error[0]);

    }

    catch (error) {
          if(error.response && error.response.data.errors){
            console.log(error.response.data.message);
            setError(error.response.data.message);
          }
          setError(error);
        }
    }

  return (
    <div className="mainWrap">
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">
            <img src={Logo} alt="" />
          </span>
          <span className="title">Join to unlock the best of Travel</span>
          <form onSubmit={handleSubmit}>
            <div className="nameRegister">
              <div>
            <label htmlFor="photo-upload" className="custom-file-upload fas">
            <span><AiOutlinePlusCircle size="2em"/></span>
                <p className="img-wrap img-upload" >
                  <img htmlFor="photo-upload" src={profilePhoto} alt="img"/>
                </p>
                <input id="photo-upload" type="file" onChange={photoUpload}/> 
              </label>
              </div>
              <div className="left">
                <label form="Fname">First name</label>
                <input type="text" value={first_name} onChange={(e) => setFirstname(e.target.value)}placeholder="First name" id="Fname" required/>
              </div>
              <div className="right">
                <label form="Lname">Last name</label>
                <input type="text"value={last_name} onChange={(e) => setLastname(e.target.value)} placeholder="Last name" id="Lname" required />
              </div>
            </div>
            <label form="email">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="Email" id="email" required />
            <label form="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" id="password" minLength="8" required />
            <label form="confirmpassword">Confirm Password</label>
            <input type="password" value={password_confirmation} onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder="Confirm Password" id="confirmpassword" minLength="8" required />
            <label form="phonenumber">Phone Number</label>
            <PhoneInput
              className="phone"
              placeholder="0900000000"
              value={phone_number}
              onChange={(e) => setPhonenumber(e)}
              id="phonenumber" 
              required
            />
            <button>Join</button>
          </form>
          {error && <p style={{color:"red"}}>{error}</p>}
          <p className="wrapparagraph">
            Already a member?
          </p>
          <p>
            <Link to={"/login"}>Sign in</Link> using your Tripadvisor account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;