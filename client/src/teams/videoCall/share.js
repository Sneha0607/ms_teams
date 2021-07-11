import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IconButton, Dialog, DialogTitle, Divider, DialogContent, Button, DialogActions, DialogContentText,
     Typography, Tooltip } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/Link';
import { ToastContainer, toast } from 'react-toastify';

const Share = () => {

    const [open, setOpen] = useState(false);

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

    //FETCHING MEETING CODE FROM URL
    const location = useLocation();
    const meetingCode = location.pathname.substring(location.pathname.lastIndexOf('/')+1);
    const codeCopied = () => toast.success("Meeting code copied to clipboard!", {
        position: toast.POSITION.BOTTOM_CENTER
    });

    return (
        <div>
            <Tooltip title='Share Meeting Info' placement='top'>
                <IconButton 
                    onClick={handleClickOpen} 
                    style={{color: '#ffffff'}}
                >
                    <ShareIcon />
                </IconButton>
            </Tooltip>

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

                        <Typography>
                            Copy Meeting Code: 
                            <CopyToClipboard text={meetingCode}>
                                <IconButton onClick={codeCopied}>
                                    <LinkIcon style={{color: '#000000'}}/>
                                    <ToastContainer />
                                </IconButton>
                            </CopyToClipboard>
                        </Typography>
                    </DialogContentText>
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