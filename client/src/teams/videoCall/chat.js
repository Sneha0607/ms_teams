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
    const [scroll, setScroll] = useState('paper');

    //FETCHING MEETING CODE FROM URL
    const location = useLocation();
    const meetingCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);

    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

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

{/*
const useStyles = makeStyles({
    
    list: {
      width: 250,
      padding: '1%',
    },

    fullList: {
      width: 'auto',
    },

});

const Chat = () => {

    const { currentUser } = useAuth();
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

   

    

    //FETCHING MESSAGES FROM DATABASE



    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };
  
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        
        >
            <form>
                <TextField
                    onSubmit={sendMessage}
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

        </div>
    );


    return (
        <div>
            {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
                <IconButton onClick={toggleDrawer(anchor, true)} style={{color: '#ffffff'}}>
                    <ChatIcon />
                </IconButton>
                <Drawer
                    anchor={anchor} 
                    open={state[anchor]} 
                    onClose={toggleDrawer(anchor, false)}
                >
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
            ))}
        </div>
    )
}

export default Chat;


{/*
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    CHAT
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >

                   
                    <form>
                        <TextField
                            onSubmit={sendMessage}
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
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
*/}
