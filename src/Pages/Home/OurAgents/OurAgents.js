import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import agents_1 from '../../../img/apartment-agent-1.jpg';
import agents_2 from '../../../img/apartment-agent-2.jpg';
import agents_3 from '../../../img/apartment-agent-3.jpg';
import agents_4 from '../../../img/apartment-agent-4.jpg';
import { Facebook, LinkedIn, Twitter } from '@mui/icons-material';

const OurAgents = () => {

  const useStyles = makeStyles({
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
    agentsDetails: {
      // position: 'relative',
      // background: 'orange',
      // textAlign: 'center',
    },
    socialLinks: {
      fontSize:'25px !important'
    }
  });
  const { sec_title, agentsDetails, socialLinks } = useStyles();

  const agentsData = [
    {
      id: 1,
      img: agents_1,
      name: 'Andrew Smith',
      role: 'Real Estate Agent',
      text: 'View Details',
      icon_1: <Facebook className={socialLinks} />,
      icon_2: <Twitter className={socialLinks} />,
      icon_3: <LinkedIn className={socialLinks} />,
    },
    {
      id: 2,
      img: agents_2,
      name: 'John Anderson',
      role: 'Real Estate Agent',
      text: 'View Details',
      icon_1: <Facebook className={socialLinks} />,
      icon_2: <Twitter className={socialLinks} />,
      icon_3: <LinkedIn className={socialLinks} />,
    },
    {
      id: 3,
      img: agents_3,
      text: 'View Details',
      name: 'Uddin Smith',
      role: 'Real Estate Agent',
      icon_1: <Facebook className={socialLinks} />,
      icon_2: <Twitter className={socialLinks} />,
      icon_3: <LinkedIn className={socialLinks} />,
    },
    {
      id: 4,
      img: agents_4,
      text: 'View Details',
      name: 'Mamun Smith',
      role: 'Real Estate Agent',
      icon_1: <Facebook className={socialLinks} />,
      icon_2: <Twitter className={socialLinks} />,
      icon_3: <LinkedIn className={socialLinks} />,
    },
  ]

  
  return (
    <>
      <Box sx={{ padding: '0px 0 100px' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 5 }} data-aos="fade-up">
            <Typography className={sec_title} variant="h3">Our Agents</Typography>
          </Box>
          <Box sx={{ pt: 5 }}>
            <Grid container spacing={2}>
              {
                agentsData.map(agent => <Grid key={agent.id} item xs={12} md={4} lg={3}  data-aos="fade-up">
                  <Box sx={{ borderRadius: '8px' }}>
                    <Paper className={agentsDetails} sx={{ borderRadius: '8px',paddingBottom:'10px' }}>
                      <img style={{width:'100%',height:'350px',borderTop:'3px solid #F2184F'}} src={agent.img} alt="" />
                      <Box sx={{textAlign:'center'}}>
                        <Typography sx={{fontSize:'24px',color:'#F2184F',my:1}} variant="h4">{agent.name}</Typography>
                        <Typography sx={{fontSize:'18px'}} variant="body1">-{agent.role}-</Typography>
                      </Box>
                      <Box className={socialLinks}>
                        <Box sx={{textAlign:'center',my:2}}>
                          <a href="/"><i style={{ color: '#202C45', display: 'inline-block', marginRight: '12px' }}>{agent.icon_1}</i></a>
                       <a href="/"><i style={{ color: '#202C45', display: 'inline-block', marginRight: '12px' }}>{agent.icon_2}</i></a>
                          <a href="/"><i style={{ color: '#202C45', display: 'inline-block', marginRight: '12px' }}>{agent.icon_3}</i></a>
                        </Box>
                      </Box>

                    </Paper>

                  </Box>
                </Grid>)
              }
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default OurAgents;