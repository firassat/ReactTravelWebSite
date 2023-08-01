import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import UserGrid from "../../components/grid/UserGrid";

const HotelAdmins = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      headerName: "Delete",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            m="0 auto"
            display="flex"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            p="0 10px"
            color="white"
            borderRadius="4px"
            backgroundColor="#f44336"
            onClick={() => {
              console.log(id);
            }}
          >
            Delete
          </Box>
        );
      },
    },
  ];
  return (
    <Box
      m="10px 0 40px 0"
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-row": {
          borderBottom: "none !important",
        },
        position: "absolute",
        top: "15%",
        padding: "20px",
        width: "100%",
      }}
    >
      <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
        Hotels
      </Typography>
      <UserGrid
        url="http://127.0.0.1:8000/api/admin/getAllUsers"
        columns={columns}
      />
    </Box>
  );
};

export default HotelAdmins;
