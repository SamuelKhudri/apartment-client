import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import blog_1 from '../../../img/blog_1.jpg';
import blog_2 from '../../../img/blog_2.jpg';
import blog_3 from '../../../img/blog_3.jpg';

const Blog = () => {
   const blogData = [
      {
         id: 1,
         img: blog_1,
         date: 'February 17, 2021',
         desc: 'Power Of Music MA Art and Design Student'
      },
      {
         id: 2,
         img: blog_2,
         date: 'May 7, 2021',
         desc: 'Travel The World Week can be a daunting but exciting'
      },
      {
         id: 3,
         img: blog_3,
         date: 'April 12, 2021',
         desc: 'Contrast Of Nature Project aim'
      },
   ];

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
      }
   });
   const { sec_title } = useStyle();
   return (
      <>
         <Box sx={{ padding: '0px 0 100px' }}>
            <Container maxWidth="xl">
               <Box sx={{ textAlign: 'center', mb: 5 }} data-aos="fade-up">
                  <Typography className={sec_title} variant="h3"> Blog</Typography>
               </Box>

               <Grid container spacing={2} sx={{ paddingTop: '50px' }}>
                  {
                     blogData.map(blog => <Grid key={blog.id} item xs={12} md={6} lg={4} data-aos="fade-up">
                        <Card>
                           <CardActionArea>
                              <CardMedia
                                 component="img"
                                 height="300"
                                 image={blog.img}
                                 alt="green iguana"
                              />
                              <CardContent>
                                 <Typography sx={{color:'#F3184F'}} gutterBottom variant="body1" component="div">
                                    {blog.date}
                                 </Typography>
                                 <Typography sx={{fontSize:'18px'}} variant="h5" color="text.secondary">
                                    {blog.desc}
                                 </Typography>
                              </CardContent>
                           </CardActionArea>
                        </Card>
                     </Grid>)
                  }
               </Grid>
            </Container>
         </Box>
      </>
   );
};

export default Blog;