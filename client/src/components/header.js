import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import firebase, { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { AppBar, CssBaseline, Toolbar, Typography, InputBase, Menu, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Header = () => {

    const classes = useStyles();

    const [users, setUsers] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        db.collection(`users`).onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()))
        });
    }, [])
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const history = useHistory();

    const handleLogout = () =>{
        firebase.auth().signOut();
        history.push('/');
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMenuOpen} onClose={handleMenuClose} >
            {
                users.map(
                    (user)=>{
                        if(user.uid === currentUser.uid)
                            return (<MenuItem onClick={handleMenuClose}>{user.name}</MenuItem>)
                    }
                )
            }
            <MenuItem onClick={()=>{handleLogout();}}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose} >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <>
        <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} elevation={0}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
                        <MoreHorizIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Microsoft Teams
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase placeholder="Search" classes={{ root: classes.inputRoot, input: classes.inputInput }} inputProps={{ 'aria-label': 'search' }}/>
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {
                            users.map(
                                (user)=>{
                                    if(user.uid === currentUser.uid)
                                        return (<Typography variant='h6' style={{marginTop: '5%'}}>{user.name}</Typography>)
                                }
                            )
                        }
                        <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            
            {renderMobileMenu}
            {renderMenu}
        </>
    )
}

export default Header;
