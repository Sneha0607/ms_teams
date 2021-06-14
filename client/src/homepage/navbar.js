import React from 'react';
import useStyles from './styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const Navbar = () => {
    const classes = useStyles();

    return(
        <div className={classes.navbarRoot}>
            <AppBar className={classes.navbar} elevation={0} position="static">
                <Toolbar>
                    <img className={classes.logo} src={process.env.PUBLIC_URL + 'images/ms_logo.jpg'} alt="ms_logo"/>
                    <img src={process.env.PUBLIC_URL + 'images/vertical.png'} alt="vertical_line"/>
                    <Typography variant="h6" className={classes.navbarTitle}>
                        Teams
                    </Typography>
                    <Button className={classes.navbarButton} color="inherit" href='/signup'>Sign up</Button>
                    <Button className={classes.navbarButton} color="inherit" href='/signin'>Sign in</Button>
                </Toolbar>
            </AppBar>

            <AppBar className={classes.blueBox} elevation={0} position='static'>
                <Typography className={classes.blueTag}>
                    Now use Microsoft Teams with family and friends to call, chat, and make plans.
                </Typography>
            </AppBar>
        </div>
    );
}

export default Navbar;