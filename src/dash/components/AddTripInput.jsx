import axios from "axios";
import React from "react";
import { useState } from "react";

function AddInput(props) {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const inputData = {};
    for (let i = 1; i <= props.inputNumber; i++) {
      inputData[`${e.target[i - 1].name}`] = e.target[i - 1].value;
    }
    try {
      const response = await axios.post(
        props.url,
        { ...inputData, trip_id: props.id },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        props.setReload((priv) => priv + 1);
        props.setAddScreen([0, 0, 0]);
      } else {
        throw await response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="formInputAdd">
      {props.children}
      <input type="submit" value={"Add"} />
    </form>
  );
}

export default AddInput;
