import React from 'react';
import useStyles from './styles';
import firebase from '../firebase';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Drawer, AppBar, CssBaseline, Toolbar, Typography, ListItemIcon } from '@material-ui/core';
import { MenuList, MenuItem, InputBase, Menu, Tooltip } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import GroupIcon from '@material-ui/icons/Group';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import CallIcon from '@material-ui/icons/Call';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


const Sidebar = () => {
    const classes = useStyles();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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
            <MenuItem onClick={handleMenuClose}>{name}</MenuItem>
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

    const getUserProfile = () =>  {
        const user = firebase.auth().currentUser;
        try {
          axios.get('http://localhost:5000/userprofile/'+ user.uid).then(res =>{
            setName(res.data.name);
            setEmail(res.data.email);
          });
         } catch (error) {
           
         }

    }

    useEffect(()=>{
      getUserProfile();
    }, []);


    return (
        <div className={classes.root}>
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
                        <Typography variant='h6'>{name}</Typography>
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
            
            <Drawer className={classes.drawer} variant="permanent" classes={{   paper: classes.drawerPaper, }}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <MenuList>
                        <MenuItem button className={classes.menuItem} component='a' href='/activity'>
                            <ListItemIcon>
                                <Tooltip title='Activity' placement='right'>
                                    <NotificationsIcon className={classes.icons}/>
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem button className={classes.menuItem} component='a' href='/chat'>
                            <ListItemIcon>
                                <Tooltip title='Chat' placement='right'>
                                    <MessageIcon className={classes.icons}/>
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem button className={classes.menuItem} component='a' href='/teams'>
                            <ListItemIcon>
                                <Tooltip title='Teams' placement='right'>
                                    <GroupIcon className={classes.icons}/>
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem button className={classes.menuItem} component='a' href='/assignments'>
                            <ListItemIcon>
                                <Tooltip title='Assignments' placement='right'>
                                    <AssignmentIcon className={classes.icons}/>
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem button className={classes.menuItem} component='a' href='/calendar'>
                            <ListItemIcon>
                                <Tooltip title='Calendar' placement='right'>
                                    <DateRangeIcon className={classes.icons}/>
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem button className={classes.menuItem}>
                            <ListItemIcon>
                                <Tooltip title='Calls' placement='right'>
                                    <CallIcon className={classes.icons}/>
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>

                        <MenuItem button className={classes.menuItem}>
                            <ListItemIcon>
                                <Tooltip title='More' placement='right'>
                                    <MoreHorizIcon className={classes.icons} />
                                </Tooltip>
                            </ListItemIcon>
                        </MenuItem>
                    </MenuList>
                </div>
            </Drawer>
        </div>
      );
}

export default Sidebar;