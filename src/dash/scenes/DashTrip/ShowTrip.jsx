import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddTrip from "./AddTrip";
import {
  Box,
  IconButton,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";

function ShowTrip() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  let [data, setdata] = useState([]);
  let [trip, setTrip] = useState([]);
  let [addScreen, setAddScreen] = useState([0, 0, 0]);
  const [pageOffset, setPageOffset] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [id, setid] = useState(0);
  const navigate = useNavigate();
  let [reload, setReload] = useState([]);
  let mainAdmin = localStorage.getItem("_auth_type") === "main_admin" ? 1 : 0;
  let token = localStorage.getItem("_auth");
  async function getUsers() {
    if (mainAdmin) {
      const id = location.state.id;
      await axios
        .get("http://127.0.0.1:8000/api/admin/getTripCompanyDetails?id=" + id)
        .then((response) => response.data)
        .then((data) => data.data)
        .then((data) => {
          setdata(data);
          setid(data.id);
        });
    } else {
      await axios
        .get("http://127.0.0.1:8000/api/trip/getTripCompanyDetails", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data)
        .then((data) => data.data)
        .then((data) => {
          setdata(data);
          setid(data.id);
        });
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
  console.log(data);
  async function getTrip() {
    if (mainAdmin) {
      await axios
        .get(
          "http://127.0.0.1:8000/api/admin/getTripsForCompany?page=" +
            pageOffset +
            "&&id=" +
            id
        )
        .then((response) => response.data)
        .then((data) => data.data)
        .then((data) => {
          data && setTrip(data.data);
          data && setPageCount(data.last_page);
        });
    } else {
      await axios
        .get("http://127.0.0.1:8000/api/trip/getAllTrips?page=" + pageOffset, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data)
        .then((data) => data.data)
        .then((data) => {
          data && setTrip(data.data);
          data && setPageCount(data.last_page);
        });
    }
  }

  useEffect(() => {
    getTrip();
  }, [pageOffset, id, reload]);

  const handlePageChange = (event, page) => {
    setPageOffset(page);
  };

  const deleteInput = (url, id) => {
    const response = axios.get(url + id, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setReload((priv) => priv + 1);
  };
  function unsee() {
    if (data.num_of_unseen_reservations >= 0 && !mainAdmin) {
      navigate("/dashTrip", {
        state: data.num_of_unseen_reservations,
      });
    }
  }
  useEffect(() => {
    unsee();
  }, [data.num_of_unseen_reservations]);

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
        <h3>"You should register your company before doing this operation!"</h3>
        <Box
          className="deletebutoomShow edit"
          backgroundColor="#9E9E9E"
          margin="20px auto"
          onClick={async () => {
            navigate("/dashTrip/addTripCompany", {
              state: data,
            });
          }}
        >
          Add
        </Box>
      </Box>
    );
  }

  return (
    data.admin && (
      <Box
        style={{
          color: colors.grey[100],
        }}
      >
        <div className="dashboardshow">
          <ul className="table1 dashtrip">
            <li>
              <h6>Name </h6> <h6>{data.name}</h6>
            </li>
            <li>
              <h6>Email </h6> <h6>{data.email}</h6>
            </li>
            <li>
              <h6>Phone Number </h6> <h6>{data.phone_number}</h6>
            </li>
            <li>
              <h6>Admin: </h6> <h6>{data.admin.user_name}</h6>
            </li>
            <li style={{ overflow: "hidden" }}>
              <h6>Trips: </h6>
              <Box borderRadius="30px" width="80%">
                {trip && (
                  <Box
                    backgroundColor={colors.primary[400]}
                    p="10px 15px"
                    alignItems={"center"}
                    textAlign={"center"}
                  >
                    <Box
                      display="grid"
                      gridTemplateColumns="repeat(7, 12%)"
                      borderBottom={`1px solid ${colors.primary[800]}`}
                      p="15px !important"
                      gap="20px"
                    >
                      <Box color={colors.greenAccent[500]}>
                        <Typography>id</Typography>
                      </Box>
                      <Box color={colors.grey[100]}>
                        <Typography>description</Typography>
                      </Box>
                      <Box color={colors.grey[100]}>
                        <Typography>start_age</Typography>
                      </Box>
                      <Box color={colors.grey[100]}>
                        <Typography>end_age</Typography>
                      </Box>
                      <Box color={colors.grey[100]}>
                        <Typography>max_persons</Typography>
                      </Box>
                      <Box color={colors.grey[100]}>
                        <Typography>rate</Typography>
                      </Box>
                      <Box color={colors.grey[100]}>
                        <Typography>days_number</Typography>
                      </Box>
                    </Box>
                    {trip.map((e, i) => (
                      <Box position={"relative"}>
                        <Link
                          to={
                            mainAdmin
                              ? `/dash/tripDetails`
                              : `/dashTrip/tripDetails`
                          }
                          state={{ trip: e }}
                          key={`${e.id}-${i}`}
                        >
                          <Box
                            display="grid"
                            gridTemplateColumns="repeat(7, 12%)"
                            borderBottom={`1px solid ${colors.primary[800]}`}
                            p="15px !important"
                            gap="20px"
                            alignItems={"center"}
                          >
                            <Box color={colors.greenAccent[500]}>
                              <Typography>{e.id}</Typography>
                            </Box>
                            {}
                            <Box color={colors.grey[100]}>
                              <Typography>{e.description}</Typography>
                            </Box>
                            <Box color={colors.grey[100]}>
                              <Typography>{e.start_age}</Typography>
                            </Box>
                            <Box color={colors.grey[100]}>
                              <Typography>{e.end_age}</Typography>
                            </Box>
                            <Box color={colors.grey[100]}>
                              <Typography>{e.max_persons}</Typography>
                            </Box>
                            <Box color={colors.grey[100]}>
                              <Typography>{e.rate}</Typography>
                            </Box>
                            <Box color={colors.grey[100]}>
                              <Typography>{e.days_number}</Typography>
                            </Box>
                          </Box>
                        </Link>

                        {!mainAdmin ? (
                          <IconButton
                            sx={{
                              position: "absolute",
                              bottom: "calc(50% - 1rem)",
                              left: "-20px",
                              color: "brown",
                            }}
                            onClick={() => {
                              deleteInput(
                                "http://127.0.0.1:8000/api/trip/deleteSomeTrip?trip_id=",
                                e.id
                              );
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        ) : null}
                      </Box>
                    ))}
                    <Pagination
                      count={pageCount}
                      size="small"
                      onChange={handlePageChange}
                      className="pagination-container"
                    />
                  </Box>
                )}
              </Box>
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
                  "http://127.0.0.1:8000/api/admin/deleteTheCompany?id=" +
                    data.id
                );
                navigate("/dash/company");
              } else {
                axios.get("http://127.0.0.1:8000/api/trip/deleteTheCompany", {
                  headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                });
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
          {!mainAdmin ? (
            <Box
              className="deletebutoomShow edit"
              backgroundColor="#9E9E9E"
              onClick={() => {
                setAddScreen([0, 1, 0]);
              }}
            >
              Add Trip
            </Box>
          ) : null}
          {addScreen[1] ? (
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
                onClick={() => setAddScreen([0, !addScreen[1], 0])}
              >
                <CloseIcon />
              </IconButton>
              <AddTrip
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

export default ShowTrip;
