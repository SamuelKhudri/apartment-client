import { Box, CircularProgress, Container, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Rating } from 'react-simple-star-rating';

const Testimonial = () => {
   const [testimonials, setTestimonials] = useState([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      fetch('https://rocky-thicket-09241.herokuapp.com/review')
         .then(res => res.json())
         .then(data => {
            // console.log(data);
            setTestimonials(data)
            setLoading(false)
         })
   }, []);

   const useStyle = makeStyles({
      sec_title: {
         display: 'inline-block',
         fontSize: '28px',
         fontWeight: '600',
         position: 'relative',
         '&::before': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px',
            background: '#F3184F',
            left: 0,
            bottom: '-10px',
         }
      },
      circular: {
         textAlign: 'center'
      }
   });
   const { sec_title, circular } = useStyle();
   if (loading) {
      return <Box className={circular}>
         <CircularProgress></CircularProgress>
      </Box>
   };

   // slider
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive:[
         {
           breakpoint: 1024,
           settings: {
             slidesToShow: 2,
             slidesToScroll: 2,
             infinite: true,
             dots: true
           }
         },
         {
           breakpoint: 768,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1,
             initialSlide: 1
           }
         },
         {
           breakpoint: 576,
           settings: {
             slidesToShow: 1,
             slidesToScroll: 1
           }
         }
       ]
   };
   return (
      <>
         <Box sx={{ padding: '0 0 100px' }}>
            <Container maxWidth="xl">
               <Box sx={{ textAlign: 'center', mb: 5 }} data-aos="fade-up">
                  <Typography className={sec_title} variant="h3"> Testimonial</Typography>
               </Box>

               
               <Slider {...settings}>
                  
                     {
                        testimonials.map(testimonial => <Box key={testimonial._id} data-aos="fade-up">
                           <Paper sx={{ padding: '15px',margin:'15px' }}>
                              <Typography variant="body1">
                                 {testimonial?.description}
                              </Typography>
                              <Typography sx={{my:1}} variant='h5'>
                                 {testimonial?.name}
                              </Typography>
                              <Rating readonly size={30} ratingValue={testimonial?.ratings} />
                           </Paper>
                        </Box>)
                     }
                  
               </Slider>
            </Container>
         </Box>
      </>
   );
};

export default Testimonial;