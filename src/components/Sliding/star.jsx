import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const HalfRating = (props) => {
    return (
        <Stack spacing={1}>
        {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
        <Rating name="half-rating-read" defaultValue={0} value={props.numberofstar}precision={0.5} readOnly/>
        </Stack>
);
}
export default HalfRating;