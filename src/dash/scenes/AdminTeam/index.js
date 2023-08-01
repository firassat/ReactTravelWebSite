import { Box } from "@mui/material";
import React, { useState } from "react";
import HotelAdmins from "./HotelAdmins";
import FlightAdmins from "./FlightAdmins";
import TripAdmins from "./TripAdmins";
import AttAdmins from "./AttAdmins";

const AdminTeam = () => {
  const [state, setState] = useState(0);
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
      >
        <Box className="dashCompanyItems">
          <button onClick={() => setState(state === 1 ? 0 : 1)}>
            Hotel Admins
          </button>
        </Box>
        <Box className="dashCompanyItems">
          <button onClick={() => setState(state === 2 ? 0 : 2)}>
            Flight Admins
          </button>
        </Box>
        <Box className="dashCompanyItems">
          <button onClick={() => setState(state === 3 ? 0 : 3)}>
            Trip Admins
          </button>
        </Box>
        <Box className="dashCompanyItems">
          <button onClick={() => setState(state === 4 ? 0 : 4)}>
            Attraction Admins
          </button>
        </Box>
      </Box>

      {state === 1 ? <HotelAdmins /> : ""}
      {state === 2 ? <FlightAdmins /> : ""}
      {state === 3 ? <TripAdmins /> : ""}
      {state === 4 ? <AttAdmins /> : ""}
    </Box>
  );
};

export default AdminTeam;
