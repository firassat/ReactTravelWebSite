import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

function TripDetails() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const id = location.state.trip.id;
  let [data, setdata] = useState([]);
  const navigate = useNavigate();
  let mainAdmin = localStorage.getItem("_auth_type") === "main_admin" ? 1 : 0;
  async function getUsers() {
    if (mainAdmin) {
      await axios
        .get("http://127.0.0.1:8000/api/admin/getTripDetails?id=" + id)
        .then((response) => response.data)
        .then((data) => {
          setdata(data.data);
        });
    } else {
      await axios
        .get("http://127.0.0.1:8000/api/trip/getTripDetails?trip_id=" + id, {
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

  return (
    data.dates && (
      <Box>
        <div className="dashboardshow">
          <ul className="table trip">
            <li>
              <h6>description: </h6> <h6>{data.description}</h6>
            </li>
            <li>
              <h6>destination: </h6> <h6>{data.destination.name}</h6>
            </li>
            <li>
              <h6>start_age: </h6> <h6>{data.start_age}</h6>
            </li>
            <li>
              <h6>end_age: </h6> <h6>{data.end_age}</h6>
            </li>
            <li>
              <h6>max_persons:</h6> <h6>{data.max_persons}</h6>
            </li>
            <li>
              <h6>details: </h6> <h6>{data.details}</h6>
            </li>
            <li style={{ overflow: "hidden" }}>
              <h6>photos: </h6>

              {data.photos && (
                <Box
                  backgroundColor={colors.primary[400]}
                  p="10px 15px"
                  alignItems={"center"}
                  textAlign={"center"}
                  width="80%"
                  display="flex"
                  flexWrap="wrap"
                  gap={"30px"}
                >
                  <ImageList
                    className={"imageShowTrip"}
                    cols={3}
                    rowHeight={200}
                  >
                    {data.photos.map((item) => (
                      <ImageListItem key={item.id}>
                        <img
                          src={`${item.path}?w=164&h=164&fit=crop&auto=format`}
                          alt=""
                          loading="lazy"
                          style={{ objectFit: "cover" }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
              )}
            </li>
            <li style={{ overflow: "hidden" }}>
              <h6>dates: </h6>

              {data.dates && (
                <Box
                  backgroundColor={colors.primary[400]}
                  p="10px 15px"
                  alignItems={"center"}
                  textAlign={"center"}
                  width="80%"
                >
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 30%)"
                    borderBottom={`1px solid ${colors.primary[800]}`}
                    p="10px "
                    gap="20px"
                  >
                    <Typography>price</Typography>
                    <Typography>reserved_people</Typography>
                    <Typography>date</Typography>
                  </Box>
                  {data.dates.map((e, i) => (
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(3, 30%)"
                      borderBottom={`1px solid ${colors.primary[800]}`}
                      p="10px "
                      gap="20px"
                      key={`${e.id}-${i}`}
                    >
                      <Typography>{e.price}</Typography>
                      <Typography>{e.current_reserved_people}</Typography>
                      <Typography>{e.departure_date}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </li>
            <li style={{ overflow: "hidden" }}>
              <h6>offers: </h6>

              {data.offers && (
                <Box
                  backgroundColor={colors.primary[400]}
                  p="10px 15px"
                  alignItems={"center"}
                  textAlign={"center"}
                  width="80%"
                >
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 30%)"
                    borderBottom={`1px solid ${colors.primary[800]}`}
                    p="10px "
                    gap="20px"
                  >
                    <Typography>id</Typography>
                    <Typography>percentage_off</Typography>
                    <Typography>offer_end</Typography>
                  </Box>
                  {data.offers.map((e, i) => (
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(3, 30%)"
                      borderBottom={`1px solid ${colors.primary[800]}`}
                      p="10px "
                      gap="20px"
                      key={`${e.id}-${i}`}
                    >
                      <Typography>{e.id}</Typography>
                      <Typography>{e.percentage_off}</Typography>
                      <Typography>{e.offer_end}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </li>
            <li style={{ overflow: "hidden" }}>
              <h6>days: </h6>

              {data.days && (
                <Box
                  backgroundColor={colors.primary[400]}
                  p="10px 15px"
                  alignItems={"center"}
                  textAlign={"center"}
                  width="80%"
                >
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 30%)"
                    borderBottom={`1px solid ${colors.primary[800]}`}
                    p="10px "
                    gap="20px"
                  >
                    <Typography>day_number</Typography>
                    <Typography>title</Typography>
                    <Typography>details</Typography>
                  </Box>
                  {data.days.map((e, i) => (
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(3, 30%)"
                      borderBottom={`1px solid ${colors.primary[800]}`}
                      p="10px "
                      gap="20px"
                      key={`${e.id}-${i}`}
                    >
                      <Typography>{e.day_number}</Typography>
                      <Typography>{e.title}</Typography>
                      <Typography fontSize={"10px"}>{e.details}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </li>
            <li style={{ overflow: "hidden" }}>
              <h6>services: </h6>

              {data.services && (
                <Box
                  backgroundColor={colors.primary[400]}
                  p="10px 15px"
                  alignItems={"center"}
                  textAlign={"center"}
                  width="80%"
                  display="flex"
                  flexWrap="wrap"
                  gap={"30px"}
                >
                  {data.services.map((e, i) => (
                    <Box key={`${e.id}-${i}`}>
                      <Typography>{e.service}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </li>
            <li style={{ overflow: "hidden" }}>
              <h6>activities: </h6>

              {data.activities && (
                <Box
                  backgroundColor={colors.primary[400]}
                  p="10px 15px"
                  alignItems={"center"}
                  textAlign={"center"}
                  width="80%"
                  display="flex"
                  flexWrap="wrap"
                  gap={"30px"}
                >
                  {data.activities.map((e, i) => (
                    <Box key={`${e.id}-${i}`}>
                      <Typography>{e.activity}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
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
                "http://127.0.0.1:8000/api/admin/deleteTheCompany?id=" + data.id
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
                navigate("/dash/editTrip", {
                  state: data,
                });
              else
                navigate("/dashTrip/editTrip", {
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

export default TripDetails;
