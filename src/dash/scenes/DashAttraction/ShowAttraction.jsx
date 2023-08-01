import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box } from "@mui/material";

function ShowAttraction() {
  const location = useLocation();
  let [data, setdata] = useState([]);
  const navigate = useNavigate();

  async function getUsers() {
    if (location.state) {
      const id = location.state.id;
      await axios
        .get("http://127.0.0.1:8000/api/admin/getAttractionDetails?id=" + id)
        .then((response) => response.data)
        .then((data) => {
          setdata(data.data);
        });
      console.log(data);
    } else {
      await axios
        .get("http://127.0.0.1:8000/api/attraction/getAttractionDetails", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("_auth")}`,
          },
        })
        .then((response) => response.data)
        .then((data) => {
          setdata(data.data);
        });
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  if (!data) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <h3>No Information Your Company</h3>
        <Box
          className="deletebutoomShow edit"
          backgroundColor="#9E9E9E"
          onClick={async () => {
            navigate("/dashAttraction/addAttraction", {
              state: data,
            });
          }}
        >
          Add Attraction
        </Box>
      </Box>
    );
  }
  return (
    data.photos && (
      <Box>
        <div className="dashboardshow">
          <ImageList
            className={"imageShow"}
            sx={{
              width: "30%",
              margin: "0",
            }}
            cols={1}
            rowHeight={350}
          >
            {data.photos.map((item) => (
              <ImageListItem key={item.id}>
                <img
                  src={`${item.path}?w=164&h=164&fit=crop&auto=format`}
                  alt=""
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <ul className="table">
            <li>
              <h6>Name </h6> <h6>{data.name}</h6>
            </li>
            <li>
              <h6>City </h6> <h6>{data.city.name}</h6>
            </li>
            <li>
              <h6>Email </h6> <h6>{data.email}</h6>
            </li>
            <li>
              <h6>Location </h6> <h6>{data.location}</h6>
            </li>
            <li>
              <h6>Phone Number </h6> <h6>{data.phone_number}</h6>
            </li>
            <li>
              <h6>details: </h6> <h6>{data.details}</h6>
            </li>
            <li>
              <h6>adult ability per day </h6>{" "}
              <h6>{data.adult_ability_per_day}</h6>
            </li>
            <li>
              <h6>child ability per day</h6>{" "}
              <h6>{data.child_ability_per_day}</h6>
            </li>
            <li>
              <h6>adult price</h6> <h6>{data.adult_price}</h6>
            </li>
            <li>
              <h6>child price</h6> <h6>{data.child_price}</h6>
            </li>
            <li>
              {/* <h6>available days</h6> <h6>{data.available_days}</h6> */}
            </li>
            <li>
              <h6>open at</h6> <h6>{data.open_at}</h6>
            </li>
            <li>
              <h6>close_at</h6> <h6>{data.close_at}</h6>
            </li>
            <li>
              <h6>website url</h6> <h6>{data.website_url}</h6>
            </li>
          </ul>
        </div>
        <Box
          sx={{
            display: "flex",
            padding: "0px 50px 50px 50px ",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Box
            className="deletebutoomShow"
            onClick={() => {
              axios.get(
                "http://127.0.0.1:8000/api/admin/deleteAttraction?id=" + data.id
              );
              navigate("/dash/company");
            }}
          >
            Delete
          </Box>
          <Box
            className="deletebutoomShow edit"
            backgroundColor="#9E9E9E"
            onClick={async () => {
              if (location.state)
                navigate("/dash/editAttraction", {
                  state: data,
                });
              else
                navigate("/dashAttraction/editAttraction", {
                  state: data,
                });
            }}
          >
            Edit
          </Box>
        </Box>
      </Box>
    )
  );
}

export default ShowAttraction;
