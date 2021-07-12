import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import useStyles from './styles';
import { List, ListItem, Typography } from '@material-ui/core';

const Activity = () => {

    const { currentUser } = useAuth();
    const [activities, setActivities] = useState([]);
    const classes = useStyles();
    
    //FETCHING ACTIVITIES OF CURRENT USER FROM DATABASE
    useEffect(() => {
        db.collection(`users/${currentUser.uid}/activity`).orderBy("doneAt", "desc")
        .onSnapshot(snapshot => {
            setActivities(snapshot.docs.map(doc => doc.data()))
        });
    }, [currentUser.uid])

    return (
        <div className={classes.root}>
            <Typography
                variant='h4'
                className={classes.title}
            >
                YOUR ACTIVITY
            </Typography>
            
            {/* LIST OF ACTIVITIES */}
            <List>
            {
                activities.map(
                    (activity)=>{ 
                        return (
                            <ListItem
                                className={classes.posts}
                            >
                                <img 
                                    className={classes.icon}
                                    src={process.env.PUBLIC_URL + 'images/teams.png'}
                                    alt='teams_logo'
                                />
                                <Typography>
                                    {new Date(activity.doneAt.seconds * 1000).toLocaleDateString("en-US")},
                                    {new Date(activity.doneAt.seconds * 1000).getHours()}:{new Date(activity.doneAt.seconds * 1000).getMinutes()}
                                    <p><b>{activity.activity}</b></p>
                                </Typography>
                            </ListItem>                          
                        ) 
                    }
                )
            }
            </List>
        </div>
    )
}

export default Activity;