import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import UploadPhoto from "../../components/UploadPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddTripInput from "../../components/AddTripInput";
import EditTrip from "./EditTrip";

function TripDetails() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const id = location.state.trip.id;
  const navigate = useNavigate();
  let [data, setdata] = useState([]);
  let [reload, setReload] = useState([]);
  let [addScreen, setAddScreen] = useState([0, 0, 0, 0]);
  const token = localStorage.getItem("_auth");
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
  }, [reload]);

  const deletePhoto = (id) => {
    const response = axios.get(
      "http://127.0.0.1:8000/api/admin/deleteOneTripPhoto?photo_id=" + id,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    setReload((priv) => priv + 1);
  };
  const deleteInput = (url, id) => {
    const response = axios.get(url + id, {
      headers: {
        Accept: "application/json",
      },
    });
    setReload((priv) => priv + 1);
  };

  return (
    data.dates && (
      <Box
        style={{
          color: colors.grey[100],
        }}
      >
        <div className="dashboardshow">
          <ul className="table1 dashtrip">
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
                <Box backgroundColor={colors.primary[400]} className="showIn">
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "calc(50% - 1rem)",
                      left: "-20%",
                    }}
                    onClick={() => setAddScreen([!addScreen[0], 0, 0])}
                  >
                    <AddIcon />
                  </IconButton>
                  {addScreen[0] ? (
                    <Box
                      className="sentSuccss"
                      sx={{
                        backgroundColor: `${colors.primary[400]} !important `,
                      }}
                    >
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "25px",
                          right: "25px",
                        }}
                        onClick={() => setAddScreen([!addScreen[0], 0, 0, 0])}
                      >
                        <CloseIcon />
                      </IconButton>
                      <UploadPhoto
                        url={
                          "http://127.0.0.1:8000/api/admin/uploadOneTripPhoto"
                        }
                        id={data.id}
                        setReload={setReload}
                        type={"trip"}
                        setAddScreen={setAddScreen}
                      />
                    </Box>
                  ) : null}
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
                        <IconButton
                          sx={{
                            position: "absolute",
                            bottom: "10px",
                            left: "calc(50% - 1rem)",
                            color: "brown",
                          }}
                          onClick={() => {
                            deletePhoto(item.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
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
                  position={"relative"}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "calc(50% - 1rem)",
                      left: "-20%",
                    }}
                    onClick={() => setAddScreen([0, !addScreen[1], 0, 0])}
                  >
                    <AddIcon />
                  </IconButton>
                  {addScreen[1] ? (
                    <Box
                      className="sentSuccss"
                      sx={{
                        backgroundColor: `${colors.primary[400]} !important `,
                      }}
                    >
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "25px",
                          right: "25px",
                        }}
                        onClick={() => setAddScreen([0, 0, 0, 0])}
                      >
                        <CloseIcon />
                      </IconButton>
                      <AddTripInput
                        url={"http://127.0.0.1:8000/api/admin/addNewDate"}
                        url2={"http://127.0.0.1:8000/api/trip/addNewDate"}
                        id={data.id}
                        setReload={setReload}
                        inputNumber={2}
                        setAddScreen={setAddScreen}
                      >
                        <input type="number" name="price" placeholder="Price" />
                        <input
                          type="datetime-local"
                          name="departure_date"
                          placeholder="Departure_date"
                        />
                      </AddTripInput>
                    </Box>
                  ) : null}
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
                      p="15px !important"
                      gap="20px"
                      key={`${e.id}-${i}`}
                      position={"relative"}
                    >
                      <Typography>{e.price}</Typography>
                      <Typography>{e.current_reserved_people}</Typography>
                      <Typography>{e.departure_date}</Typography>
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: "calc(50% - 1rem)",
                          left: "-10px",
                          color: "brown",
                        }}
                        onClick={() => {
                          deleteInput(
                            "http://127.0.0.1:8000/api/admin/deleteSomeDate?date_id=",
                            e.id
                          );
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
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
                  position={"relative"}
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "calc(50% - 1rem)",
                      left: "-20%",
                    }}
                    onClick={() => setAddScreen([0, 0, !addScreen[2], 0])}
                  >
                    <AddIcon />
                  </IconButton>
                  {addScreen[2] ? (
                    <Box
                      className="sentSuccss"
                      sx={{
                        backgroundColor: `${colors.primary[400]} !important `,
                      }}
                    >
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "25px",
                          right: "25px",
                        }}
                        onClick={() => setAddScreen([0, 0, 0, 0])}
                      >
                        <CloseIcon />
                      </IconButton>
                      <AddTripInput
                        url={"http://127.0.0.1:8000/api/admin/addNewOffer"}
                        url2={"http://127.0.0.1:8000/api/trip/addNewOffer"}
                        id={data.id}
                        setReload={setReload}
                        inputNumber={2}
                        setAddScreen={setAddScreen}
                      >
                        <input
                          type="number"
                          name="percentage_off"
                          placeholder="percentage_off"
                        />
                        <input
                          type="datetime-local"
                          name="offer_end"
                          placeholder="offer_end"
                        />
                      </AddTripInput>
                    </Box>
                  ) : null}
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
                      p="15px !important"
                      gap="20px"
                      key={`${e.id}-${i}`}
                      position={"relative"}
                    >
                      <Typography>{e.id}</Typography>
                      <Typography>{e.percentage_off}</Typography>
                      <Typography>{e.offer_end}</Typography>
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: "calc(50% - 1rem)",
                          left: "-10px",
                          color: "brown",
                        }}
                        onClick={() => {
                          deleteInput(
                            "http://127.0.0.1:8000/api/admin/deleteSomeOffer?offer_id=",
                            e.id
                          );
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
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
                      p="15px !important"
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
                <Box backgroundColor={colors.primary[400]} className="showIn">
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
                <Box backgroundColor={colors.primary[400]} className="showIn">
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
              if (mainAdmin) {
                axios.get(
                  "http://127.0.0.1:8000/api/trip/deleteSomeTrip?trip_id=" +
                    data.id
                );
                navigate("/dash/company");
              } else {
                axios.get(
                  "http://127.0.0.1:8000/api/trip/deleteSomeTrip?trip_id=" +
                    data.id,
                  {
                    headers: {
                      Accept: "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                navigate("/dashTrip");
                setReload((p) => p + 1);
              }
            }}
          >
            Delete
          </Box>
          <Box
            className="deletebutoomShow edit"
            backgroundColor="#9E9E9E"
            onClick={() => {
              setAddScreen([0, 0, 0, 1]);
            }}
          >
            Edit
          </Box>
          {addScreen[3] ? (
            <Box
              className="sentSuccss"
              sx={{ backgroundColor: colors.primary[400] }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "25px",
                  right: "25px",
                }}
                onClick={() => setAddScreen([0, 0, 0, 0])}
              >
                <CloseIcon />
              </IconButton>
              <EditTrip
                id={data.id}
                setReload={setReload}
                setAddScreen={setAddScreen}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    )
  );
}

export default TripDetails;
