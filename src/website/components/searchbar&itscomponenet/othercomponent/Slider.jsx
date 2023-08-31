import {React , useState ,useEffect} from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const BoxSlider = (props) => {
    const [slidervalue,setslidervalue]=useState(props.value);

    const handleSliderChange = (e, newValue) => {
        setslidervalue(newValue);
        props.slidervalue(newValue);
    };

return(
    <Box sx={{ minWidth: 300 }}>
    <Slider
        value={slidervalue}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
        step={100}
        marks
        min={0}
        max={2000}
    />
    </Box>
    )
} 
export default BoxSlider;