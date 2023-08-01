import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card} from 'react-bootstrap';
import {HiOutlineHeart} from 'react-icons/hi';
import HalfRating from './star';

const Cards =(props) => {
    let {imgSrc,name,rev,rate,ad_price,ch_price,city}=props.data;
    if (props.typ==="hotel"||props.typ==="trip"){
        return (
            <Card className=" p-0 overflow-hidden" style={{width:"280px",border:"none"}}>
                <div  className='overflow-hidden rounded p-0 bg-light'>
                    <Card.Img variant="top" src={imgSrc} />
                    <div className='container' style={{textAlign:"left",
                    marginTop: "-80px" ,color:"white",fontSize:"40px"}}>{name}
                    </div>
                    <div className="topright" style={{borderRadius:"50%", padding:"5px",}}>
                        <HiOutlineHeart size="2em" style={{color:"white",strokeWidth:"1px"}}/>
                    </div>
                </div>
                <div className='' style={{width:"280px",paddingBottom:"1px",paddingTop:"10px"}} >
                    {/* <h6> hvhcgcfgg</h6> 
                    <label style={{color:"gray"}}>Dubai,United Arab Emirates</label><br/> */}
                    <label>{city}</label><br/>
                    <label><HalfRating numberofstar={rate}/></label><br/>
                    <label><span style={{color:"black"}}>Price for adult : {ad_price}$ &nbsp; , Price for child : {ch_price}$</span></label>
                    <label style={{paddingInlineStart: "8px", color:"gray"}} >reviews : {rev}</label><br/>
                </div>
            </Card>

    );}
    else {
        return(
        <Card className=" p-0 overflow-hidden" style={{width:"280px",border:"none"}}>
            <div  className='overflow-hidden rounded p-0 bg-light'>
                <Card.Img variant="top" src={imgSrc} />
                <div className='' style={{textAlign:"left",
                marginTop: "-80px" ,color:"white",fontSize:"40px"}}>{name}
                </div>
            </div>
        </Card>
        )
    
    }
}

export default Cards;
