import { Container, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MuiButton from '../../../../Components/StyledComponents/MuiButton';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
// import Payment from '../../../../Components/Payment/Payment';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from '../../../../Components/Payment/CheckoutForm';

const BookOrder = () => {
   const { id } = useParams();
   const [loading,setLoading] = useState(true);
   console.log(loading)
   // stripe
   // const stripePromise = loadStripe('pk_test_51Jw2byBqVzzz64BlCZzYZ8HXFBqE7Hmj4CxvSDtuKeTncwolp3eVFp2JaXPnUXqSdcZMd7wAOVdBPrKVRzE35TgM00EfbTYyUQ');
   // service value
   const [serviceState, setServiceState] = useState('');
   const handleChange = e => {
      setServiceState(e.target.value)
   }
   console.log(serviceState)
   // use auth
   const { user } = useAuth();
   // single property
   const [singleProperty, setSingleProperty] = useState({});
   // data load
   useEffect(() => {
      fetch(`https://rocky-thicket-09241.herokuapp.com/property/${id}`)
         .then(res => res.json())
         .then(data => {
            // console.log(data);
            setSingleProperty(data)
            setLoading(false)
         })
   }, [id]);
   // post data
  
   const handleSubmit = e => {
      e.preventDefault();
      const orderItem = { userName: user?.displayName, userEmail: user?.email, orderItem: singleProperty };
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
               <Box sx={{ my: 4,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600',color:'#F2184F' }} variant="h3">Order</Typography>
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

                     <Box>
                        <Typography sx={{ fontSize: '25px', fontWeight: '500', mb: 2 }} variant="h3">Service</Typography>
                        <TextField type="text" value={singleProperty?.name}
                           onChange={handleChange} sx={{ mb: 2 }} fullWidth />
                     </Box>

                     {singleProperty?.price && <Box sx={{my:2}}>
                        <Typography sx={{ fontSize: '18px', fontWeight: '400'}} 
                        variant="h3">Your Service charge will be ${singleProperty?.price}</Typography>
                     </Box>}

                     <Box sx={{ textAlign: 'center' }}>
                        <MuiButton type='submit' variant="contained">Place Order</MuiButton>
                     </Box>
                  </Paper>
               </form>

               {/* {singleProperty?.price && <Elements stripe={stripePromise}>
                  <CheckoutForm singleProperty={singleProperty}></CheckoutForm>
               </Elements>} */}
            </Container>
         </Box>
      </>
   );
};

export default BookOrder;