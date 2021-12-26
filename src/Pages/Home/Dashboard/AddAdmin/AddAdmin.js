import { Container, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import MuiButton from '../../../../Components/StyledComponents/MuiButton';
import Swal from 'sweetalert2';

const AddAdmin = () => {
   const [email,setEmail] = useState('');
   
   const handleSubmit = e => {
      e.preventDefault()
      // console.log(email)
      fetch(`https://rocky-thicket-09241.herokuapp.com/addAdmin/${email}`,{
         method:'PUT'
      })
      .then(res => res.json())
      .then(data => {
         if (data.modifiedCount) {
            Swal.fire({
               icon: 'success',
               title: 'Admin Added Successfully',
            })
         }
         else {
            Swal.fire({
               icon: 'error',
               title: 'Ops! User Not Exist',
            })
         }
      })
   }
   return (
      <>
         <Box>
            <Container>
               <Box sx={{ my: 4 }}>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600',color:'#F2184F' }} variant="h3">Add Admin</Typography>
               </Box>
               <form onSubmit={handleSubmit}>
                  <Paper elevation={3} sx={{ padding: '25px', maxWidth: '850px', margin: '0 auto' }}>
                     <Box>
                        <Typography sx={{ fontSize: '25px', fontWeight: '500', mb: 2 }} variant="h3">Name</Typography>
                        <TextField onBlur={e => setEmail(e.target.value)} type="text" label="Add Admin"
                        sx={{ mb: 2 }} required fullWidth  />
                     </Box>
                     <Box sx={{ textAlign: 'center' }}>
                        <MuiButton type="submit" variant="contained">Add Admin</MuiButton>
                     </Box>
                  </Paper>
               </form>
            </Container>
         </Box>
      </>
   );
};

export default AddAdmin;