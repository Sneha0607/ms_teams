import React from 'react';
import useStyles from './styles';
import { Typography, Grid, GridListTile, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { IconButton, AppBar, Button, Container, Toolbar } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import CastForEducationOutlinedIcon from '@material-ui/icons/CastForEducationOutlined';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import Navbar from './navbar';
import Footer from './footer';

const Home = () => {
    const classes = useStyles();

    return (
        <>
        {/*Navbar*/}
        <Navbar />

        {/*Tagline and default image*/}

        <div className={classes.homeRoot}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} className={classes.paper} style={{backgroundColor: '#f5f5f5'}}>
                <Typography variant='h3' className={classes.homeTitle}>
                  Teams
                </Typography>
                <Typography variant='h4' className={classes.tagLine}>
                  Meet, chat, call, and collaborate in just one place.
                </Typography>
                <List>
                  <ListItem>
                    <Button variant='contained' className={classes.signupButton} href='/signup'>Sign up for free</Button>
                  </ListItem>
                  <ListItem>
                    <Button variant='outlined' className={classes.signinButton} href='/signin'>Sign in</Button>
                  </ListItem>
                </List>  
            </Grid>
            <Grid item xs={12} sm={6}>
              <GridListTile >
                <img className={classes.img} src={process.env.PUBLIC_URL + 'images/home1.jpg'} alt="teams"/>
              </GridListTile>
            </Grid>        
          </Grid>

          <br/><br/><br/>

          {/*Intoduction to Teams*/}
          
          <Typography align='center' variant='h4' style={{padding: '1%', fontWeight: 'bold'}}>
            Teams is for everyone
          </Typography>
          <Typography align='center' style={{fontSize: '1rem', padding: '1%', margin: '1%'}}>
            Whether it’s chat, calls, or video, anyone can engage at any time, bringing everyone closer.<br/>         
            Your docs, photos, videos, chat history, and meeting notes are always there, so it’s easier to work together.<br/>        
            Set up your team’s space with all the apps you need so you can stay in just one place instead of jumping around.<br/>         
          </Typography>

          {/*Work, Home & School*/}

          <Container maxWidth='lg'>
            <Grid container justify='center' spacing={0}> 
              <Grid item xs={6} md={6} lg={6}>
                <img style={{height: '100vh', width: '43vw'}} src={process.env.PUBLIC_URL + 'images/work.jpg'} alt="work"/>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <img style={{height: '54vh', width: '47vw', padding: '0'}} src={process.env.PUBLIC_URL + 'images/home.jpg'} alt="home"/>
                <img style={{height: '45vh', width: '47vw', padding: '0'}} src={process.env.PUBLIC_URL + 'images/school.jpg'} alt="school"/>
              </Grid>
            </Grid>
          </Container>

          {/*About Functionalities*/}

          <Typography align='center' variant='h3' style={{padding: '1%', fontWeight: 'bold', marginTop: '5vh', marginBottom: '3vh'}}>
            CHAT - CALL - COLLABORATE
          </Typography>

          <Container maxWidth='lg'>
            <Grid container justify='center' spacing={0}> 
              <Grid item xs={6} md={6} lg={6}>
                <img style={{height: '54vh', width: '47vw', padding: '0'}} src={process.env.PUBLIC_URL + 'images/collaborate.jpg'} alt="collaborate"/>
                <img style={{height: '45vh', width: '47vw', padding: '0'}} src={process.env.PUBLIC_URL + 'images/call.jpg'} alt="call"/>
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <img style={{height: '100vh', width: '43vw'}} src={process.env.PUBLIC_URL + 'images/chat.jpg'} alt="chat"/>
              </Grid>
            </Grid>
          </Container>
          
          {/*Home, Business, Enterprise and Education Section*/}

          <Grid container spacing={0} style={{backgroundColor: '#4b53bc', marginTop: '5%'}}>
            <Grid item xs={12} sm={6} className={classes.paper}>
              <Typography variant='h4' style={{fontWeight: 'medium', color: '#ffffff'}}>
                Get started with Teams today
              </Typography>
              <Button variant='contained' className={classes.footerSignupButton} href='/signup'>Sign up for free</Button>
              <Button variant='outlined' className={classes.footerSigninButton} href='/signin'>Sign in</Button>   
            </Grid>
            <Grid item xs={12} sm={6}>
              <List component='nav'>
                <ListItem>
                  <ListItemIcon>
                    <HomeOutlinedIcon className={classes.listIcon}/>
                  </ListItemIcon>
                  <ListItemText primary='Home' className={classes.listText}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <HomeWorkOutlinedIcon className={classes.listIcon}/>
                  </ListItemIcon>
                  <ListItemText primary='Business' className={classes.listText}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <BusinessOutlinedIcon className={classes.listIcon}/>
                  </ListItemIcon>
                  <ListItemText primary='Enterprise' className={classes.listText}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CastForEducationOutlinedIcon className={classes.listIcon}/>
                  </ListItemIcon>
                  <ListItemText primary='Education' className={classes.listText}/>
                </ListItem>
              </List>
            </Grid>        
          </Grid>

          {/*Social Media Links*/}

          <AppBar position='static' style={{backgroundColor: '#ffffff'}}>
            <Toolbar>
              <Typography variant='h6' style={{padding: '4%', fontWeight: 'bold', color: '#000000'}}>
                Developed by Sneha Singh
                <p>Follow me</p>
              </Typography>
              <IconButton style={{color: '#000000'}} href='https://www.linkedin.com/in/snehasingh2001/'><LinkedInIcon/></IconButton>
              <IconButton style={{color: '#000000'}} href='https://twitter.com/sneha_0607'><TwitterIcon/></IconButton>
            </Toolbar>
          </AppBar>
          
        {/*Footer*/}
        <Footer />
        </div>
        </>
    )
}

export default Home;