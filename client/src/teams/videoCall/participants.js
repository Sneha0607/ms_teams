import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { db } from '../../firebase';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Drawer, List, ListItem, Divider, Typography, ListItemAvatar, ListItemText, Tooltip } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import Avatar from 'react-avatar';

const useStyles = makeStyles({
    
    list: {
      width: 250,
      padding: '1%',
    },

    fullList: {
      width: 'auto',
    },

});

const Participants = () => {

    const [participants, setParticipants] = useState([]);

    //FETCHING MEETING CODE FROM URL
    const location = useLocation();
    const meetingCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);

    //FETCHING PARTICIPANTS DATA FROM DATABASE
    useEffect(() => {
        db.collection(`meetings/${meetingCode}/participants`).orderBy("joinedAt", "desc")
        .onSnapshot(snapshot => {
            setParticipants(snapshot.docs.map(doc => doc.data()))
        });
    }, [meetingCode])


    const classes = useStyles();
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    // DISPLAYING LIST OF PARTICIPANTS

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Typography variant='h5'>PARTICIPANTS</Typography>
                <Divider />
                {
                    participants.map(
                        (participant)=>{ 
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar 
                                            name={participant.email} 
                                            size='40' 
                                            textSizeRatio={1.75} 
                                            round={true}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {participant.email}
                                    </ListItemText>
                                </ListItem>
                            ) 
                        }
                    )
                }
            </List>
        </div>
    );


    return (
        <div>
            {['right'].map((anchor) => (
            <React.Fragment key={anchor}>

                {/* PARTICIPANTS BUTTON */}

                <Tooltip title='Participants' placement='top'>
                    <IconButton onClick={toggleDrawer(anchor, true)} style={{color: '#ffffff'}}>
                        <PeopleIcon />
                    </IconButton>
                </Tooltip>
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

export default Participants;