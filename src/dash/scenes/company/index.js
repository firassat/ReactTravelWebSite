import { Box, useTheme } from "@mui/material";
import React, { useState } from "react";
import HotelCompany from "./HotelCompany";
import FlightCompany from "./FlightCompany";
import TripCompany from "./TripCompany";
import AttCompany from "./AttCompany";
import "./company.css";
import { tokens } from "../../../theme";

const Company = () => {
  const [state, setState] = useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ position: "relative", minHeight: "100%" }}>
      <Box
        className="dashCompanyItem"
        sx={
          state === 0
            ? {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }
            : {
                position: "absolute",
                margin: "10px auto",
                top: "0%",
                left: "50%",
                transform: "translate(-50%,0)",
              }
        }
        style={{
          color: colors.grey[100],
          fontSize: "15px",
        }}
      >
        <Box className="dashCompanyItems">
          <button onClick={() => setState(state === 1 ? 0 : 1)}>
            Hotel Company
          </button>
        </Box>
        <Box className="dashCompanyItems">
          <button onClick={() => setState(state === 2 ? 0 : 2)}>
            Flight Company
          </button>
        </Box>
        <Box className="dashCompanyItems">
          <button onClick={() => setState(state === 3 ? 0 : 3)}>
            Trip Company
          </button>
        </Box>
        <Box className="dashCompanyItems">
          <button onClick={() => setState(state === 4 ? 0 : 4)}>
            Attraction Company
          </button>
        </Box>
      </Box>
      {state === 1 ? <HotelCompany /> : ""}
      {state === 2 ? <FlightCompany /> : ""}
      {state === 3 ? <TripCompany /> : ""}
      {state === 4 ? <AttCompany /> : ""}
    </Box>
  );
};

export default Company;
