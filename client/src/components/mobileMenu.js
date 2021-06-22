import React, { useState } from 'react';
import useStyles from './styles';
import { IconButton, Menu, MenuItem, ListItemIcon } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import GroupIcon from '@material-ui/icons/Group';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CallIcon from '@material-ui/icons/Call';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const MobileMenu = () => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <div>
            <IconButton edge="start" onClick={handleClick} className={classes.menuButton} color="inherit" aria-label="open drawer">
                    <MoreHorizIcon />
            </IconButton>

            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>

                <MenuItem onClick={handleClose} button className={classes.menuItem} component='a' href='/activity'>
                    <ListItemIcon>
                        <NotificationsIcon className={classes.icons}/>
                    </ListItemIcon>
                </MenuItem>

                <MenuItem onClick={handleClose} button className={classes.menuItem} component='a' href='/chat'>
                    <ListItemIcon>
                        <MessageIcon className={classes.icons}/>
                    </ListItemIcon>
                </MenuItem>

                <MenuItem onClick={handleClose} button className={classes.menuItem} component='a' href='/teams'>
                    <ListItemIcon>
                        <GroupIcon className={classes.icons}/>
                    </ListItemIcon>
                </MenuItem>

                <MenuItem onClick={handleClose} button className={classes.menuItem} component='a' href='/tasks'>
                    <ListItemIcon>
                        <AssignmentIcon className={classes.icons}/>
                    </ListItemIcon>
                </MenuItem>

                <MenuItem onClick={handleClose} button className={classes.menuItem} component='a' href='/calendar'>
                    <ListItemIcon>
                        <DateRangeIcon className={classes.icons}/>
                    </ListItemIcon>
                </MenuItem>

                <MenuItem onClick={handleClose} button className={classes.menuItem}>
                    <ListItemIcon>
                        <CallIcon className={classes.icons}/>
                    </ListItemIcon>
                </MenuItem>

            </Menu>
        </div>
    )
}

export default MobileMenu;
