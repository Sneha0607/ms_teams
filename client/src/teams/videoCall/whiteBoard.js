import React from 'react';
import { useLocation } from 'react-router';
import { IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import Container from './components/container/Container';

const WhiteBoard = () => {

    //FETCHING MEETING CODE FROM URL
    const location = useLocation();
    const meetingCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);

    const handleClick = () => {
        const url = `/${meetingCode}/whiteboard`;
        window.open(url, '_blank');
    }

    return (
        <div>
            <IconButton 
                onClick={handleClick} 
                style={{color: '#ffffff'}}
            >
                <CreateIcon />
            </IconButton>
            
        </div>
    )
}

export default WhiteBoard;