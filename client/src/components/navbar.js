import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase, { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import clsx from 'clsx';
import useStyles from './styles';
import { useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Typography, CssBaseline, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem,
  Divider, InputBase, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import GroupIcon from '@material-ui/icons/Group';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import HelpIcon from '@material-ui/icons/Help';
import Avatar from 'react-avatar';
import Speech from 'react-speech';

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const history = useHistory();
  const { currentUser } = useAuth();

  //LOGOUT FUNCTION
  const handleLogout = () =>{
    firebase.auth().signOut();
    history.push('/');
  };

  //FUNCTIONS TO EXPAND AND COLLAPSE SIDEBAR
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //FETCHING USERS DATA FROM DATABASE
  useEffect(() => {
      db.collection(`users`).onSnapshot(snapshot => {
          setUsers(snapshot.docs.map(doc => doc.data()))
      });
  }, [])

  //FUNCTIONS TO OPEN AND CLOSE PROFILE MENU
  const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMenuOpen} onClose={handleMenuClose} >
        {
            users.map(
                (user)=>{
                    if(user.uid === currentUser.uid)
                        return (<MenuItem onClick={handleMenuClose} key={user.uid}>{user.name}</MenuItem>)
                }
            )
        }
        {/* LOGOUT USER */}
        <MenuItem onClick={()=>{handleLogout();}}>Logout</MenuItem>
    </Menu>
  );

  //TEXT FOR VOICE ASSISTANT OF GUIDE SECTION
  const text = "Hello user!You can utilize this sidebar to navigate through the various features of this app!Try all of these and enjoy! Do share your feedback in the community chat section! Thank you!";

  return (
    <div className={classes.navbarRoot}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        className={clsx(classes.navbar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.titleText}>
            Teams
          </Typography>

          {/* SEARCH BAR */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase placeholder="Search" classes={{ root: classes.inputRoot, input: classes.inputInput }} inputProps={{ 'aria-label': 'search' }}/>
          </div>

          {/* USER INFORMATION */}
          <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {
                users.map(
                    (user)=>{
                        if(user.uid === currentUser.uid)
                          return (
                          <IconButton edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                            <Avatar name={user.name} size='40' textSizeRatio={1.75} round={true}/>
                          </IconButton>
                          )
                    }
                )
              }
            </div>
        </Toolbar>
      </AppBar>

      {renderMenu}

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />

        <List>
            <ListItem button component='a' href='/activity'>
              <Tooltip title='Activity' placement='right'>
                <ListItemIcon className={classes.icons}>
                  <NotificationsIcon/>
                </ListItemIcon>
              </Tooltip>
              <ListItemText>Activity</ListItemText>
            </ListItem>

            <ListItem button component='a' href='/chat'>
              <Tooltip title='Community Chat' placement='right'>
                <ListItemIcon className={classes.icons}>
                  <MessageIcon/>
                </ListItemIcon>
              </Tooltip>
              <ListItemText>Community Chat</ListItemText>
            </ListItem>

            <ListItem button component='a' href='/teams'>
              <Tooltip title='Teams' placement='right'>
                <ListItemIcon className={classes.icons}>
                  <GroupIcon/>
                </ListItemIcon>
              </Tooltip>
              <ListItemText>Teams</ListItemText>
            </ListItem>

            <ListItem button component='a' href='/tasks'>
              <Tooltip title='Tasks' placement='right'>
                <ListItemIcon className={classes.icons}>
                  <AssignmentIcon/>
                </ListItemIcon>
              </Tooltip>
              <ListItemText>Tasks</ListItemText>
            </ListItem>

            <ListItem button component='a' href='/calendar'>
              <Tooltip title='Calendar' placement='right'>
                <ListItemIcon className={classes.icons}>
                  <DateRangeIcon/>
                </ListItemIcon>
              </Tooltip>
              <ListItemText>Calendar</ListItemText>
            </ListItem>

            <ListItem button >
              <Tooltip title='Guide' placement='right'>
                <ListItemIcon className={classes.icons}>
                  <VolumeDownIcon/>
                  <Speech 
                    text={text}
                    voice="Google UK English Female"
                    rate="0.90"
                  />
                </ListItemIcon>
              </Tooltip>
              <ListItemText>Guide</ListItemText>
            </ListItem>

            <ListItem button component='a' href='/'>
              <Tooltip title='Help' placement='right'>
                <ListItemIcon className={classes.icons}>
                  <HelpIcon/>
                </ListItemIcon>
              </Tooltip>
              <ListItemText>Help</ListItemText>
            </ListItem>

            <Divider />

            <ListItem button onClick={handleLogout}>
              <Tooltip title='Logout' placement='right'>
                <ListItemIcon className={classes.logoutIcon}>
                  <ExitToAppIcon/>
                </ListItemIcon>
              </Tooltip>
              <ListItemText>Log out</ListItemText>
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;