import * as React from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { VscDebugBreakpointLog } from "react-icons/vsc";

export default function CustomizedList(props) {
  const [open, setOpen] = React.useState(false);
  const handleClick = (index) => {
    setOpen((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Paper elevation={0} sx={{ width: 1000, margin: "auto" }}>
        {props.data &&
          props.data.map((item, index) => {
            return (
              <Box
                sx={{
                  bgcolor: open[index]
                    ? "rgba(188,205,224,0.2)"
                    : "rgba(255,255,255,1)",
                  pb: open[index] ? 2 : 0,
                }}
                key={index}
              >
                <ListItemButton
                  alignItems="flex-start"
                  onClick={() => handleClick(index)}
                  sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open[index] ? 0 : 2.5,
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      lineHeight: "20px",
                      mb: "2px",
                    }}
                    secondaryTypographyProps={{
                      noWrap: true,
                      fontSize: 12,
                      lineHeight: "16px",
                      color: open[index]
                        ? "rgba(0,0,0,0)"
                        : "rgba(255,255,255,0.5)",
                    }}
                    sx={{ my: 0 }}
                  >
                    <VscDebugBreakpointLog />
                    <span style={{ fontSize: "18", fontWeight: "600" }}>
                      Day {item.day_number}
                    </span>
                    &nbsp;&nbsp;{item.title}
                  </ListItemText>

                  <KeyboardArrowDown
                    sx={{
                      mr: -1,
                      transform: open[index] ? "rotate(-180deg)" : "rotate(0)",
                      // transition: '0.2s',
                      border: "2px solid #00a0f3",
                      borderRadius: "50%",
                    }}
                  />
                </ListItemButton>
                {open[index] && (
                  <p style={{ marginLeft: "50px", marginTop: "20px" }}>
                    {item.details}
                  </p>
                )}
              </Box>
            );
          })}
      </Paper>
    </Box>
  );
}
