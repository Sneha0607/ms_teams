import React from 'react';
import useStyles from './styles';
import { Typography, Button, Grid, GridListTile, List, ListItem, ListItemIcon, Container, ListItemText } from '@material-ui/core';
import Navbar from './navbar';
import Footer from './footer';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import CastForEducationOutlinedIcon from '@material-ui/icons/CastForEducationOutlined';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import BorderColorIcon from '@material-ui/icons/BorderColor';

const Home = () => {
    const classes = useStyles();

    return (
        <>
        {/*Navbar inserted*/}
        <Navbar />

        {/*Tagline and default image*/}

        <div className={classes.homeRoot}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} className={classes.paper}>
                <Typography variant='h3' className={classes.homeTitle}>
                  Microsoft Teams
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
                <img className={classes.img} src={process.env.PUBLIC_URL + 'images/home1.jpg'} alt="example"/>
              </GridListTile>
            </Grid>        
          </Grid>

          <br/><br/><br/>

          {/*Intoduction to MS Teams*/}
          
          <Typography align='center' variant='h4' style={{padding: '1%', fontWeight: 'bold'}}>
            Microsoft Teams is for everyone
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

          {/*About Chat Functionality*/}

          <img style={{height: '78vh', width: '100vw', marginTop: '10%'}} src={process.env.PUBLIC_URL + 'images/chat.png'} alt="chat"/>

          <br/><br/>
          <Container maxWidth='md'>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={6}>
                <Typography variant='h4' style={{fontWeight: 'bold'}}>
                  Chat
                 </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography style={{fontSize: '1rem'}}>
                  Share your opinion and have fun with your team. Send GIFs, stickers, and emojis in a group chat or in one-to-one messages.
                </Typography>
              </Grid>        
            </Grid>
          </Container>

          {/*About Meet Functionality*/}

          <img style={{height: '78vh', width: '100vw', marginTop: '5%'}} src={process.env.PUBLIC_URL + 'images/meet.png'} alt="meet"/>

          <br/><br/>
          <Container maxWidth='md'>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={6}>
                <Typography variant='h4' style={{fontWeight: 'bold'}}>
                  Meet
                 </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography style={{fontSize: '1rem'}}>
                  Instantly go from group chat to video conference with the touch of a button. Teams of two or 10,000 can meet in one place from anywhere.
                </Typography>
              </Grid>        
            </Grid>
          </Container>

          {/*About Call Functionality*/}

          <img style={{height: '78vh', width: '100vw', marginTop: '5%'}} src={process.env.PUBLIC_URL + 'images/call.png'} alt="call"/>

          <br/><br/>
          <Container maxWidth='md'>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={6}>
                <Typography variant='h4' style={{fontWeight: 'bold'}}>
                  Call
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography style={{fontSize: '1rem'}}>
                  Make and receive calls directly in Microsoft Teams with advanced features like group calling, cloud voicemail, and call transfers.
                </Typography>
              </Grid>        
            </Grid>
          </Container>

          {/*About Collaborate Functionality*/}

          <img style={{height: '78vh', width: '100vw', marginTop: '5%'}} src={process.env.PUBLIC_URL + 'images/collaborate.png'} alt="collaborate"/>

          <br/><br/>
          <Container maxWidth='md'>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={6}>
                <Typography variant='h4' style={{fontWeight: 'bold'}}>
                  Collaborate
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography style={{fontSize: '1rem'}}>
                  Easily find, share, and edit files in real time using familiar apps like Word, PowerPoint, and Excel in Microsoft Teams.
                </Typography>
              </Grid>        
            </Grid>
          </Container>

          <br/><br/>

          {/*Home, Business, Enterprise and Education Section*/}

          <Grid container spacing={0} style={{backgroundColor: '#4b53bc', marginTop: '5%'}}>
            <Grid item xs={12} sm={6} className={classes.paper}>
              <Typography variant='h4' style={{fontWeight: 'medium', color: '#ffffff'}}>
                Get started with Microsoft Teams today
              </Typography>
              <Button variant='contained' className={classes.footerSignupButton} href='/signup'>Sign up for free</Button>
              <Button variant='outlined' className={classes.footerSigninButton} color='/signin'>Sign in</Button>   
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

          <Typography variant='h6' style={{padding: '4%', fontWeight: 'bold'}}>Follow Microsoft 365</Typography>
          
        {/*Footer inserted*/}
        <Footer />
        </div>
        </>
    )
}

export default Home;