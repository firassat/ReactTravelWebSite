import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddRoom from "../../components/AddRoom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import UploadPhoto from "../../components/UploadPhoto";

function ShowRoom() {
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
  let [HotelRooms, setHotelRooms] = useState([]);

  let [addScreen, setAddScreen] = useState([0, 0, 0]);
  let [reload, setReload] = useState([]);

  const navigate = useNavigate();
  let mainAdmin = localStorage.getItem("_auth_type") === "main_admin" ? 1 : 0;
  let token = localStorage.getItem("_auth");

  async function getUsers() {
    await axios
      .post(
        "http://127.0.0.1:8000/api/hotel/SeeOneRoom",
        { hotel_id: location.state.hotel_id, room_id: location.state.room_id },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => {
        setdata(data);
      });
  }
  useEffect(() => {
    getUsers();
  }, [reload]);

  console.log(data);
  const deleteRoom = (id) => {
    const response = axios.post(
      "http://127.0.0.1:8000/api/hotel/deleteRoom",
      { room_id: id },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setReload((priv) => priv + 1);
  };

  async function gitFacil() {
    await axios
      .get("http://127.0.0.1:8000/api/hotel/getRoomFeatures", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((res) => setfacilities(res.data));
  }
  useEffect(() => {
    gitFacil();
  }, []);

  const AddInput = async (e) => {
    console.log(e.target.value);
    const response = await axios
      .post(
        "http://127.0.0.1:8000/api/hotel/addingFeatures",
        { roomId: data.Room_info[0].id, featureId: e.target.value },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.log(err);
        seterr(error.response?.data);
      });
    if (response?.status === 200) {
      setReload((priv) => priv + 1);
      setAddScreen([0, 0, 0]);
    }
  };
  function deleteF(url, id, fid) {
    axios.post(
      url,
      { id: id, roomId: id, featureId: fid },
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

  return (
    data.Room_info && (
      <Box
        style={{
          color: colors.grey[100],
        }}
      >
        <div className="dashboardshow">
          <ul className="table1 dashtrip">
            <li>
              <h6>Beds </h6> <h6>{data.Room_info[0].Beds}</h6>
            </li>
            <li>
              <h6>Price_for_night </h6>{" "}
              <h6>{data.Room_info[0].Price_for_night}</h6>
            </li>
            <li>
              <h6>Sleeps </h6> <h6>{data.Room_info[0].Sleeps}</h6>
            </li>
            <li>
              <h6>num_of_ratings </h6>{" "}
              <h6>{data.Room_info[0].num_of_ratings}</h6>
            </li>
            <li>
              <h6>rate </h6> <h6>{data.Room_info[0].rate}</h6>
            </li>

            <li>
              <h6>type </h6> <h6>{data.Room_info[0].type.name}</h6>
            </li>
            <li>
              <h6>details </h6> <h6>{data.Room_info[0].details}</h6>
            </li>
            <li style={{ overflow: "hidden", minHeight: "100px" }}>
              <h6>features: </h6>
              {data.Room_info[0].features && (
                <Box
                  backgroundColor={colors.primary[400]}
                  p="15px 25px"
                  alignItems={"center"}
                  textAlign={"center"}
                  width="80%"
                  position={"relative"}
                  display={"flex"}
                  gap="25px"
                >
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "calc(50% - 1.5rem)",
                      left: "-20%",
                    }}
                    onClick={() => setAddScreen([0, 0, !addScreen[1]])}
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
                        onClick={() => setAddScreen([0, 0, 0])}
                      >
                        <CloseIcon />
                      </IconButton>
                      <Box backgroundColor={"inherit"}>
                        <label htmlFor="fa">Choose a Facility:</label>
                        <select
                          id="fa"
                          name="selectedFacility"
                          onChange={AddInput}
                        >
                          {facilities[0] &&
                            facilities.map((e, i) => {
                              return (
                                <option key={i} value={e.id}>
                                  {e.name}
                                </option>
                              );
                            })}
                        </select>
                        {err ? (
                          <p
                            style={{
                              color: "red",
                              fontSize: "12px",
                              margin: "10px",
                            }}
                          >
                            {err.message}
                          </p>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  ) : null}

                  {data.Room_info[0].features.map((e, i) => (
                    <Box
                      p="15px !important"
                      key={`${e.id}-${i}`}
                      position={"relative"}
                      textAlign={"center"}
                      justifyContent={"center"}
                    >
                      <Typography>{e.name}</Typography>

                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: "calc(50% - 1rem)",
                          right: "-20px",
                          color: "brown",
                        }}
                        onClick={() => {
                          deleteF(
                            "http://127.0.0.1:8000/api/hotel/deleteFeature",
                            data.Room_info[0].id,
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
              <h6>photos: </h6>

              {data.Room_info[0].photo && (
                <Box
                  backgroundColor={colors.primary[400]}
                  p="10px 15px"
                  alignItems={"center"}
                  textAlign={"center"}
                  width="80%"
                  display="flex"
                  flexWrap="wrap"
                  gap={"30px"}
                  position={"relative"}
                >
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
                        onClick={() => setAddScreen([!addScreen[0], 0, 0])}
                      >
                        <CloseIcon />
                      </IconButton>
                      <UploadPhoto
                        url={"http://127.0.0.1:8000/api/hotel/addRoomPhoto"}
                        room_id={data.Room_info[0].id}
                        id={data.Room_info[0].hotel.id}
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
                    {data.Room_info[0].photo.map((item) => (
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
                              "http://127.0.0.1:8000/api/hotel/DeleteRoomPhoto",
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
              deleteRoom(data.Room_info[0].id);
              navigate("/dashHotel");
            }}
          >
            Delete
          </Box>
        </Box>
      </Box>
    )
  );
}

export default ShowRoom;
