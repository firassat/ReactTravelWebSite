import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import {HalfRating} from '../../Stars&favoriteIcons/star';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

export function ColorRadioButtons(props) {
  const [selectedValue, setSelectedValue] = React.useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    
    
  };
  props.value(selectedValue);
  
  console.log(selectedValue);

  const controlProps = (item) => ({
    checked: selectedValue == item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });
  
  
  if(props.name==="hotelstar"){

  return (
    <div>
      <FormLabel id="demo-radio-buttons-group-label">Hotel Stars</FormLabel>
      <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
        <Radio {...controlProps(5)} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="s1"/>
        <label htmlFor="s1"><HalfRating numberofstar={5} type="read"/></label>
      </div>
      <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
        <Radio {...controlProps(4)} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="s2"/>
        <label htmlFor="s2"><HalfRating numberofstar={4} type="read"/></label>
      </div>
      <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
        <Radio {...controlProps(3)} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="s3"/>
        <label htmlFor="s3"><HalfRating numberofstar={3} type="read"/></label>
      </div>
      <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
        <Radio {...controlProps(2)} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="s4"/>
        <label htmlFor="s4"><HalfRating numberofstar={2} type="read"/></label>
      </div>
      <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
        <Radio {...controlProps(1)} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="s5"/>
        <label htmlFor="s5"><HalfRating numberofstar={1} type="read"/></label>
      </div>
    </div>
  );
  }
  if(props.name==="hoteltype"){

    return (
      <div>
        <FormLabel id="demo-radio-buttons-group-label">Hotel type</FormLabel>
        <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
          <Radio {...controlProps('All-suites')} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="t1"/>
          <label htmlFor='t1'>All-Suites</label>
        </div>
        <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
          <Radio {...controlProps('Motel')} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="t2"/>
          <label htmlFor='t2'>Motel</label>
        </div>
        <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
          <Radio {...controlProps('Inns')} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="t3"/>
          <label htmlFor='t3'>Inns</label>
        </div>
        <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
          <Radio {...controlProps('Resorts')} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="t4"/>
          <label htmlFor='t4'>Resorts</label>
        </div>
        <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
          <Radio {...controlProps('Chain')} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="t5"/>
          <label htmlFor='t5'>Chain</label>
        </div>
      </div>
    );
    }
    if(props.name==="hotelrate"){

      return (
        <div>
          <FormLabel id="demo-radio-buttons-group-label">Hotel Rate</FormLabel>
          <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
            <Radio {...controlProps(5)} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="r1"/>
            <label htmlFor="r1">Excellent</label>
          </div>
          <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
            <Radio {...controlProps(3)} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="r2"/>
            <label htmlFor="r2">good</label>
          </div>
          <div style={{display:"flex",alignItems:"center",marginTop:"15px"}}>
            <Radio {...controlProps(1)} sx={{ color: "#006ce4",'&.Mui-checked': {color: "#006ce4",},}} id="r3"/>
            <label htmlFor="r3">not bad</label>
          </div>
        </div>
      );
      }
  }


export function IndeterminateCheckbox(props) {
  const [checked, setChecked] = React.useState([false, false,false,false,false,false]);

  const handleChange = (index) => {
    setChecked(prevChecked => prevChecked.map((chk, chkIndex) => chkIndex === index ? !chk : chk));
  };
  const checkboxValues = ['Wifi', 'Resturant' ,'Parking','Rent-Cars','Swimming-Pools','Gym'];

React.useEffect(() => { 
  const checkedValues = checked.map((chk, index) => chk ? checkboxValues[index] : null).filter(Boolean);
  props.value(checkedValues)
}, [checked]);

return (
    <div>
      <FormLabel id="demo-radio-buttons-group-label" style={{marginLeft:"0"}}>Facilities</FormLabel>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <FormControlLabel
          label="Wifi"
          control={<Checkbox checked={checked[0]} onChange={() =>  handleChange(0)}  sx={{
                      color: "#006ce4",
                      '&.Mui-checked': {
                        color: "#006ce4",
                      },
                    }}/>}
        />
        <FormControlLabel
          label="Resturant"
          control={<Checkbox checked={checked[1]} onChange={()=>handleChange(1)}  sx={{
                      color: "#006ce4",
                      '&.Mui-checked': {
                        color: "#006ce4",
                      },
                    }}/>}
        />
        <FormControlLabel
          label="Parking"
          control={<Checkbox checked={checked[2]} onChange={()=>handleChange(2)}  sx={{
                      color: "#006ce4",
                      '&.Mui-checked': {
                        color: "#006ce4",
                      },
                    }}/>}
        />
          <FormControlLabel
          label="Rent cars"
          control={<Checkbox checked={checked[3]} onChange={()=>handleChange(3)}  sx={{
                      color: "#006ce4",
                      '&.Mui-checked': {
                        color: "#006ce4",
                      },
                    }}/>}
        />
        <FormControlLabel
          label="Swimming pool"
          control={<Checkbox checked={checked[4]} onChange={()=>handleChange(4)}  sx={{
                      color: "#006ce4",
                      '&.Mui-checked': {
                        color: "#006ce4",
                      },
                    }}/>}
        />
        <FormControlLabel
          label="Gym"
          control={<Checkbox checked={checked[5]} onChange={()=>handleChange(5)}  sx={{
                      color: "#006ce4",
                      '&.Mui-checked': {
                        color: "#006ce4",
                      },
                    }}/>}
        />
      </Box>
    </div>
  );
}
