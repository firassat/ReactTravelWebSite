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
import EditHotel from "./EditHotel";

function ShowFlight() {
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

  let [addScreen, setAddScreen] = useState([0, 0, 0, 0]);
  let [reload, setReload] = useState([]);

  const navigate = useNavigate();
  let mainAdmin = localStorage.getItem("_auth_type") === "main_admin" ? 1 : 0;
  let token = localStorage.getItem("_auth");

  async function getUsers() {
    if (mainAdmin) {
      const id = location.state.id;
      await axios
        .post(
          "http://127.0.0.1:8000/api/admin/OneAirline",
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
    }
  }
  useEffect(() => {
    getUsers();
  }, [reload]);
  console.log(data);
  function deleteF(url, id) {
    axios.post(
      url,
      { selectedFacility: id, id: id },
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

  if (!data.data) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
        }}
        style={{
          color: colors.grey[100],
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
    data.data[0] && (
      <Box
        style={{
          color: colors.grey[100],
        }}
      >
        <div className="dashboardshow">
          <ul className="table1 dashtrip">
            <li style={{ justifyContent: "center" }}>
              <img
                src={`${data.data[0].path}?w=164&h=164&fit=crop&auto=format`}
                alt=""
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
            </li>
            <li>
              <h6>Name </h6> <h6>{data.data[0].name}</h6>
            </li>
            <li>
              <h6>Email </h6> <h6>{data.data[0].email}</h6>
            </li>
            <li>
              <h6>Phone Number </h6> <h6>{data.data[0].phone_number}</h6>
            </li>
            <li>
              <h6>Admin</h6> <h6>{data.data[0].admin.user_name}</h6>
            </li>
            <li>
              <h6>Country </h6> <h6>{data.data[0].country.name}</h6>
            </li>

            <li>
              <h6>location </h6> <h6>{data.data[0].location}</h6>
            </li>

            <li>
              <h6>details </h6> <h6>{data.data[0].details}</h6>
            </li>

            <li style={{ overflow: "hidden" }}>
              <h6>flights: </h6>

              {data.data[0].flights && (
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
                        onClick={() => setAddScreen([0, !addScreen[1], 0, 0])}
                      >
                        <CloseIcon />
                      </IconButton>
                      <AddRoom
                        url={"http://127.0.0.1:8000/api/hotel/addRoom"}
                        id={data.data[0].id}
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
                    p="15px !important"
                    gap="20px"
                    textAlign={"center"}
                    justifyContent={"center"}
                  >
                    <Typography>flight_name</Typography>
                    <Typography>available_seats</Typography>
                    <Typography>available_weight</Typography>
                    <Typography>flight_number</Typography>
                  </Box>
                  {data.data[0].flights.map((e, i) => (
                    <Box
                      position={"relative"}
                      key={`${e.id}-${i}`}
                      style={{ color: colors.grey[100] }}
                    >
                      <Link to={"/dashFlight"} state={{}}>
                        <Box
                          display="grid"
                          gridTemplateColumns="repeat(4, 20%)"
                          borderBottom={`1px solid ${colors.primary[800]}`}
                          p="15px !important"
                          gap="20px"
                          textAlign={"center"}
                          justifyContent={"center"}
                        >
                          <Typography style={{ color: colors.grey[100] }}>
                            {e.flight_name}
                          </Typography>
                          <Typography style={{ color: colors.grey[100] }}>
                            {e.available_seats}
                          </Typography>
                          <Typography style={{ color: colors.grey[100] }}>
                            {e.available_weight}
                          </Typography>

                          <Typography style={{ color: colors.grey[100] }}>
                            {e.flight_number}
                          </Typography>
                        </Box>
                      </Link>
                      <IconButton
                        sx={{
                          position: "absolute",
                          bottom: "calc(50% - 1rem)",
                          left: "-10px",
                          color: "brown",
                        }}
                        onClick={() => {}}
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
              axios.post("http://127.0.0.1:8000/api/admin/deleteHotel", {
                id: data.data[0].id,
              });
              navigate("/dash/company");
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
              <EditHotel
                setReload={setReload}
                setAddScreen={setAddScreen}
                data={data.data[0]}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    )
  );
}

export default ShowFlight;
