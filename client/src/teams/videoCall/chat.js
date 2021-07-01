import React from 'react';
import { db } from '../../firebase';
import { useLocation } from 'react-router';
import  { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';

const Chat = () => {

    const location = useLocation();
    const meetingCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);

    return (
        <div>
            <IconButton style={{color: '#ffffff'}}>
                <ChatIcon />
            </IconButton>
        </div>
    )
}

export default Chat
