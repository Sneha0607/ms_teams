import React from "react";
import { IconButton } from "@material-ui/core";
import { v1 as uuid } from "uuid";
import { useHistory } from 'react-router';
import VideoCallIcon from '@material-ui/icons/VideoCall';

const CreateRoom = () => {

    const history = useHistory();

    const create = () => {
        const id = uuid();
        history.push(`/room/${id}`);
    }

    return (
        <IconButton onClick={create} style={{marginLeft: '20vw'}}>
            <VideoCallIcon />
            Create room
        </IconButton>
    );
};

export default CreateRoom;