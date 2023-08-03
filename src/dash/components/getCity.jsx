import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function GetCity(props) {
  const [cuntry, setcuntry] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [cityid, setcityid] = useState(1);
  const [cityData, setcityData] = useState([]);
  props.setCity(cityid);
  const handleChange = (event) => {
    setcuntry(event.target.value);
  };
  const handleChangeCity = (event) => {
    setcityid(event.target.value);
  };

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
      .then((response) => setcityData(response.cities));
  }
  useEffect(() => {
    cuntry && getCity();
  }, [cuntry]);

  return (
    <
      // sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
    >
      <FormControl sx={{ gridColumn: "span 2" }}>
        <InputLabel id="country_id">Country</InputLabel>
        <Select
          value={cuntry ? cuntry : ""}
          label="Cuntry"
          onChange={handleChange}
        >
          {repositories.map((e) => {
            return <MenuItem value={`${e.id}`}>{e.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ gridColumn: "span 2" }}>
        <InputLabel id="City">City</InputLabel>
        <Select
          value={cityid ? cityid : ""}
          label="City"
          onChange={handleChangeCity}
        >
          {cityData
            ? cityData.map((e) => {
                return <MenuItem value={`${e.id}`}>{e.name}</MenuItem>;
              })
            : null}
        </Select>
      </FormControl>
    </>
  );
}
