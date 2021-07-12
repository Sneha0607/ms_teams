import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import useStyles from './styles';
import { List, ListItem, Typography, TextField, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Avatar from 'react-avatar';

const Chat = () => {

  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const classes = useStyles();

  const sendMessage = (e) => {
    e.preventDefault();
    
    //PUSHING MESSAGE IN DATABASE
    db.collection("messages").add({
        message: message,
        senderEmail: currentUser.email,
        senderUid: currentUser.uid,
        sentAt: new Date(),
    })

    setMessage('');
  }

  //FETCHING COMMUNITY CHATS FROM DATABASE
  useEffect(() => {
    db.collection(`messages`).orderBy("sentAt", "desc")
    .onSnapshot(snapshot => {
        setChats(snapshot.docs.map(doc => doc.data()))
    });
  }, [])


  return (

    <div className={classes.root}>
      <Typography
          variant='h4'
          className={classes.title}
      >
          COMMUNITY POSTS
      </Typography>
      <List>
        <ListItem
          className={classes.createPost}
        >

          {/* FORM TO ENTER MESSAGE */}

          <form onSubmit={sendMessage} style={{ justifyContent:'center' }}>
            <TextField
                id="outlined-basic"  
                variant="outlined"
                placeholder='Post your message...'
                value={message}
                onChange = {(e)=>{setMessage(e.target.value)}}
                className={classes.textField}  
            />
            <Button
              type='submit'
              startIcon={<SendIcon style={{ fontSize: '2rem', color: '#ffffff' }}/>}
            />
          </form>

        {/* ALL CHATS */}

        </ListItem>
        {
          chats.map(
            (chat)=>{
              return (
                <ListItem
                  className={classes.posts}
                >
                    <Avatar 
                      style={{ margin: '1%' }}
                      name={chat.senderEmail} 
                      size='40' 
                      textSizeRatio={1.75} 
                      round={true}
                    />
                    <Typography>
                        <Typography variant='subtitle2'>{chat.senderEmail}</Typography>
                        <Typography variant='caption'>
                        {new Date(chat.sentAt.seconds * 1000).toLocaleDateString("en-US")},
                        {new Date(chat.sentAt.seconds * 1000).getHours()}:{new Date(chat.sentAt.seconds * 1000).getMinutes()}
                        </Typography>
                        <Typography>{chat.message}</Typography>
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

export default Chat;