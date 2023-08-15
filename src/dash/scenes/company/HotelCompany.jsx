import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import UserGrid from "../../components/grid/UserGrid";
import AddInput from "../../components/AddTripInput";
import { Link } from "react-router-dom";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const HotelCompany = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setdata] = useState({});
  let [addScreen, setAddScreen] = useState([0, 0, 0]);
  let [reload, setReload] = useState([]);

  async function gitFacil() {
    await axios
      .get("http://127.0.0.1:8000/api/admin/getAllFacilities")
      .then((res) => res.data)
      .then((res) => setdata(res.data));
  }
  useEffect(() => {
    gitFacil();
  }, [reload]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      // align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone_number",
      headerName: "Phone_number",
      flex: 1,
    },
    {
      field: "location",
      headerName: "location",
      flex: 1,
    },
    {
      field: "More",
      headerName: "More",
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            m="0 auto"
            display="flex"
            justifyContent="center"
            style={{ cursor: "pointer" }}
            p="0 10px"
            color="black"
            borderRadius="4px"
            backgroundColor="#9e9e9e"
            sx={{
              "& a ": {
                color: "black",
              },
            }}
          >
            <Link to={"/dash/showHotel"} state={{ id: id }}>
              Show More
            </Link>
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
        top: "20%",
        padding: "20px 50px",
        width: "100%",
      }}
    >
      <UserGrid
        url="http://127.0.0.1:8000/api/admin/AllHotels"
        columns={columns}
      />
      <Box p={"30px"}>
        <Typography>Facilities available</Typography>

        {data[0] && (
          <Box
            backgroundColor={colors.primary[400]}
            p="15px 25px"
            alignItems={"center"}
            textAlign={"center"}
            width="100%"
            position={"relative"}
            borderRadius={"30px"}
            display={"flex"}
            gap="25px"
            flexWrap={"wrap"}
          >
            <IconButton
              sx={{
                position: "absolute",
                bottom: "calc(50% - 1rem)",
                left: "-10%",
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
                <AddInput
                  setAddScreen={setAddScreen}
                  setReload={setReload}
                  inputNumber={1}
                  url={"http://127.0.0.1:8000/api/admin/addFacilities"}
                >
                  <input type="text" name="name" placeholder="name" />
                </AddInput>
              </Box>
            ) : null}

            {data.map((e, i) => (
              <Box
                p="15px "
                key={`${e.id}-${i}`}
                position={"relative"}
                textAlign={"center"}
                justifyContent={"center"}
              >
                <Typography>{e.name}</Typography>

                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "calc(50% - 1rem)",
                    right: "-20px",
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
      </Box>
    </Box>
  );
};

export default HotelCompany;
