import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import UserGrid from "../../components/grid/UserGrid";
import "./team.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserTeam = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reload, setreload] = useState(0);
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "first_name",
      headerName: "first_name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "last_name",
      flex: 1,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },
    {
      field: "phone_number",
      headerName: "phone_number",
      flex: 1,
    },
    {
      field: "Delete",
      flex: 0.5,

      renderCell: ({ row: { id } }) => {
        return (
          <Box
            className="deletebutoom"
            onClick={() => {
              axios.get(
                "http://127.0.0.1:8000/api/admin/deleteUserAccount?id=" + id
              );
              setreload((priv) => priv + 1);
            }}
          >
            Delete
          </Box>
        );
      },
    },
    {
      field: "Edit",
      flex: 0.5,

      renderCell: ({ row: { id } }) => {
        return (
          <Box
            className="deletebutoom edit"
            onClick={async () => {
              await axios
                .get("http://127.0.0.1:8000/api/admin/getUserInfo?id=" + id)
                .then((response) => response.data)
                .then((data) => {
                  if (data.data)
                    navigate("/dash/editUser", {
                      state: data.data,
                    });
                });
            }}
          >
            Edit
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="User" subtitle="Managing the Team Members" />
      <Box
        m="20px 0 40px 0"
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[800],
            borderBottom: "none",
          },
          "& .MuiDataGrid-row": {
            borderBottom: "none !important",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            padding: "10px",
            "& a": {
              color: "inherit",
            },
          }}
        >
          <Link to={"/dash/userform"}>Add User</Link>
        </Box>
        <UserGrid
          url={"http://127.0.0.1:8000/api/admin/getAllUsers"}
          columns={columns}
          reload={reload}
        />
      </Box>
    </Box>
  );
};

export default UserTeam;
