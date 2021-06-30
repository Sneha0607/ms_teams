import React, { useState } from "react";
import useStyles from "../styles";
import { Button, TextField, Typography, InputAdornment, Modal } from "@material-ui/core";
import { v1 as uuid } from "uuid";
import { useHistory } from 'react-router';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import KeyboardIcon from '@material-ui/icons/Keyboard';

const CreateRoom = () => {

    const classes = useStyles();
    const [code, setCode] = useState('')
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const create = () => {
        const id = uuid();
        history.push(`/room/${id}`);
        alert(`Copy your meeting code : ${id}`);

        // return (
        // <Modal open={open} onClose={(e) => setOpen(false)}>
        //     <div className={classes.paper}>
        //       <h3>Update the Task</h3>
        //       <Button
        //         variant="contained"
        //         color="default"
        //         className={classes.buttonUpload}
        //       >
        //         Upload
        //       </Button>
        //     </div>
        // </Modal>
        // )
    }

    const join = (e) => {
        history.push(`/room/${code}`);
    }

    return ( 
        <>
        <div className={classes.startMeeting}>
        <Typography variant='h5' style={{marginBottom: '5%', align: 'center', fontWeight: 'bold'}}>
            CREATE OR JOIN A MEETING ROOM
        </Typography>
        <Button 
            className={classes.newMeeting} 
            onClick={create} 
            variant="contained" 
            startIcon={<VideoCallIcon/>}
        >
            New meeting
        </Button>
        <form onSubmit={join}>
            <TextField className={classes.codeText} variant='outlined' placeholder='Enter code to join'
                value={code} onChange = {(e)=>setCode(e.target.value)} 
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyboardIcon />
                      </InputAdornment>
                    ),
            }}/>
            <Button className={classes.joinButton} variant='contained' type='submit' onClick={join}> 
                JOIN 
            </Button>
        </form>
        </div>
        </>
    );
};

export default CreateRoom;