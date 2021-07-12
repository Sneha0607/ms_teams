import React from 'react';
import { useLocation } from 'react-router';
import { IconButton, Tooltip } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

const WhiteBoard = () => {

    //FETCHING MEETING CODE FROM URL
    const location = useLocation();
    const meetingCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);

    //FUNCTION TO OPEN WHITEBOARD IN NEW TAB
    const handleClick = () => {
        const url = `/${meetingCode}/whiteboard`;
        window.open(url, '_blank');
    }

    return (
        <div>
            <Tooltip title='Open Collaborative Whiteboard' placement='top'>
                <IconButton 
                    onClick={handleClick} 
                    style={{color: '#ffffff'}}
                >
                    <CreateIcon />
                </IconButton>
            </Tooltip>         
        </div>
    )
}

export default WhiteBoard;