import React from "react";
import { Box, Pagination, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function AttAdmins() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reload, setreload] = useState(0);
  const [repositories, setRepositories] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  async function getUsers() {
    await axios
      .get("http://127.0.0.1:8000/api/admin/getAllAdmins")
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
        "http://127.0.0.1:8000/api/admin/getAllAdmins" + "?page=" + pageOffset
      )
      .then((response) => response.data)
      .then((data) => {
        setRepositories(data.data.data);
        console.log(data.data.data);
      });
  };
  useEffect(() => {
    getData();
  }, [pageOffset, reload]);

  const handlePageChange = (event, page) => {
    setPageOffset(page);
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
        <Link
          to={"/dash/adminForm"}
          state={{ url: "http://127.0.0.1:8000/api/admin/makeNewAdmin" }}
        >
          Add Admin
        </Link>
      </Box>
      {repositories && (
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          overflow-style="none"
          borderRadius="30px"
          p="30px 50px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`1px solid ${colors.primary[800]}`}
            p="15px 20px"
            className="adminTable"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                Id
              </Typography>
            </Box>
            <Box>
              <Typography
                color={colors.grey[100]}
                fontWeight={"900"}
                variant="h5"
              >
                User Name
              </Typography>
            </Box>
            <Box>
              <Typography
                color={colors.grey[100]}
                fontWeight={"900"}
                variant="h5"
              >
                Attraction
              </Typography>
            </Box>
            <Box>
              <Typography
                color={colors.grey[100]}
                fontWeight={"900"}
                variant="h5"
              >
                Delete
              </Typography>
            </Box>
          </Box>
          {repositories.map((e, i) => (
            <Box
              key={`${e.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[800]}`}
              p="15px 20px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {e.id}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
                <Typography color={colors.grey[100]}>{e.user_name}</Typography>
              </Box>
              <Box color={colors.grey[100]}>
                <Typography color={colors.grey[100]}>
                  {e.attraction && e.attraction.name}
                </Typography>
              </Box>
              <Box
                className="deletebutoom"
                onClick={() => {
                  axios.get(
                    "http://127.0.0.1:8000/api/admin/deleteAdmin?id=" + e.id
                  );
                  setreload((priv) => priv + 1);
                }}
              >
                Delete
              </Box>
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

export default AttAdmins;
