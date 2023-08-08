import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../pages/Login/login.css";
import Logo from "../../../assets/logo.png";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import { useEffect } from "react";

const Login2 = () => {
  const [err, setErr] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    //لمنع تحديث الصفحة عند الارسال
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/login",

        {
          headers: {
            Accept: "application/json",
          },
          user_name: email,
          password: password,
        }
      );
      if (
        signIn({
          token: response.data.admin.token,
          expiresIn: 50000,
          tokenType: response.data.admin.admin_type,
          authState: response.data.admin.user_name,
        })
      ) {
        if (response.data.admin.admin_type === "main_admin") {
          setTimeout(() => {
            navigate("/dash");
          }, 1000);
        }
        if (response.data.admin.admin_type === "attraction_admin") {
          setTimeout(() => {
            navigate("/dashAttraction");
          }, 1000);
        }
        if (response.data.admin.admin_type === "trip_admin") {
          setTimeout(() => {
            navigate("/dashTrip");
          }, 1000);
        }
        if (response.data.admin.admin_type === "hotel_admin") {
          setTimeout(() => {
            navigate("/dashHotel");
          }, 1000);
        }
      } else {
        //Throw error
      }
    } catch (errr) {
      setErr(true);
      console.log(errr);
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
            <span className="title">Welcome In Login Dashboard</span>
            <form onSubmit={handelSubmit}>
              <label form="email">Email address</label>
              <input type="email" placeholder="Email" id="email" />
              <label form="password">Password</label>
              <input type="password" placeholder="Password" id="password" />
              <a href="#/">Forgot password?</a>
              <button>Sign in</button>
              {err && <span>Error somwthing</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
