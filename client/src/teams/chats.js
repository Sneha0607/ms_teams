import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import jsPDF from 'jspdf';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },

  heading: {
    fontWeight: 'bold',
  },
}));

const Chats = (props) => {
  
    const classes = useStyles();
    const { currentUser } = useAuth();
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');

    //FETCHING TEAMS DATA FROM DATABASE
    useEffect(() => {
        db.collection(`meetings/${props.meetingCode}/chats`).orderBy("sentAt", "asc")
        .onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => doc.data()))
        });
    }, [props.meetingCode])

    const sendMessage = (e) => {
        e.preventDefault();
        
        //PUSHING MESSAGE IN DATABASE
        db.collection("meetings").doc(props.meetingCode).collection("chats").add({
            message: message,
            senderEmail: currentUser.email,
            senderUid: currentUser.uid,
            sentAt: new Date(),
        })

        setMessage('');
    }

    //FUNCTION TO EXPORT CHAT AS A PDF
    const exportChat = () => {
      var doc = new jsPDF('p', 'pt');
      var i = 20
      var j = 30
      doc.setFontSize('15');
      doc.text(i, 20, "Meeting Chats");
      doc.setFontSize('10');
      
      chats.map(
        (chat)=>{
          doc.text(i, j, chat.senderEmail.substring(0, chat.senderEmail.indexOf('@')));
          doc.text(i+110, j, '-')
          doc.text(i+115, j, chat.message);
          j = j+20;
        }
      )
      doc.save("meeting_chat.pdf");
    }

    return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='subtitle1' className={classes.heading}>Meeting Chats</Typography>
        </AccordionSummary>

        {/* DISPLAYING MEETING CHATS IN TEAM POSTS */}

        <AccordionDetails>
            <div>
                {
                    chats.map(
                        (chat)=>{
                            return (
                                <div style={{ margin: '0', padding: '0' }} >
                                    <div>
                                        <Typography variant='body2' style={{ color: '#464775' }}>{chat.senderEmail}</Typography>
                                        <Typography variant='caption' style={{ color: '#464775' }}>{new Date(chat.sentAt.seconds * 1000).toLocaleDateString("en-US")}, {new Date(chat.sentAt.seconds * 1000).getHours()}:{new Date(chat.sentAt.seconds * 1000).getMinutes()} hrs</Typography>
                                        <Typography variant='body1'>{chat.message}</Typography>
                                    </div>
                                </div>
                            )
                        }
                    )
                }

                {/* FORM TO SEND MESSAGE */}
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

                {/* BUTTON TO EXPORT CHAT */}
                <Button 
                  onClick={exportChat}
                  style={{ backgroundColor: '#464775', textTransform: 'none', color: '#ffffff', margin: '2%' }}
                  startIcon={<ArrowDownwardIcon/>}
                >
                  Export Chat
                </Button>
            </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Chats;