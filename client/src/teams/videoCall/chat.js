import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { IconButton, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, List, ListItem, Typography, Divider } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import SendIcon from '@material-ui/icons/Send';

const Chat = () => {

    const [open, setOpen] = useState(false);
    const { currentUser } = useAuth();
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);

    //FETCHING MEETING CODE FROM URL
    const location = useLocation();
    const meetingCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);


    const sendMessage = (e) => {
        e.preventDefault();
        
        //PUSHING MESSAGE IN DATABASE
        db.collection("meetings").doc(meetingCode).collection("chats").add({
            message: message,
            senderEmail: currentUser.email,
            senderUid: currentUser.uid,
            sentAt: new Date(),
        })

        setMessage('');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //FETCHING ALL MESSAGES FROM DATABASE
    useEffect(() => {
        db.collection(`meetings/${meetingCode}/chats`).orderBy("sentAt", "asc")
        .onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => doc.data()))
        });
    }, [meetingCode])

    return (
        <div>
            <IconButton 
                onClick={handleClickOpen} 
                style={{color: '#ffffff'}}
            >
                <ChatIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    CHAT
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText>
                        <List>
                            {
                                chats.map(
                                    (chat)=>{ 
                                        return (
                                            <>
                                                <ListItem style={{ margin: '0' }}>
                                                    <Typography>
                                                        {chat.senderEmail}
                                                        <p><b>{chat.message}</b></p>
                                                    </Typography>
                                                </ListItem>
                                            </>
                                        ) 
                                    }
                                )
                            }
                        </List>
                    </DialogContentText>
                    <form onSubmit={sendMessage}>
                        <TextField

                            id="filled-basic" 
                            color = "primary"
                            placeholder='Enter message...' 
                            value = {message}
                            onChange = {(e)=>{setMessage(e.target.value)}}   
                        />
                        <Button
                            type='submit'
                            startIcon={<SendIcon/>}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Chat;