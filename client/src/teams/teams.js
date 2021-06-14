import React from 'react';
import Sidebar from '../components/sidebar';
import useStyles from './styles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppBar, Toolbar, IconButton, Typography, Tooltip } from '@material-ui/core';

const Teams = () => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
        <Sidebar />
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appbar} elevation={0}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Teams
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>  
                        <Tooltip title="Settings" placement="bottom">
                            <IconButton aria-label="settings" className={classes.menuButton} >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Join or create team' placement='bottom'>
                            <IconButton aria-label="settings" className={classes.menuButton} href='/join-create'>
                                <GroupAddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className={classes.sectionMobile}>
                        <Tooltip title="Settings" placement="bottom">
                            <IconButton aria-label="settings" className={classes.menuButton} >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Join or create team' placement='bottom'>
                            <IconButton aria-label="settings" className={classes.menuButton} href='/join-create'>
                                <GroupAddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    </div>
    )
}

export default Teams;