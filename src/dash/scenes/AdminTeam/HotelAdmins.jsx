import React from "react";
import {
  Box,
  IconButton,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AdminForm from "../AdminForm";
import AddAdminHotel from "../AdminForm/AddAdminHotel";

function HotelAdmins() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let [reload, setReload] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  let [addScreen, setAddScreen] = useState([0, 0, 0]);

  async function getUsers() {
    await axios
      .get("http://127.0.0.1:8000/api/admin/getAllHotelAdmins")
      .then((response) => response.data)
      .then((data) => {
        setRepositories(data.data.data);
        setPageCount(data.data.last_page);
      });
  }
  useEffect(() => {
    getUsers();
  }, []);

  const getData = async () => {
    await axios
      .get(
        "http://127.0.0.1:8000/api/admin/getAllHotelAdmins" +
          "?page=" +
          pageOffset
      )
      .then((response) => response.data)
      .then((data) => {
        setRepositories(data.data.data);
      });
  };
  useEffect(() => {
    getData();
  }, [pageOffset, reload]);

  const handlePageChange = (event, page) => {
    setPageOffset(page);
  };
  console.log(repositories);
  const deleteInput = (url, id) => {
    const response = axios.get(url + id, {
      headers: {
        Accept: "application/json",
      },
    });
    setReload((priv) => priv + 1);
  };

  return (
    <Box
      m="15px 0 40px 0"
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-row": {
          borderBottom: "none !important",
        },
        position: "absolute",
        top: "10%",
        padding: "20px 60px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          padding: "10px 20px",
          "& a": {
            color: "inherit",
          },
        }}
      >
        <IconButton
          onClick={() => setAddScreen([0, !addScreen[1], 0])}
          sx={{ fontSize: "12px" }}
        >
          <AddIcon />
          Add Admin
        </IconButton>
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
            <AddAdminHotel
              url={"http://127.0.0.1:8000/api/admin/makeNewAdmin"}
              setReload={setReload}
              setAddScreen={setAddScreen}
            />
          </Box>
        ) : null}
      </Box>

      {repositories[0] && (
        <Box
          backgroundColor={colors.primary[400]}
          overflow="auto"
          overflow-style="none"
          borderRadius="30px"
          p="30px 50px"
          position={"relative"}
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(4, 25%)"
            borderBottom={`1px solid ${colors.primary[800]}`}
            p="20px "
            gap="20px"
            justifyContent={"center"}
            textAlign={"center"}
          >
            <Typography fontWeight={"900"} color={colors.greenAccent[500]}>
              Id
            </Typography>
            <Typography fontWeight={"900"}>Name</Typography>
            <Typography fontWeight={"900"}>User Name</Typography>
            <Typography fontWeight={"900"}>Hotel Name</Typography>
          </Box>
          {repositories.map((e, i) => (
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, 25%)"
              borderBottom={`1px solid ${colors.primary[800]}`}
              p="20px "
              gap="20px"
              key={`${e.id}-${i}`}
              position={"relative"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              <Typography color={colors.greenAccent[500]}>{e.id}</Typography>
              <Typography>{e.first_name}</Typography>
              <Typography>{e.user_name}</Typography>
              <Typography>{e.hotel && e.hotel.name}</Typography>

              <IconButton
                sx={{
                  position: "absolute",
                  bottom: "calc(50% - 1rem)",
                  left: "-10px",
                  color: "brown",
                }}
                onClick={() => {
                  deleteInput(
                    "http://127.0.0.1:8000/api/admin/deleteAdmin?id=",
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
      <Pagination
        count={pageCount}
        size="small"
        onChange={handlePageChange}
        className="pagination-container"
      />
    </Box>
  );
}

export default HotelAdmins;
