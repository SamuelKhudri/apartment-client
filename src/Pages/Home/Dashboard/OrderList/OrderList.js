// import { Delete } from '@mui/icons-material';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const OrderList = () => {
   const [orderList, setOrderList] = useState([]);
   const {user} = useAuth();
   useEffect(() => {
      fetch('https://rocky-thicket-09241.herokuapp.com/orderList')
         .then(res => res.json())
         .then(data => {
            console.log(data);
            setOrderList(data)
         })
   }, []);
   return (
      <>
         <Box>
            <Container>
               <Box sx={{ my: 4,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600',color:'#F2184F' }} variant="h3">Order List</Typography>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600' }} variant="h3">{user?.displayName}</Typography>
               </Box>
                  <TableContainer sx={{ maxWidth: '850px', margin: '0 auto' }} component={Paper}>
                     <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                           <TableRow>
                              <TableCell align="left">Name</TableCell>
                              <TableCell align="left">Email</TableCell>
                              <TableCell align="left">Service Name</TableCell>
                              <TableCell align="left">Status</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {
                              orderList.map(order => <TableRow key={order._id} align="center">
                                 <TableCell>{order?.userName}</TableCell>
                                 <TableCell>{order?.userEmail}</TableCell>
                                 <TableCell>{order?.orderItem?.name}</TableCell>
                                 <TableCell>
                                    <select style={{padding:'8px',border:'1.5px solid #122033'}} name="" id="">
                                       <option style={{padding:'10px'}} value="Pending">Pending</option>
                                       <option style={{padding:'10px'}} value="On Going">On Going</option>
                                       <option style={{padding:'10px'}} value="Done">Done</option>
                                    </select>
                                 </TableCell>
                              </TableRow>)
                           }
                        </TableBody>
                     </Table>
                  </TableContainer>
            </Container>
         </Box>
      </>
   );
};

export default OrderList;