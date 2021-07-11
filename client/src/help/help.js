import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import useStyles from './styles';
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import GroupIcon from '@material-ui/icons/Group';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HelpIcon from '@material-ui/icons/Help';
import Speech from 'react-speech';

const Help = () => {

    const classes = useStyles();
    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);

    //FETCHING USERS DATA FROM DATABASE
    useEffect(() => {
        db.collection(`users`).onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => doc.data()))
        });
    }, [])

    const text = "Hello user!Welcome to Teams!You can use teams to create groups, meetings and chat with the community, you can even manage your daily tasks and todos and can also view your activities in this app! Thank you!";

    return (
        <div className={classes.root}>
            <Typography
                variant='h4'
                className={classes.title}
            >
                TEAMS HELP
            </Typography>
            <Typography
                className={classes.title}
            >
                Hey &nbsp;
                {
                    users.map(
                        (user)=>{
                            if(user.uid === currentUser.uid)
                                return (user.name)
                        }
                    )
                }!
                Welcome to Teams! Here's a quick guide for you!
            </Typography>

            <Speech 
                style={{ marginLeft: '25vw' }}
                textAsButton={true} 
                displayText="Click to listen" 
                text={text}
                voice="Google UK English Female"
                rate="0.90"
            />

            <List className={classes.listRoot}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <NotificationsIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Activity" secondary="You can view all your activities" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <MessageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Community Chat" secondary="You can communicate with all users of this app" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <GroupIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Teams" secondary="You can create teams, start or join meetings and even send messages" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AssignmentIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Tasks" secondary="You can manage all your tasks and todos" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <DateRangeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Calendar" secondary="You can keep a track of all the scheduled meetings" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <HelpIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Help" secondary="You can use it as a guide" />
                </ListItem>

                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={process.env.PUBLIC_URL + '/images/SnehaSingh.jpg'}/>
                    </ListItemAvatar>
                    <ListItemText primary="Sneha Singh: Admin and Developer" secondary="Contact me for any issues: sneha.20198023@mnnit.ac.in" />
                </ListItem>
                 
            </List>
             
        </div>
    )
}

export default Help;