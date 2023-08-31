import {React , useEffect ,useState} from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


export function IconCheckboxes() {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [state, setState] = useState(false);
    const token = localStorage.getItem('token');

    const handleClick = () => {
        if (!token) {
            console.log('not authenticated');
            
        }
        setState(!state);
        // setState(!state);
        // color: "red"
    };
    return (
        <div>
            <Checkbox 
                {...label}  
                sx={{ color: state ? "red" : "red",
                backgroundColor: "white",
                '&.Mui-checked': {
                    color: "red",
                },}} 
                onClick={handleClick}
                icon={<FavoriteBorder />} 
                checkedIcon={<Favorite />} 
                checked={token ? state : false}
            />
        </div>
    );
}



export function HalfRating(props) {

    const[numberofstar,setNumberofstar] = useState(0);

    useEffect(() => { 
        if(props.type==="controlled") {
            props.value(numberofstar);
        }
    }, [numberofstar]);

    if(props.type==="read"){
        return (
            <Stack spacing={1}>
                <Rating name="half-rating-read" defaultValue={0} value={props.numberofstar} precision={0.5} readOnly/>
            </Stack>
        );
    }
    else if(props.type==="controlled"){
        return(
            <Stack spacing={1}>
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} value={numberofstar} onChange={(e)=>setNumberofstar(Number(e.target.value))}/>
            </Stack>
        )
    }
}

