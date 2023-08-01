import React, { useState } from "react";
import "./ReservationContent.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const ReservationContent = (props) => {
  const nextLaistener = (e) => {
    e.preventDefault();
    props.setnext(1);
  };
  const [value, setValue] = useState();
  return (
    <div className="info">
      <h3 className="title">Content details</h3>
      <form action="" onSubmit={nextLaistener}>
        <div className="nameRegister">
          <div className="left">
            <label form="Fname">Email</label>
            <input type="email" placeholder="exampl@email.com" id="FnameR" />
          </div>
          <div className="right">
            <label form="Lname">Phone number</label>
            <PhoneInput
              className="phone"
              placeholder="0900000000"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <h3 className="title">Traveler details</h3>

        <div className="nameRegister">
          <div className="left">
            <label form="Fname">First name</label>
            <input type="text" placeholder="First name" id="FnameR" />
          </div>
          <div className="right">
            <label form="Lname">Last name</label>
            <input type="text" placeholder="Last name" id="LnameR" />
          </div>
        </div>
        <button>Next</button>
      </form>
    </div>
  );
};

export default ReservationContent;
