import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  IconButton,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import BackButtom from "../../components/BackButtom";

function ReservationsAtt() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  let [data, setdata] = useState({});

  const navigate = useNavigate();

  let mainAdmin = localStorage.getItem("_auth_type") === "main_admin" ? 1 : 0;
  let token = localStorage.getItem("_auth");
  async function getUsers() {
    if (mainAdmin) {
      const id = location.state.id;
      await axios
        .get(
          "http://127.0.0.1:8000/api/admin/getLatestTripReservations?trip_id=" +
            id
        )
        .then((response) => response.data)
        .then((data) => data.data)
        .then((data) => {
          setdata(data);
        });
    } else {
      await axios
        .get("http://127.0.0.1:8000/api/attraction/getLatestReservations", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.data)
        .then((data) => data.data)
        .then((data) => {
          setdata(data.data);
        });
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  if (!data[0]) {
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
        <h3>" Reservations Not found"</h3>
      </Box>
    );
  }
  return (
    data[0] && (
      <Box
        backgroundColor={colors.primary[400]}
        p="10px 15px"
        alignItems={"center"}
        textAlign={"center"}
        width={"70%"}
        margin={"100px auto"}
        borderRadius={"30px"}
      >
        <BackButtom />
        <Box
          display="grid"
          gridTemplateColumns="repeat(6, 14%)"
          borderBottom={`1px solid ${colors.primary[800]}`}
          p="20px "
          gap="20px"
        >
          <Box color={colors.greenAccent[500]}>
            <Typography>user first_name</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>adult</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>child</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>money_spent</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>points_added</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>departure_date</Typography>
          </Box>
        </Box>
        {data.map((e, i) => (
          <Box
            display="grid"
            gridTemplateColumns="repeat(6, 14%)"
            borderBottom={`1px solid ${colors.primary[800]}`}
            p="20px "
            gap="20px"
          >
            <Box color={colors.greenAccent[500]}>
              <Typography>{e.user.first_name}</Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <Typography>{e.adults}</Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <Typography>{e.children}</Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <Typography>{e.payment}</Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <Typography>{e.points_added}</Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <Typography>{e.book_date}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    )
  );
}

export default ReservationsAtt;
