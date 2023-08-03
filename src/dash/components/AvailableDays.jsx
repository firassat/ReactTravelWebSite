import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function AvailableDays(props) {
  const [checked, setChecked] = React.useState([0, 0, 0, 0, 0, 0, 0]);
  props.setChecked(checked);
  const handleChange7 = (event) => {
    setChecked([
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
      event.target.checked,
    ]);
  };
  const handleChange0 = (event) => {
    setChecked([
      event.target.checked,
      checked[1],
      checked[2],
      checked[3],
      checked[4],
      checked[5],
      checked[6],
    ]);
  };
  const handleChange1 = (event) => {
    setChecked([
      checked[0],
      event.target.checked,
      checked[2],
      checked[3],
      checked[4],
      checked[5],
      checked[6],
    ]);
  };
  const handleChange2 = (event) => {
    setChecked([
      checked[0],
      checked[1],
      event.target.checked,
      checked[3],
      checked[4],
      checked[5],
      checked[6],
    ]);
  };
  const handleChange3 = (event) => {
    setChecked([
      checked[0],
      checked[1],
      checked[2],
      event.target.checked,
      checked[4],
      checked[5],
      checked[6],
    ]);
  };
  const handleChange4 = (event) => {
    setChecked([
      checked[0],
      checked[1],
      checked[2],
      checked[3],
      event.target.checked,
      checked[5],
      checked[6],
    ]);
  };
  const handleChange5 = (event) => {
    setChecked([
      checked[0],
      checked[1],
      checked[2],
      checked[3],
      checked[4],
      event.target.checked,
      checked[6],
    ]);
  };
  const handleChange6 = (event) => {
    setChecked([
      checked[0],
      checked[1],
      checked[2],
      checked[3],
      checked[4],
      checked[5],
      event.target.checked,
    ]);
  };
  return (
    <div>
      <FormControlLabel
        label="AvailableDays"
        control={
          <Checkbox
            color="default"
            checked={
              checked[0] &&
              checked[1] &&
              checked[2] &&
              checked[3] &&
              checked[4] &&
              checked[5] &&
              checked[6]
            }
            indeterminate={
              !checked[0] ||
              !checked[1] ||
              !checked[2] ||
              !checked[3] ||
              !checked[4] ||
              !checked[5] ||
              !checked[6]
            }
            onChange={handleChange7}
          />
        }
      />
      <Box
        sx={{ display: "flex", flexDirection: "row", ml: 3, padding: "20px" }}
      >
        <FormControlLabel
          label="Saturday"
          control={
            <Checkbox
              color="default"
              checked={checked[0]}
              onChange={handleChange0}
            />
          }
        />
        <FormControlLabel
          label="Sunday"
          control={
            <Checkbox
              color="default"
              checked={checked[1]}
              onChange={handleChange1}
            />
          }
        />
        <FormControlLabel
          label="Monday"
          control={
            <Checkbox
              color="default"
              checked={checked[2]}
              onChange={handleChange2}
            />
          }
        />
        <FormControlLabel
          label="Tuesday"
          control={
            <Checkbox
              color="default"
              checked={checked[3]}
              onChange={handleChange3}
            />
          }
        />
        <FormControlLabel
          label="Wednesday"
          control={
            <Checkbox
              color="default"
              checked={checked[4]}
              onChange={handleChange4}
            />
          }
        />
        <FormControlLabel
          label="Thursday"
          control={
            <Checkbox
              color="default"
              checked={checked[5]}
              onChange={handleChange5}
            />
          }
        />
        <FormControlLabel
          label="Friday"
          control={
            <Checkbox
              color="default"
              checked={checked[6]}
              onChange={handleChange6}
            />
          }
        />
      </Box>
    </div>
  );
}
