import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { TextField } from "@mui/material";

export default function GetCity(props) {
  const [cuntry, setcuntry] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [cityid, setcityid] = useState(1);
  const [cityData, setcityData] = useState([]);
  props.setCity(cityid);
  props.setCountry(cuntry);

  async function getCuntry() {
    await axios
      .get("http://127.0.0.1:8000/api/getCountries")
      .then((response) => response.data)
      // .then((response) => response.data)
      .then((response) => {
        setRepositories(response.countries);
      });
  }

  useEffect(() => {
    getCuntry();
  }, []);

  async function getCity() {
    await axios
      .get("http://127.0.0.1:8000/api/admin/showcity?country_id=" + cuntry)
      .then((response) => response.data)
      .then((response) => setcityData(response.city));
  }
  useEffect(() => {
    cuntry && getCity();
  }, [cuntry]);

  return (
    <
      // sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <TextField
        sx={{ gridColumn: "span 2" }}
        select
        label="Select Cuntry"
        value={cuntry ? cuntry : ""}
        onChange={(newValue) => setcuntry(newValue.target.value)}
        size="small"
        name="country_id"
      >
        {repositories.map((e) => {
          return <MenuItem value={e.id ? e.id : ""}>{e.name}</MenuItem>;
        })}
      </TextField>
      <TextField
        sx={{ gridColumn: "span 2" }}
        select
        label="Select City"
        value={cityid ? cityid : ""}
        onChange={(newValue) => setcityid(newValue.target.value)}
        size="small"
        name="city_id"
      >
        {cityData
          ? cityData.map((e) => {
              return <MenuItem value={e.id ? e.id : ""}>{e.name}</MenuItem>;
            })
          : null}
      </TextField>
    </>
  );
}
