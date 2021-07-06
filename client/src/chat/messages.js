import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { db } from '../firebase';
import { List, ListItem } from '@material-ui/core';

const Messages = () => {

    const [messages, setMessages] = useState([]);

    //FETCHING THE PARTICULAR TEAM CODE FROM URL
    const location = useLocation();
    const meetingCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);

    //FETCHING MEETING MESSAGES FROM DATABASE
    useEffect(() => {
        db.collection(`meetings/${meetingCode}/chats`).orderBy("sentAt", "asc")
        .onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        });
    }, [meetingCode])

    return (
        <div style={{ marginLeft: '30vw', marginTop: '10vh' }}>
            <List>
                {
                    messages.map(
                        (message)=>{
                            return(
                                <ListItem>{message.message}</ListItem>
                            )
                        }
                    )
                }
            </List>
        </div>
    )
}

export default Messages;