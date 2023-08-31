import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import {MdLocationOn} from 'react-icons/md';

export default function MultipleSelectChip(props) {
  
  const [counstrySelected, setselectcountry] = React.useState(props.value||"");

  const handleChange = (event) => {
    setselectcountry(event.target.value);
  };

  React.useEffect(() => {
    props.country(counstrySelected);
  }, [counstrySelected]);

  const [country, setCountry] = React.useState([]);
  const countryName=[];

  React.useEffect(()=> {
    const getdata = async () =>{
    const response =await axios.get('http://127.0.0.1:8000/api/getCountries');
    setCountry(response.data.countries);
  }  

  getdata();
    },[]);
    country.map((it)=>(
      countryName.push(it.name)
  ));
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"><MdLocationOn/>{props.name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={counstrySelected}
          label="Select country"
          onChange={handleChange}
        > 
          {countryName.map((s,index)=>(
          <MenuItem key={index} value={s}> {s}</MenuItem>
          ))}

        </Select>
      </FormControl>
    </Box>
  );
}
