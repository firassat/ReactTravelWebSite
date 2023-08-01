import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import Logo from "../../assets/logo.png";
const Login = () => {
  // const [err, setErr] = useState(false);
  // const navigate = useNavigate();

  // const handelSubmit = async (e) => {
  //   //لمنع تحديث الصفحة عند الارسال
  //   e.preventDefault();
  //   const email = e.target[0].value;
  //   const password = e.target[1].value;

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     navigate("/");
  //   } catch (errr) {
  //     setErr(true);
  //   }
  // };

  return (
    <div className="mainWrap">
      <div className="container">
        <div className="formContainer">
          <div className="formWrapper">
            <span className="logo">
              <img src={Logo} alt="" />
            </span>
            <span className="title">Welcome Back</span>
            <form
            //onSubmit={handelSubmit}
            >
              <label form="email">Email address</label>
              <input type="email" placeholder="Email" id="email" />
              <label form="password">Password</label>
              <input type="password" placeholder="Password" id="password" />
              <a href="#/">Forgot password?</a>
              <button>Sign in</button>
              {/* {err && <span>Error somwthing</span>} */}
            </form>
            <p>
              Not a member?
              {/* You don't have an account? <Link to={"/register"}>Register</Link> */}
            </p>
            <p>
              <Link to={"/register"}>Join</Link> to unlock the best of Travel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
