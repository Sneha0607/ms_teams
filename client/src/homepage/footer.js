import React from 'react';
import { AppBar, Container, Grid, List, ListItem, Typography } from '@material-ui/core';
import useStyles from './styles';

const Footer = () => {

    const classes = useStyles();

    return (
        <AppBar position="static" style={{backgroundColor:'#f2f2f2'}} elevation={0}>
          <Container maxWidth="lg">
            <Grid container>         
                <Grid item xs={12} md={4} lg={2}>
                    <List>
                        <ListItem>
                            <Typography className={classes.footerHeading}>What's New</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>My 365</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Surface Pro X</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Surface Pro X</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Surface Laptop 3</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Windows 10 apps</Typography>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} md={4} lg={2}>
                    <List>
                        <ListItem>
                            <Typography className={classes.footerHeading}>My Store</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Account profile</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Download Center</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>My Store Support</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Returns</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Order tracking</Typography>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} md={4} lg={2}>
                    <List>
                        <ListItem>
                            <Typography className={classes.footerHeading}>Education</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>My in education</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Office for students</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Office 365 for schools</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>My Azure in education</Typography>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} md={4} lg={2}>
                    <List>
                        <ListItem>
                            <Typography className={classes.footerHeading}>Enterprise</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>AppSource</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Automotive</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Government</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Healthcare</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Manufacturing</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Financial Services</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Retail</Typography>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} md={4} lg={2}>
                    <List>
                        <ListItem>
                            <Typography className={classes.footerHeading}>Developer</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>My Visual Studio</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Developer Center</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Channel 9</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Office Dev Center</Typography>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} md={4} lg={2}>
                    <List>
                        <ListItem>
                            <Typography className={classes.footerHeading}>Company</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Careers</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>About Microsoft</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Company news</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Privacy</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Investors</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.footerList}>Security</Typography>
                        </ListItem>
                    </List>
                </Grid>

            </Grid>
          </Container>
        </AppBar>
    )
}

export default Footer;
