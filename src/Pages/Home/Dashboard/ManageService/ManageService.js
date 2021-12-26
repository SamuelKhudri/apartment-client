import React, { useEffect, useState } from 'react';
import {
   CircularProgress,
   Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
   TableRow, Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { Delete } from '@mui/icons-material';
import Swal from 'sweetalert2';

const ManageService = () => {
   const [orderList, setOrderList] = useState([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      fetch('https://rocky-thicket-09241.herokuapp.com/orderList')
         .then(res => res.json())
         .then(data => {
            // console.log(data);
            setOrderList(data);
            setLoading(false)
         })
   }, []);

      // handleDelete
      const handleDelete = (id) => {
         Swal.fire({
            title: 'Are you sure?',
            text: "You won't to delete your product",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
         }).then((result) => {
            if (result.value) {
               fetch(`https://rocky-thicket-09241.herokuapp.com/deleteOrder/${id}`, {
                  method: 'DELETE'
               })
                  .then(res => res.json())
                  .then(data => {
                     console.log(data);
                     if (data.deletedCount) {
                        Swal.fire({
                           type: 'success',
                           title: 'Delete Successfully',
                        })
                        const remainingItems = orderList.filter(order => order._id !== id)
                        setOrderList(remainingItems)
                     }
                  })
            }
         })
      }
   
   return (
      <>
         <Box>
            <Container>
               <Box sx={{ my: 4 }}>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600',color:'#F2184F' }} variant="h3">All Order List</Typography>
               </Box>
               {
                  loading && <CircularProgress />
               }
                  <TableContainer sx={{maxWidth: '850px', margin: '0 auto' }} component={Paper}>
                     <Table aria-label="customized table">
                        <TableHead>
                           <TableRow>
                              <TableCell align="left">Serial No:</TableCell>
                              <TableCell align="left">Title</TableCell>
                              <TableCell align="left">Fee</TableCell>
                              <TableCell align="left">Action</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {
                              orderList.map((order,index) => <TableRow key={order._id} align="center">
                                 <TableCell>{index + 1}</TableCell>
                                 <TableCell>{order?.orderItem?.name}</TableCell>
                                 <TableCell>$ {order?.orderItem?.price}</TableCell>
                                 <TableCell>
                                    <IconButton onClick={() => handleDelete(order._id)} aria-label="delete">
                                    <Delete style={{ color: '#E80356' }} /> </IconButton>
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

export default ManageService;