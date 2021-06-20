import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

const Chat = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        db.collection(`users`).onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()))
        });
    }, [])

    return (
        <div className={classes.content}>

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

            {
                users.map(
                    (user)=>(
                        <div style={{marginLeft: '10vw'}}>
                            <h4>{user.name}</h4>
                            <h4>{user.email}</h4>
                        </div>
                    )
                )
            }
        </div>
    </div>
    )
}

export default Chat;