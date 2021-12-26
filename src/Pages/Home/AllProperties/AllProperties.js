import {
   Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress,
   Container, Grid, Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import React, { useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import useProperties from '../../../hooks/useProperties';
import Navigation from '../Navigation/Navigation';

const AllProperties = () => {
   const { properties, loading } = useProperties();

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
   // if (loading) {
   //    return <Box className={circular}>
   //       <CircularProgress></CircularProgress>
   //    </Box>
   // }
   return (
      <>
         <Box sx={{ height: '70px', background: '#122033' }}><Navigation></Navigation></Box>
         <Box sx={{ padding: '100px 0 100px' }}>
            <Container maxWidth="xl">
               <Box sx={{ textAlign: 'center', mb: 5 }} data-aos="fade-up">
                  <Typography className={sec_title} variant="h3">All Properties</Typography>
               </Box>

               {loading && <Box className={circular}>
                     <CircularProgress></CircularProgress>
                  </Box>
               }

               <Grid container spacing={2} sx={{ paddingTop: '50px' }}>
                  {
                     properties.map(property => <Grid key={property._id} item xs={12} md={6} xl={4} data-aos="fade-up">
                        <Card >
                           <CardActionArea>
                              <CardMedia
                                 component="img"
                                 height="240"
                                 image={`data:image/jpeg;base64,${property.image}`}
                                 alt="green iguana"
                              />
                              <CardContent>
                                 <Typography gutterBottom variant="h5" component="div">
                                    {property.name}
                                 </Typography>
                                 <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                 </Typography>
                              </CardContent>
                           </CardActionArea>
                           <CardActions>
                              <Link to={`/dashboard/bookOrder/${property._id}`}>
                                 <Button variant="contained" color="primary"> Buy </Button>
                              </Link>
                           </CardActions>
                        </Card>
                     </Grid>)
                  }
               </Grid>
            </Container>
         </Box>
      </>
   );
};

export default AllProperties;