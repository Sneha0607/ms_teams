import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { db } from '../firebase';
import { List, ListItem } from '@material-ui/core';
import Messages from './messages';

const Chat = () => {

  const [meetings, setMeetings] = useState([]);
  const history = useHistory();

  useEffect(() => {
    db.collection("meetings").orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
        setMeetings(snapshot.docs.map(doc => doc.data()))
    });
  }, [])


  return (
    <div>
      <Messages/>
      <List style={{ marginLeft: '5vw', marginTop: '10vh', height: '100vh', width: '20vw'}}>
        {
          meetings.map(
            (meeting)=>{
              return (
                <ListItem component='a' onClick={(e)=>history.push(`chat/${meeting.code}`)}>
                    {meeting.code}
                </ListItem>
              )
            }
          )
        }
      </List>
    </div>
  )
}

export default Chat;