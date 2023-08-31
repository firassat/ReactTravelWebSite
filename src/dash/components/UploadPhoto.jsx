import React from "react";
import axios from "axios";

const UploadPhoto = (props) => {
  const handleFileUpload = (event) => {
    // get the selected file from the input
    const file = event.target.files[0];
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append("photo", file);
    let aa = formData.get("photo");
    let token = localStorage.getItem("_auth");
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
    axios
      .post(
        props.url,
        {
          photo: aa,
          trip_id: props.id,
          hotel_id: props.id,
          room_id: props.room_id,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("_auth")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          props.setReload((priv) => priv + 1);
          props.setAddScreen([0, 0, 0]);
        }
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };
  return (
    <div>
      <input
        type="file"
        class="form-control-file"
        onChange={handleFileUpload}
        style={{ color: "black" }}
      />
    </div>
  );
};
export default UploadPhoto;
