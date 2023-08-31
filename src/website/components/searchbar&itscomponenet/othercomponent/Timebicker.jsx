import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

export default function ResponsiveDateTimePickers(props) {

    function convertDateTime (data)  {

        const date = new Date(data.$d);
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        const seconds = ("0" + date.getSeconds()).slice(-2);
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const handleDateChange = (newValue) => {
        try {
            const formattedDate = convertDateTime(newValue);
            props.date(formattedDate);
        }
        catch {
            
        }
    }
        

return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
    components={[
        'DateTimePicker',
        'MobileDateTimePicker',
        'DesktopDateTimePicker',
        'StaticDateTimePicker',
    ]}
    >
    <DemoItem label="">
        <MobileDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} onChange={handleDateChange}/>
    </DemoItem>
    </DemoContainer>
</LocalizationProvider>
);
}