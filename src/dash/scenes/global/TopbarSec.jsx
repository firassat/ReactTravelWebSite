import React, { useContext, useEffect } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
const TopbarSec = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [nav, setnav] = useState(false);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [repositories, setRepositories] = useState([]);
  const signOut = () => {
    localStorage.removeItem("_auth");
    localStorage.removeItem("_auth_type");
    localStorage.removeItem("_auth_storage");
    localStorage.removeItem("_auth_state");
    navigate("/dash/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={"0 20px"}
      alignItems={"center"}
    >
      {/* logo */}
      <Box marginLeft={"10px"}>
        {theme.palette.mode === "dark" ? (
          <img height={"80px"} alt="logo" src={require("./logo2.png")} />
        ) : (
          <img height={"80px"} alt="logo" src={require("./logo.png")} />
        )}
      </Box>

      {/* ICONS */}
      <Box
        display="flex"
        height="50%"
        sx={{
          "& ::-webkit-scrollbar": {
            width: 0,
          },
        }}
        marginRight={"35px"}
      >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton sx={{ fontSize: "15px" }} onClick={() => signOut()}>
          Sign Out
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopbarSec;
