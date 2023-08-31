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

  let mainAdmin = localStorage.getItem("_auth_type") === "main_admin" ? 1 : 0;
  let token = localStorage.getItem("_auth");
  async function getUsers() {
    await axios
      .post(
        "http://127.0.0.1:8000/api/hotel/SeeAllReservations",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => response.data)
      .then((data) => data.data)
      .then((data) => {
        setdata(data.data);
      });
  }
  useEffect(() => {
    getUsers();
  }, []);
  function getDate(date) {
    const d = new Date(date);
    const saveConverted = d.toUTCString();
    return saveConverted;
  }
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
        gridTemplateColumns="repeat(8, 10%)"
        borderBottom={`1px solid ${colors.primary[800]}`}
        p="20px "
        gap="20px"
      >
        <Box color={colors.greenAccent[500]}>
          <Typography>user_id</Typography>
        </Box>
        <Box color={colors.grey[100]}>
          <Typography>check_in</Typography>
        </Box>
        <Box color={colors.grey[100]}>
          <Typography>check_out</Typography>
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
          <Typography>room_id</Typography>
        </Box>
        <Box color={colors.grey[100]}>
          <Typography>created_at</Typography>
        </Box>
      </Box>
      {data.map((e, i) => (
        <Box
          display="grid"
          gridTemplateColumns="repeat(8, 10%)"
          borderBottom={`1px solid ${colors.primary[800]}`}
          p="20px "
          gap="20px"
        >
          <Box color={colors.greenAccent[500]}>
            <Typography>{e.user_id}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.check_in}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.check_out}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.num_of_adults}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.num_of_children}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.payment}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{e.room_id}</Typography>
          </Box>
          <Box color={colors.grey[100]}>
            <Typography>{getDate(e.created_at)}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ShowTrip;
