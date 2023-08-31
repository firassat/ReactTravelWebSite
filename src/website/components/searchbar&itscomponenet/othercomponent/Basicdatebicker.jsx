import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./Basicdatebicker.css";
import dayjs from 'dayjs';

const BasicDatePicker = (props) => {
    const handleDateChange = (newValue) => {
        props.date(dayjs(newValue));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
            <DatePicker label={props.name}  value={props.value ? dayjs(props.value) : null}  onChange={handleDateChange} />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default BasicDatePicker;