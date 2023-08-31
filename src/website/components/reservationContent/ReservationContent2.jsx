import React from "react";

const ReservationContent2 = (props) => {
  const nextLaistener = (e) => {
    e.preventDefault();
    props.setnext(2);
  };
  return (
    <div>
      {" "}
      <span className="title">Paypal details</span>
      <form action="" onSubmit={nextLaistener}>
        <input type="text" placeholder="paypal number"/><br/>
        <button className="next">Skip</button>
      </form>
    </div>
  );
};

export default ReservationContent2;
