import { Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  let [data, setdata] = useState([]);
  let [oldCompany, setOldCompany] = useState([]);
  const repo = location.state.repo;
  let url, url2;
  if (repo.type === "attraction_company") {
    url = "http://127.0.0.1:8000/api/admin/getUpdatingDetails?id=";
    url2 = "http://127.0.0.1:8000/api/admin/acceptUpdate";
  } else if (repo.type === "trip_company") {
    url = "http://127.0.0.1:8000/api/admin/getTripUpdatingDetails?id=";
    url2 = "http://127.0.0.1:8000/api/admin/acceptTripCompanyUpdate";
  } else if (repo.type === "hotel_company") {
    url = "http://127.0.0.1:8000/api/admin/getHotelUpdatingDetails?id=";
    url2 = "http://127.0.0.1:8000/api/admin/acceptUpdate";
  }

  async function getUsers() {
    await axios
      .get(url + repo.id)
      .then((response) => response.data)
      .then((data) => {
        setdata(data.data);
      });
  }
  useEffect(() => {
    getUsers();
  }, [repo]);
  console.log(repo.id);
  const handleSubmit = async (accept, rejecte) => {
    try {
      const response = await axios.post(
        url2,
        {
          accepted: accept,
          rejected: rejecte,
          id: data.id,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        navigate("/dash/");
      } else {
        throw await response;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getold = async () => {
    if (data.add_or_update) {
      let url;
      let id;
      if (repo.type === "attraction_company") {
        url = "http://127.0.0.1:8000/api/admin/getAttractionDetails?id=";
        id = data.attraction_id;
      } else if (repo.type === "trip_company") {
        url = "http://127.0.0.1:8000/api/admin/getTripCompanyDetails?id=";
        id = data.trip_company_id;
      } else if (repo.type === "hotel_company") {
        url = "http://127.0.0.1:8000/api/admin/getHotelUpdatingDetails?id=";
      }

      await axios
        .get(url + id)
        .then((response) => response.data)
        .then((data) => data.data)
        .then((data) => {
          setOldCompany(data);
          console.log(data);
        });
    }
  };
  console.log(data);
  useEffect(() => {
    getold();
  }, []);

  return (
    data.admin && (
      <Box>
        <div className="dashboardshow">
          <h5 style={{ margin: "5px auto", padding: "20px" }}>
            {`the admin "${
              data.admin.full_name
                ? data.admin.full_name
                : data.admin.first_name
            }" requests
                ${
                  data.add_or_update ? "update" : "add"
                } his company's information`}
          </h5>
          <ul className="table trip">
            <li>
              <h6>Admin Email </h6> <h6>{data.admin.user_name}</h6>
            </li>
            <li>
              <h6>Admin phone_number </h6> <h6>{data.admin.phone_number}</h6>
            </li>
            <li>
              <h6>
                Company name
                <br />
                {oldCompany && data.add_or_update ? `The old` : ""}
              </h6>
              <h6>
                {data.name}
                <br />
                {oldCompany && data.add_or_update ? ` ${oldCompany.name}` : ""}
              </h6>
            </li>
            <li>
              <h6>
                Email <br />
                {oldCompany && data.add_or_update ? `The old` : ""}
              </h6>{" "}
              <h6>
                {data.email}
                <br />
                {oldCompany && data.add_or_update ? ` ${oldCompany.email}` : ""}
              </h6>
            </li>
            <li>
              <h6>
                Phone Number <br />
                {oldCompany && data.add_or_update ? `The old` : ""}
              </h6>{" "}
              <h6>
                {data.phone_number}
                <br />
                {oldCompany && data.add_or_update
                  ? ` ${oldCompany.phone_number}`
                  : ""}
              </h6>
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
          <Box className="deletebutoomShow" onClick={() => handleSubmit(0, 1)}>
            rejecte
          </Box>
          <Box
            className="deletebutoomShow edit"
            backgroundColor="#9E9E9E"
            onClick={() => handleSubmit(1, 0)}
          >
            accepte
          </Box>
        </Box>
      </Box>
    )
  );
}

export default Nav;
