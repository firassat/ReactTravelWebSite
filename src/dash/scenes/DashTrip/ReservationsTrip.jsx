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

function ShowTrip() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  let [data, setdata] = useState([]);

  const navigate = useNavigate();

  let token = localStorage.getItem("_auth");
  async function getUsers() {
    await axios
      .get("http://127.0.0.1:8000/api/trip/getLatestReservations", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .then((data) => data.data)
      .then((data) => {
        setdata(data);
      });
  }
  useEffect(() => {
    getUsers();
  }, []);
  console.log(data);
  return (
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
        gridTemplateColumns="repeat(7, 12%)"
        borderBottom={`1px solid ${colors.primary[800]}`}
        p="20px "
        gap="20px"
      >
        <Box color={colors.greenAccent[500]}>
          <Typography>user_id</Typography>
        </Box>
        <Box color={colors.grey[100]}>
          <Typography>description</Typography>
        </Box>
        <Box color={colors.grey[100]}>
          <Typography>adult</Typography>
        </Box>
        <Box color={colors.grey[100]}>
          <Typography>child</Typography>
        </Box>
        <Box color={colors.grey[100]}>
          <Typography>payment</Typography>
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
          gridTemplateColumns="repeat(7, 12%)"
          borderBottom={`1px solid ${colors.primary[800]}`}
          p="20px "
          gap="20px"
        >
          <Box color={colors.greenAccent[500]}>
            <Typography>{e.user_id}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.description}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.adult}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.child}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.payment}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.points_added}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.departure_date}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ShowTrip;
