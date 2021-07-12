import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import useStyles from './styles';
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarSchedule = () => {

    const classes = useStyles();
    const history = useHistory();
    const { currentUser } = useAuth();
    const [meetings, setMeetings] = useState([]);
    const [value, onChange] = useState(new Date());

    //FETCHING SCHEDULED MEETINGS FROM DATABASE

    useEffect(() => {
        db.collection('meetings').orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
            setMeetings(snapshot.docs.map(doc => doc.data()))
        });
    })

    
    return(
        <div className={classes.root}>
            <Typography
                variant='h4'
                className={classes.title}
            >
                YOUR CALENDAR
            </Typography>

            {/* CALENDAR */}

            <Calendar
                onChange={onChange}
                value={value}
            />

            {/* LIST OF SCHEDULED MEETINGS */}

            <List className={classes.listRoot}>
            {
                meetings.map(
                    (meeting)=>{
                        if(meeting.time) {
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <EventIcon />
                                        </Avatar>
                                    </ListItemAvatar> 
                                    <ListItemText>
                                        Meeting scheduled on {new Date(meeting.createdAt.seconds * 1000).toLocaleDateString("en-US")},
                                        at {meeting.time} hrs by {meeting.creatorEmail}
                                    </ListItemText>
                                    <div
                                        onClick={(e) => db.doc(`meetings/${meeting.code}/participants/${currentUser.uid}`)
                                            .set({
                                                email: currentUser.email, uid: currentUser.uid, joinedAt: new Date(),
                                            })}
                                    >
                                        <Button 
                                            style={{ backgroundColor: '#464775', color: '#ffffff' }}
                                            onClick={(e) => history.push(`/room/${meeting.code}`)}>
                                            Join
                                        </Button>
                                    </div>
                                </ListItem>
                            )
                        }
                    }
                )
            }   
            </List>   
        </div>
    )
}

export default CalendarSchedule;