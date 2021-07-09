import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IconButton, Dialog, DialogTitle, Divider, DialogContent, List, Button, TextField, DialogActions, 
    DialogContentText, ListItem } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import LinkIcon from '@material-ui/icons/Link';
import { ToastContainer, toast } from 'react-toastify';

const Share = () => {

    const [open, setOpen] = useState(false);
    const { currentUser } = useAuth();
    const [email, setEmail] = useState();


    const sendInvite = (e) => {
        e.preventDefault();
        
        

        setEmail('');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //COPY LINK TO CLIPBOARD
    const url = window.location.href;
    const copied = () => toast.success("Meeting link copied to clipboard!", {
        position: toast.POSITION.BOTTOM_CENTER
    });

    return (
        <div>
            <IconButton 
                onClick={handleClickOpen} 
                style={{color: '#ffffff'}}
            >
                <ShareIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Share Meeting Information
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText>
                        Copy meeting url: 
                        <CopyToClipboard text={url}>
                        <IconButton onClick={copied}>
                            <LinkIcon style={{color: '#000000'}}/>
                            <ToastContainer />
                        </IconButton>
                    </CopyToClipboard>
                    </DialogContentText>
                    <form onSubmit={sendInvite}>
                        <TextField
                            id="filled-basic" 
                            color = "primary"
                            placeholder='Enter email to invite' 
                            value = {email}
                            onChange = {(e)=>{setEmail(e.target.value)}}   
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
    )
}

export default Share;