import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import { List, ListItem, Typography, Button } from '@material-ui/core';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const Posts = () => {

    const [meetings, setMeetings] = useState([]);
    const history = useHistory();
    const { currentUser } = useAuth();

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
                                <div 
                                style = {{ margin: 'auto 3%' }}
                                onClick={(e) => db.doc(`teams/${teamCode}/meetings/${meeting.code}/participants/${currentUser.uid}`)
                                                .set({
                                                    email: currentUser.email, uid: currentUser.uid, joinedAt: new Date(),
                                        })}
                                >
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
                                </div>
                                <Typography>NEW MEETING!
                                    <p><b>Created By: {meeting.creatorEmail}</b></p>
                                    <p>Meeting Code: {meeting.code}</p>
                                    <p>
                                        Created on {new Date(meeting.createdAt.seconds * 1000).toLocaleDateString("en-US")}, 
                                        at {new Date(meeting.createdAt.seconds * 1000).getHours()}:{new Date(meeting.createdAt.seconds * 1000).getMinutes()} hrs
                                    </p>
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
