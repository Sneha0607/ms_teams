import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { List, ListItem, Typography } from '@material-ui/core';

const Activity = () => {

    const { currentUser } = useAuth();
    const [activities, setActivities] = useState([]);
    
    //FETCHING ACTIVITIES OF CURRENT USER FROM DATABASE
    useEffect(() => {
        db.collection(`users/${currentUser.uid}/activity`).orderBy("doneAt", "desc")
        .onSnapshot(snapshot => {
            setActivities(snapshot.docs.map(doc => doc.data()))
        });
    }, [currentUser.uid])

    return (
        <div style={{ marginLeft: '10vw', marginTop: '10vh' }}>
            <Typography
                variant='h4'
                style={{ paddingTop: '3vh', fontWeight: 'bold' }}
            >
                YOUR ACTIVITY
            </Typography>
            <List>
            {
                activities.map(
                    (activity)=>{ 
                        return (
                            <ListItem
                                style={{ 
                                    border: '1px solid #c4c4c4',
                                    marginBottom: '2%',
                                    backgroundColor: '#ffffff',
                                    width: '80vw'
                                }}
                            >
                                <img 
                                    style={{height: '2%', width: '3%', margin: '1%'}} 
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


//Welcome message
//Created a team
//Created a meeting
//Joined a meeting
//Added a task