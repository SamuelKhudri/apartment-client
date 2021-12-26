import { Box, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import MuiButton from '../../../../Components/StyledComponents/MuiButton';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useProperties from '../../../../hooks/useProperties';
import { AuthContext } from '../../../../Context/AuthProvider';
// import Payment from '../../../../Components/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../../../Components/Payment/CheckoutForm';

const Order = () => {
   const { user } = useAuth();
   const { selectedProperty, setSelectedProperty } = useContext(AuthContext);
   const { properties } = useProperties();

   // stripe
   const stripePromise = loadStripe('pk_test_51Jw2byBqVzzz64BlCZzYZ8HXFBqE7Hmj4CxvSDtuKeTncwolp3eVFp2JaXPnUXqSdcZMd7wAOVdBPrKVRzE35TgM00EfbTYyUQ');
   // service value

   const [loading, setLoading] = useState(true);

   const handleChange = (title) => {

      fetch(`https://rocky-thicket-09241.herokuapp.com/bookService/${title}`)
         .then(res => res.json())
         .then(data => {
            // console.log(data);
            setSelectedProperty(data);
            setLoading(false);
         })
   };


   console.log(loading)

   // handleSubmit
   const handleSubmit = e => {
      e.preventDefault();
      const orderItem = {
         userName: user?.displayName, userEmail: user?.email,
         orderItem: selectedProperty
      };
      fetch('https://rocky-thicket-09241.herokuapp.com/placeOrder', {
         method: 'POST',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify(orderItem)
      })
         .then(res => res.json())
         .then(data => {
            console.log(data);
            if (data.acknowledged) {
               Swal.fire({
                  position: 'top-center',
                  icon: 'success',
                  title: 'Order Place Successfully',
                  // showConfirmButton: false,
                  timer: 2500
               })
            }
         })
   }

   return (
      <>
         <Box>
            <Container>
               <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600', color: '#F2184F' }} variant="h3">Order</Typography>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600' }} variant="h3">{user?.displayName}</Typography>
               </Box>
               <form onSubmit={handleSubmit}>
                  <Paper elevation={3} sx={{ padding: '25px', maxWidth: '850px', margin: '0 auto' }}>
                     <Box>
                        <Typography sx={{ fontSize: '25px', fontWeight: '500', mb: 2 }} variant="h3">Name</Typography>
                        <TextField defaultValue={user?.displayName} type="text" sx={{ mb: 2 }} fullWidth label="Name" />
                     </Box>

                     <Box>
                        <Typography sx={{ fontSize: '25px', fontWeight: '500', mb: 2 }} variant="h3">Email</Typography>
                        <TextField defaultValue={user?.email} type="email" sx={{ mb: 2 }} fullWidth label="Email" />
                     </Box>

                     <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: '25px', fontWeight: '500', mb: 2 }} variant="h3">Service</Typography>
                        {/* <TextField type="text" sx={{ mb: 2 }} fullWidth label="Service" /> */}
                        <FormControl fullWidth>
                           <InputLabel id="demo-simple-select-label">Select Service</InputLabel>
                           <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={bookingService}
                              defaultValue={selectedProperty.name}
                              label="Select Service"
                              onChange={(e) => handleChange(e.target.value)}
                           >

                              {
                                 properties.map(propertyItem => <MenuItem key={propertyItem._id}
                                    value={propertyItem?.name}> {propertyItem?.name}
                                 </MenuItem>)
                              }
                           </Select>
                        </FormControl>
                     </Box>

                     {selectedProperty?.price && <Box sx={{ my: 3 }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: '400' }}
                           variant="h3">Your Service charge will be ${selectedProperty?.price}</Typography>
                     </Box>}  

                      <Elements stripe={stripePromise}>
                        <CheckoutForm singleProperty={selectedProperty}></CheckoutForm>
                     </Elements>

                     <Box sx={{ textAlign: 'center',mt:2 }}>
                        <MuiButton type='submit' variant="contained">Place Order</MuiButton>
                     </Box>
                  </Paper>
               </form>
            </Container>
         </Box>
      </>
   );
};

export default Order;