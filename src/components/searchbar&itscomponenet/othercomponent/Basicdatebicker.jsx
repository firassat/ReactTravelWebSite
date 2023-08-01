import * as React from 'react';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./Basicdatebicker.css";
const BasicDatePicker = (props) =>{
    const [value, setValue] = useState(null); 
        function showvalue() {
        return(console.log({value}))}
        
    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={props.name} onChange={(newValue) => setValue(newValue)}/>
      </DemoContainer>
      {/* <button on onClick={showvalue}>click</button> */}
    </LocalizationProvider>
  );
}
export default BasicDatePicker;

