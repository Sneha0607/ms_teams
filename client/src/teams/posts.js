import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import { List, ListItem, Typography, Button } from '@material-ui/core';
import { db } from '../firebase';

const Posts = () => {

    const [meetings, setMeetings] = useState([]);
    const history = useHistory();

    const location = useLocation();
    const teamCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);

    useEffect(() => {
        db.collection(`teams/${teamCode}/meetings`).orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {
            setMeetings(snapshot.docs.map(doc => doc.data()))
        });
    }, [])


    return (
        <List style={{ marginTop: '10vh', marginLeft: '10vw' }}>
            {
                meetings.map(
                    (meeting)=>{ 
                        return (
                        <div 
                            style={{ border: '1px solid #e5e5e5', margin: '2vh auto', backgroundColor: '#ffffff' }}>
                            <ListItem>
                                <Button 
                                    style={{ backgroundColor: '#464775', color: '#ffffff', margin: 'auto 3%'}}
                                    onClick={(e) => history.push(`/room/${meeting.code}`)}>
                                    Join
                                </Button>
                                <Typography>NEW MEETING!
                                    <p><b>Created By: {meeting.creatorEmail}</b></p>
                                    <p>Meeting Code: {meeting.code}</p>
                                    <p>On: {new Date(meeting.createdAt?.toDate()).toUTCString()}</p>
                                </Typography>
                            </ListItem>
                        </div>
                        ) 
                    }
                )
            } 
        </List>
    )
}

export default Posts
