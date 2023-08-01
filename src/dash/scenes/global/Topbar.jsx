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
const Topbar = (props) => {
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

  async function getNav() {
    axios
      .get("http://127.0.0.1:8000/api/admin/showAttractionUpdates")
      .then((response) => {
        setRepositories(response.data.data);
      });
  }
  useEffect(() => {
    getNav();
  }, [nav]);

  const navHandl = () => {
    setnav((priv) => !priv);
  };

  function getDate(date) {
    const d = new Date(date);
    const saveConverted = d.toUTCString();
    return saveConverted;
  }

  const useOutsideClick = (callback) => {
    const ref = React.useRef();

    React.useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, [ref]);
    return ref;
  };
  const ref = useOutsideClick(() => setnav(0));

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={"0 20px"}
      alignItems={"center"}
    >
      {/* logo */}
      <Box>
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
      >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton position={"relative"} onClick={navHandl} ref={ref}>
          <NotificationsOutlinedIcon />
        </IconButton>

        {nav ? (
          <Box
            borderRadius="30px"
            sx={{
              position: "absolute",
              top: "10%",
              right: "8%",
              maxHeight: "50%",
              overflow: "auto",
              zIndex: "5",
            }}
          >
            {repositories && (
              <Box
                gridColumn="span 12"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="10px 15px"
                alignItems={"center"}
              >
                {repositories.map((e, i) => (
                  <Link
                    to={`/dash/nav`}
                    state={{ repo: e }}
                    onClick={() => setnav(0)}
                    key={`${e.id}-${i}`}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      borderBottom={`1px solid ${colors.primary[800]}`}
                      p="15px 20px"
                    >
                      <Box color={colors.greenAccent[500]} px={"15px"}>
                        <Typography>{e.name}</Typography>
                      </Box>
                      {}
                      <Box color={colors.grey[100]} px={"15px"}>
                        <Typography color={colors.grey[100]}>
                          {getDate(e.created_at)}
                        </Typography>
                      </Box>
                      <Box
                        color={"brown"}
                        px={"15px"}
                        position="absolute"
                        right="5px"
                        alignItems={"center"}
                        display={"flex"}
                      >
                        {!e.seen ? (
                          <Brightness1Icon
                            sx={{
                              fontSize: "10px !important",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                  </Link>
                ))}
              </Box>
            )}
          </Box>
        ) : (
          <Box
            color={"brown"}
            px={"15px"}
            position="absolute"
            right="121px"
            top={"20px"}
          >
            {1 ? <Brightness1Icon fontSize="8px" /> : ""}
          </Box>
        )}
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ fontSize: "15px" }} onClick={() => signOut()}>
          Sgin Out
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
