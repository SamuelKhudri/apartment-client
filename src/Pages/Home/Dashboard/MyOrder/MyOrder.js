import { Delete } from '@mui/icons-material';
import { CircularProgress, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyOrder = () => {
   const [myOrders, setMyOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const { user } = useAuth();
   const userEmail = user?.email;
   useEffect(() => {
      fetch(`https://rocky-thicket-09241.herokuapp.com/myOrder/${userEmail}`)
         .then(res => res.json())
         .then(data => {
            // console.log(data)
            setMyOrders(data);
            setLoading(false);
         })
   }, [userEmail]);

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
                     const remainingItems = myOrders.filter(order => order._id !== id)
                     setMyOrders(remainingItems)
                  }
               })
         }
      })
   }


   return (
      <>
         <Box>
            <Container>
               <Box sx={{ my: 4,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600',color:'#F2184F' }} variant="h3">My Order</Typography>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600' }} variant="h3">{user?.displayName}</Typography>
               </Box>
               {
                  loading && <CircularProgress />
               }
               <TableContainer component={Paper} sx={{ maxWidth: '850px', margin: '0 auto' }}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                     <TableHead>
                        <TableRow>
                           <TableCell align="left">Service Name</TableCell>
                           <TableCell align="left">Price</TableCell>
                           <TableCell align="left">Action</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>

                        {
                           myOrders.map(myOrder => <TableRow key={myOrder._id} align="center">
                              <TableCell>{myOrder?.orderItem?.name}</TableCell>
                              <TableCell>$ {myOrder?.orderItem?.price}</TableCell>
                              <TableCell>
                                 <IconButton onClick={() => handleDelete(myOrder._id)} aria-label="delete">
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

export default MyOrder;