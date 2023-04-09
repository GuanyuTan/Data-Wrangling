import React from "react";
import { Table,TableBody, TableHead, TableCell, TableRow, TableContainer, Paper } from "@mui/material";
  
function createData(number, item, qty, price) {
 return { number, item, qty, price };
}
  
const rows = [
 createData(1, "Apple", 5, 3),
 createData(2, "Orange", 2, 2),
 createData(3, "Grapes", 3, 1),
 createData(4, "Tomato", 2, 1.6),
 createData(5, "Mango", 1.5, 4)
];
  
export default function BasicTable() {
 return (
   <TableContainer component={Paper}>
     <Table aria-label="simple table">
       <TableHead>
         <TableRow>
           <TableCell>S.No</TableCell>
           <TableCell align="right">Item</TableCell>
           <TableCell align="right">Quantity&nbsp;(kg)</TableCell>
           <TableCell align="right">Price&nbsp;($)</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {rows.map((row) => (
           <TableRow key={row.number}>
             <TableCell component="th" scope="row">
               {row.number}
             </TableCell>
             <TableCell align="right">{row.item}</TableCell>
             <TableCell align="right">{row.qty}</TableCell>
             <TableCell align="right">{row.price}</TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
 );
}