import React from 'react';
import { useLocation } from 'react-router';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { IconButton } from '@material-ui/core';
import PanToolIcon from '@material-ui/icons/PanTool';

const HandRaise = () => {

    const { currentUser } = useAuth();

    //FETCHING MEETING CODE FROM URL
    const location = useLocation();
    const meetingCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);

    const handleClick = (e) => {
        e.preventDefault();
        
        //PUSHING MESSAGE IN DATABASE
        
    }

    return (
        <div>
            <IconButton 
                onClick={handleClick} 
                style={{color: '#ffffff'}}
            >
                <PanToolIcon />
            </IconButton>
        </div>
    )
}

export default HandRaise;