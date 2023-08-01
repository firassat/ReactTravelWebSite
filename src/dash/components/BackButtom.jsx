import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";

function BackButtom() {
  const navigate = useNavigate();
  return (
    <IconButton
      sx={{
        cursor: "pointer",
        position: "absolute",
        top: "15%",
        right: "10%",
      }}
      onClick={() => navigate(-1)}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}

export default BackButtom;
