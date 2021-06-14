import React from 'react';
import Sidebar from '../components/sidebar';
import useStyles from './styles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

const Chat = () => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
        <Sidebar />
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appbar} elevation={0}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Chat
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>  
                        <IconButton aria-label="account of current user" color="inherit" className={classes.menuButton}>
                            <SettingsIcon />
                        </IconButton>
                        <IconButton aria-label="account of current user" color="inherit" className={classes.menuButton}>
                            <GroupAddIcon />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton aria-label="show more" className={classes.menuButton}>
                            <SettingsIcon />
                        </IconButton>
                        <IconButton aria-label="show more" className={classes.menuButton}>
                          <GroupAddIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    </div>
    )
}

export default Chat;