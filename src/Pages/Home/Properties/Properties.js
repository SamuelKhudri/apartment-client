import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import MuiButton from '../../../Components/StyledComponents/MuiButton';
import SingleProperty from './SingleProperty';


const Properties = () => {
   const [properties, setProperties] = useState([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      fetch('https://rocky-thicket-09241.herokuapp.com/properties')
         .then(res => res.json())
         .then(data => {
            setProperties(data);
            // console.log(data)
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
   }
   return (
      <>
         <Box sx={{ padding: '0 0 100px' }}>
            <Container maxWidth="xl">
               <Box sx={{ textAlign: 'center', mb: 5 }} data-aos="fade-up">
                  <Typography className={sec_title} variant="h3"> Properties for Sale</Typography>
               </Box>

               <Grid container spacing={2} sx={{ paddingTop: '50px' }}>
                 {
                    properties.map(property => <SingleProperty key={property?._id} property={property}></SingleProperty>)
                 }
               </Grid>
               <Box sx={{textAlign:'center',mt:3}}>
                  <Link to="/allProperties"><MuiButton variant='contained'>All Properties</MuiButton></Link>
               </Box>
            </Container>
         </Box>
      </>
   );
};

export default Properties;