import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const SingleProperty = ({property}) => {
    const {setSelectedProperty} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleProperty = () => {
        setSelectedProperty(property)
        navigate('/dashboard/order');
    }
    return (
        <>
            {
                    <Grid key={property._id} item xs={12} md={6} xl={4} data-aos="fade-up">
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
                             
                                 <Button onClick={handleProperty} variant="contained" color="primary"> Buy </Button>
                             
                           </CardActions>
                        </Card>
                     </Grid>
                  } 
        </>
    );
};

export default SingleProperty;