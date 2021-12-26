import { Container, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import MuiButton from '../../../../Components/StyledComponents/MuiButton';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating';

const Review = () => {
   const {user} = useAuth();
   const [name,setName] = useState(user.displayName);
   const [email,setEmail] = useState(user.email);
   const [description,setDescription] = useState('');
   // const [rating,setRating] = useState('');
   const [ratings, setRatings] = useState(0);

     // Catch Rating value
  const handleRating = (rate) => {
   setRatings(rate)
   // other logic
   console.log(rate)
 }

   const handleSubmit = e => {
      e.preventDefault();
      const review = {name,email,description,ratings};
      console.log(review)
      fetch('https://rocky-thicket-09241.herokuapp.com/review',{
         method:'POST',
         headers:{
            'content-type': 'application/json'
         },
         body:JSON.stringify(review)
      })
      .then(res => res.json())
      .then(data => {
         console.log(data)
         if(data.acknowledged){
            Swal.fire({
               position: 'top-center',
               icon: 'success',
               title: 'Review Add Successfully',
               // showConfirmButton: false,
               timer: 2500
             })
         }
      })
   };

   const tooltipArray = [
      'Terrible',
      'Terrible+',
      'Bad',
      'Bad+',
      'Average',
      'Average+',
      'Great',
      'Great+',
      'Awesome',
      'Awesome+'
    ]

   return (
      <>
         <Box>
            <Container>
               <Box sx={{ my: 4,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600',color:'#F2184F'}} variant="h3">Review</Typography>
                  <Typography sx={{ fontSize: '25px', fontWeight: '600' }} variant="h3">{user?.displayName}</Typography>
               </Box>
               <form onSubmit={handleSubmit}>
                  <Paper elevation={3} sx={{ padding: '25px', maxWidth: '850px', margin: '0 auto' }}>
                     <Box>
                        <Typography sx={{ fontSize: '25px', fontWeight: '500', mb: 2 }} variant="h3">Name</Typography>
                        <TextField defaultValue={user?.displayName} onBlur={e => setName(e.target.value)} type="text" 
                        sx={{ mb: 2 }} required fullWidth  />
                     </Box>

                     <Box>
                        <Typography sx={{ fontSize: '25px', fontWeight: '500', mb: 2 }} variant="h3">Email</Typography>
                        <TextField defaultValue={user?.email} onBlur={e => setEmail(e.target.value)} type="email" required sx={{ mb: 2 }} fullWidth />
                     </Box>

                     <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontSize: '25px', fontWeight: '500', mb: 2 }} variant="h3">Description</Typography>
                        <textarea onBlur={e => setDescription(e.target.value)} required style={{ padding: '15px', width: '100%',fontSize:'17px',border:'1.5px solid #ccc' }} type="text" rows={7} placeholder='Description' />
                     </Box>

                     <Rating onClick={handleRating} tooltipArray={tooltipArray} 
                     allowHalfIcon showTooltip ratingValue={ratings} />

                     <Box sx={{ textAlign: 'center' }}>
                        <MuiButton type="submit" variant="contained">Save</MuiButton>
                     </Box>
                  </Paper>
               </form>
            </Container>
         </Box>
      </>
   );
};

export default Review;