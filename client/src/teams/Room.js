import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';
import useStyles from './styles';
import { IconButton, Toolbar, MenuItem, MenuList, Drawer } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';


const Container = styled.div`
    padding: 2%;
    display: flex;
    height: 90vh;
    width: 100%;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 45%;
    width: 50%;
    marginLeft: 5%
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {

    const classes = useStyles();

    const [peers, setPeers] = useState([]);
    const [stream, setStream] = useState();
    const [audioMuted, setAudioMuted] = useState(false)
    const [videoMuted, setVideoMuted] = useState(false)
    const [isfullscreen, setFullscreen] = useState(false)
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const userStream = useRef();

    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            setStream(stream);
            userStream.current = stream;
            socketRef.current.emit("join room", roomID);
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    //TOGGLE AUDIO AND VIDEO OPTIONS

    function toggleMuteAudio(){
        if(stream){
          setAudioMuted(!audioMuted)
          stream.getAudioTracks()[0].enabled = audioMuted
        }
    }
    
    function toggleMuteVideo(){
        if(stream){
          setVideoMuted(!videoMuted)
          stream.getVideoTracks()[0].enabled = videoMuted
        }
    }
    
    let audioControl;
    if(audioMuted){
      audioControl=<IconButton onClick={()=>toggleMuteAudio()} style={{color: '#ffffff', fontSize: '2rem'}}>
        <MicOffIcon/>
      </IconButton>
    } 
    else {
      audioControl=<IconButton onClick={()=>toggleMuteAudio()} style={{color: '#ffffff', fontSize: '2rem'}}>
        <MicIcon/>
      </IconButton>
    }

    let videoControl;
    if(videoMuted){
      videoControl=<IconButton onClick={()=>toggleMuteVideo()} style={{color: '#ffffff', fontSize: '2rem'}}>
        <VideocamOffIcon/>
      </IconButton>
    } 
    else {
      videoControl=<IconButton onClick={()=>toggleMuteVideo()} style={{color: '#ffffff', fontSize: '2rem'}}>
        <VideocamIcon/>
      </IconButton>
    }


      
    //LEAVE MEETING

    const leaveMeeting = () => {
        alert('You are leaving the meeting!')
    }

    return (
        <Container style={{marginTop: '10vh', backgroundColor: '#1b1a1a', width: '100vw'}}>
            <StyledVideo muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}

            <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }} anchor='right'>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <MenuList>
                        <MenuItem >
                            {audioControl}
                        </MenuItem>
                        <MenuItem >
                            {videoControl}
                        </MenuItem>
                        <MenuItem >
                            <IconButton onClick={leaveMeeting} href='/teams' style={{color: '#9d2f42', fontSize: '2rem'}}>
                                <CallEndIcon/>
                            </IconButton>
                        </MenuItem>
                    </MenuList>
                </div>
            </Drawer>
        </Container>
    );
};

export default Room;