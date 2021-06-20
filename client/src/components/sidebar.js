import React from 'react';
import useStyles from './styles';
import { Drawer, Toolbar, ListItemIcon, MenuList, MenuItem, Tooltip } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import GroupIcon from '@material-ui/icons/Group';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CallIcon from '@material-ui/icons/Call';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Header from './header';

const Sidebar = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            
            <Header/>
            
            <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
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

                        <MenuItem button className={classes.menuItem} component='a' href='/tasks'>
                            <ListItemIcon>
                                <Tooltip title='Tasks' placement='right'>
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