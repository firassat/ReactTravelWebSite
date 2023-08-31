import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {IoBed} from 'react-icons/io5';
import Room from './room';
import "./room.css";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables(props) {
  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Room Type</StyledTableCell>
            <StyledTableCell align="right">Beds <IoBed size="2em"/></StyledTableCell>
            <StyledTableCell align="right">Number of rooms</StyledTableCell>
            <StyledTableCell align="right">price for night</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                <Room name={row.room_type} id={props.id} />
              </StyledTableCell>
              <StyledTableCell align="right">{row.beds}</StyledTableCell>
              <StyledTableCell align="right">{row.room_count}</StyledTableCell>
              <StyledTableCell align="right"><span className='price'>{row.price_for_night} $</span></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

  );
}
