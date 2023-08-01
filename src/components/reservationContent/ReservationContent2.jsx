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
        <button>Next</button>
      </form>
    </div>
  );
};

export default ReservationContent2;
