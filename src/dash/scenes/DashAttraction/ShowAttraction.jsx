import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import UploadPhoto from "../../components/UploadPhoto";

function ShowAttraction() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  let [data, setdata] = useState([]);
  let [facilities, setfacilities] = useState([]);
  let [err, seterr] = useState({});
  if (err.message) {
    setTimeout(() => {
      seterr({});
    }, 5000);
  }

  let [addScreen, setAddScreen] = useState([0, 0, 0]);
  let [reload, setReload] = useState([]);

  const navigate = useNavigate();
  let mainAdmin = localStorage.getItem("_auth_type") === "main_admin" ? 1 : 0;
  let token = localStorage.getItem("_auth");

  async function getUsers() {
    if (mainAdmin) {
      const id = location.state.id;
      await axios
        .get("http://127.0.0.1:8000/api/admin/getAttractionDetails?id=" + id)
        .then((response) => response.data)
        .then((data) => {
          setdata(data.data);
        });
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
  }, [reload]);

  async function gitFacil() {
    await axios
      .get("http://127.0.0.1:8000/api/admin/getAllFacilities")
      .then((res) => res.data)
      .then((res) => setfacilities(res.data));
  }
  useEffect(() => {
    gitFacil();
  }, []);

  function deleteF(url, id) {
    axios.post(
      url,
      { id: id },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    //.then((res) => console.log(res));
    setReload((priv) => priv + 1);
  }
  console.log(data);
  if (!data) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
        }}
      >
        <h3>"You should register your hotel before doing this operation!"</h3>
        <Box
          className="deletebutoomShow edit"
          backgroundColor="#9E9E9E"
          margin="20px auto"
          onClick={async () => {
            navigate("/dashAttraction/addAttraction");
          }}
        >
          Add
        </Box>
      </Box>
    );
  }
  return (
    data.available_days && (
      <Box>
        <div className="dashboardshow">
          <ul
            className="table trip"
            style={{
              borderRadius: "30px",
            }}
          >
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
              <h6>open at</h6> <h6>{data.open_at}</h6>
            </li>
            <li>
              <h6>close_at</h6> <h6>{data.close_at}</h6>
            </li>
            <li>
              <h6>website url</h6> <h6>{data.website_url}</h6>
            </li>
            <li style={{ overflow: "hidden" }}>
              <h6>available_days: </h6>
              {data.available_days && (
                <Box className="showIn" backgroundColor={colors.primary[400]}>
                  {data.available_days.Friday && <p>Friday</p>}
                  {data.available_days.Monday && <p>Monday</p>}
                  {data.available_days.Saturday && <p>Saturday</p>}
                  {data.available_days.Sunday && <p>Sunday</p>}
                  {data.available_days.Thursday && <p>Thursday</p>}
                  {data.available_days.Tuesday && <p>Tuesday</p>}
                  {data.available_days.Wednesday && <p>Wednesday</p>}
                </Box>
              )}
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
                        backgroundColor: `${colors.primary[500]} !important `,
                      }}
                    >
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "25px",
                          right: "25px",
                        }}
                        onClick={() => setAddScreen([!addScreen[0], 0, 0])}
                      >
                        <CloseIcon />
                      </IconButton>
                      <UploadPhoto
                        url={
                          "http://127.0.0.1:8000/api/attraction/uploadOnePhoto"
                        }
                        id={data.id}
                        setReload={setReload}
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
                            deleteF(
                              "http://127.0.0.1:8000/api/attraction/deleteOnePhoto",
                              item.id
                            );
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
            {/* <li style={{ overflow: "hidden" }}>
              <h6>Rooms: </h6>

              {HotelRooms.Room && (
                <Box
                  backgroundColor={colors.primary[400]}
                  p="15px 25px"
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
                    onClick={() => setAddScreen([0, !addScreen[1], 0])}
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
                        onClick={() => setAddScreen([0, !addScreen[1], 0])}
                      >
                        <CloseIcon />
                      </IconButton>
                      <AddRoom
                        url={"http://127.0.0.1:8000/api/hotel/addRoom"}
                        id={data.Hotel_info[0].id}
                        setReload={setReload}
                        setAddScreen={setAddScreen}
                        inputNumber={2}
                      />
                    </Box>
                  ) : null}
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(4, 20%)"
                    borderBottom={`1px solid ${colors.primary[800]}`}
                    p="15px "
                    gap="20px"
                    textAlign={"center"}
                    justifyContent={"center"}
                  >
                    <Typography>room_type</Typography>
                    <Typography>location</Typography>
                    <Typography>Beds</Typography>
                    <Typography>Sleeps</Typography>
                  </Box>
                  {HotelRooms.Room.map((e, i) => (
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(4, 20%)"
                      borderBottom={`1px solid ${colors.primary[800]}`}
                      p="15px "
                      gap="20px"
                      key={`${e.id}-${i}`}
                      position={"relative"}
                      textAlign={"center"}
                      justifyContent={"center"}
                    >
                      <Typography>{e.type.name}</Typography>
                      <Typography>{e.location}</Typography>
                      <Typography>{e.Beds}</Typography>
                      <Typography>{e.Sleeps}</Typography>
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: "calc(50% - 1rem)",
                          right: "-10px",
                          color: "brown",
                        }}
                        onClick={() => {
                          deleteRoom(e.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </li> */}
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
          {mainAdmin ? (
            <Box
              className="deletebutoomShow"
              onClick={() => {
                axios.get(
                  "http://127.0.0.1:8000/api/admin/deleteAttraction?id=" +
                    data.id
                );
                navigate("/dash/company");
              }}
            >
              Delete
            </Box>
          ) : null}
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
