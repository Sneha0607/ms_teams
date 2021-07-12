import React from 'react';
import useStyles from './styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Marquee from "react-fast-marquee";

const Navbar = () => {

    const classes = useStyles();

    return(
        <div className={classes.navbarRoot}>

            {/* NAVBAR */}

            <AppBar className={classes.navbar} elevation={0} position="static">
                <Toolbar>
                    <img className={classes.logo} src={process.env.PUBLIC_URL + 'images/teams.png'} alt="logo"/>
                    <img src={process.env.PUBLIC_URL + 'images/vertical.png'} alt="vertical_line"/>
                    <Typography variant="h6" className={classes.navbarTitle}>
                        Teams
                    </Typography>
                    <Button className={classes.navbarButton} color="inherit" href='/signup'>Sign up</Button>
                    <Button className={classes.navbarButton} color="inherit" href='/signin'>Sign in</Button>
                </Toolbar>
            </AppBar>

            {/* MARQUEE SECTION */}

            <AppBar className={classes.blueBox} elevation={0} position='static'>
                <Marquee speed={50} gradient={false}>
                <Typography className={classes.blueTag}>
                    Now use Teams with family and friends to call, chat, and make plans.
                </Typography>
                </Marquee>
            </AppBar>
        </div>
    );
}

export default Navbar;