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
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import UploadPhoto from "../../components/UploadPhoto";

function ShowHotel() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  let [data, setdata] = useState([]);
  let [HotelRooms, setHotelRooms] = useState([]);

  let [addScreen, setAddScreen] = useState([0, 0, 0]);

  const navigate = useNavigate();
  let [reload, setReload] = useState([]);
  let mainAdmin = localStorage.getItem("_auth_type") === "main_admin" ? 1 : 0;
  let token = localStorage.getItem("_auth");

  async function getUsers() {
    if (mainAdmin) {
      const id = location.state.id;
      await axios
        .post(
          "http://127.0.0.1:8000/api/admin/OneHotelByAdmin",
          { id: id },
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((response) => response.data)
        .then((data) => {
          setdata(data);
        });
    } else {
      await axios
        .post(
          "http://127.0.0.1:8000/api/admin/OneHotel",
          {},
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
  }
  useEffect(() => {
    getUsers();
  }, [reload]);
  console.log(data);
  async function getHotelRooms() {
    if (data.Hotel_info)
      await axios
        .post(
          "http://127.0.0.1:8000/api/admin/SeeAllRooms",
          { hotel_id: data.Hotel_info[0].id },
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
        .then((response) => response.data)
        .then((data) => {
          setHotelRooms(data);
        });
  }
  useEffect(() => {
    getHotelRooms();
  }, [reload, data]);
  console.log(HotelRooms);
  const deleteRoom = (id) => {
    const response = axios.get(
      "http://127.0.0.1:8000/api/admin/DeleteRoom?room_id=" + id,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setReload((priv) => priv + 1);
  };

  // if (!data) {
  //   return (
  //     <Box
  //       sx={{
  //         position: "absolute",
  //         top: "50%",
  //         left: "50%",
  //         transform: "translate(-50%,-50%)",
  //         textAlign: "center",
  //       }}
  //     >
  //       <h3>"You should register your company before doing this operation!"</h3>
  //       <Box
  //         className="deletebutoomShow edit"
  //         backgroundColor="#9E9E9E"
  //         margin="20px auto"
  //         onClick={async () => {
  //           navigate("/dashTrip/addTripCompany", {
  //             state: data,
  //           });
  //         }}
  //       >
  //         Add
  //       </Box>
  //     </Box>
  //   );
  // }

  if (!data.Hotel_info) {
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
            navigate("/dashHotel/addHotel", {
              state: data.data,
            });
          }}
        >
          Add
        </Box>
      </Box>
    );
  }
  return (
    data.Hotel_info && (
      <Box>
        <div className="dashboardshow">
          <ul className="table trip">
            <li>
              <h6>Name </h6> <h6>{data.Hotel_info[0].name}</h6>
            </li>
            <li>
              <h6>Email </h6> <h6>{data.Hotel_info[0].email}</h6>
            </li>
            <li>
              <h6>Phone Number </h6> <h6>{data.Hotel_info[0].phone_number}</h6>
            </li>
            <li>
              <h6>Website Url </h6> <h6>{data.Hotel_info[0].website_url}</h6>
            </li>
            <li>
              <h6>Country </h6> <h6>{data.Hotel_info[0].city.country.name}</h6>
            </li>
            <li>
              <h6>City </h6> <h6>{data.Hotel_info[0].city.name}</h6>
            </li>
            <li>
              <h6>location </h6> <h6>{data.Hotel_info[0].location}</h6>
            </li>
            <li>
              <h6>price_start_from </h6>{" "}
              <h6>{data.Hotel_info[0].price_start_from}</h6>
            </li>
            <li>
              <h6>stars </h6> <h6>{data.Hotel_info[0].stars}</h6>
            </li>
            <li>
              <h6>type </h6> <h6>{data.Hotel_info[0].type.name}</h6>
            </li>
            <li>
              <h6>details </h6> <h6>{data.Hotel_info[0].details}</h6>
            </li>
            <li style={{ overflow: "hidden" }}>
              <h6>facilities: </h6>
              {data.Hotel_info[0].facilities && (
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
                  {data.Hotel_info[0].facilities.map((e, i) => (
                    <Box key={`${e.id}-${i}`}>
                      <Typography>{e.name}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </li>
            <li style={{ overflow: "hidden" }}>
              <h6>photos: </h6>

              {data.Hotel_info[0].photo && (
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
                        url={"http://127.0.0.1:8000/api/admin/addPhoto"}
                        id={data.Hotel_info[0].id}
                        setReload={setReload}
                      />
                    </Box>
                  ) : null}
                  <ImageList
                    className={"imageShowTrip"}
                    cols={3}
                    rowHeight={200}
                  >
                    {data.Hotel_info[0].photo.map((item) => (
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
                            bottom: "0",
                            left: "calc(50% - 1rem)",
                            color: "brown",
                          }}
                          onClick={() => {
                            // deletePhoto(item.id);
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
                        url={"http://127.0.0.1:8000/api/admin/addRoom"}
                        id={data.Hotel_info[0].id}
                        setReload={setReload}
                        inputNumber={2}
                      />
                    </Box>
                  ) : null}
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(4, 22%)"
                    borderBottom={`1px solid ${colors.primary[800]}`}
                    p="20px "
                    gap="20px"
                  >
                    <Typography>room_type</Typography>
                    <Typography>location</Typography>
                    <Typography>Beds</Typography>
                    <Typography>Sleeps</Typography>
                  </Box>
                  {HotelRooms.Room.map((e, i) => (
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(4, 22%)"
                      borderBottom={`1px solid ${colors.primary[800]}`}
                      p="20px "
                      gap="20px"
                      key={`${e.id}-${i}`}
                      position={"relative"}
                    >
                      <Typography>{e.type.name}</Typography>
                      <Typography>{e.location}</Typography>
                      <Typography>{e.Beds}</Typography>
                      <Typography>{e.Sleeps}</Typography>
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: "calc(50% - 1rem)",
                          left: "-15px",
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
              if (mainAdmin)
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

export default ShowHotel;
