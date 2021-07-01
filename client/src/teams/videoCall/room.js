import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';
import useStyles from '../styles';
import { IconButton, Toolbar, AppBar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import LinkIcon from '@material-ui/icons/Link';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Participants from './participants';
import Chat from './chat';

const Container = styled.div`
    padding: 2vw;
    display: flex;
    height: 85vh;
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
        <StyledVideo controls playsInline autoPlay ref={ref} />
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
                    peers.push({
                        peerID: userID,
                        peer,
                    });
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                const peerObj = {
                    peer,
                    peerID: payload.callerID
                }

                setPeers(users => [...users, peerObj]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });

            socketRef.current.on("user left", id => {
                const peerObj = peersRef.current.find(p => p.peerID === id);
                if(peerObj) {
                    peerObj.peer.destroy();
                }
                const peers = peersRef.current.filter(p => p.peerID !== id);
                peersRef.current = peers;
                setPeers(peers);
            })
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
      audioControl=<IconButton onClick={()=>toggleMuteAudio()} style={{color: '#ffffff'}}>
        <MicOffIcon/>
      </IconButton>
    } 
    else {
      audioControl=<IconButton onClick={()=>toggleMuteAudio()} style={{color: '#ffffff'}}>
        <MicIcon/>
      </IconButton>
    }

    let videoControl;
    if(videoMuted){
      videoControl=<IconButton onClick={()=>toggleMuteVideo()} style={{color: '#ffffff'}}>
        <VideocamOffIcon/>
      </IconButton>
    } 
    else {
      videoControl=<IconButton onClick={()=>toggleMuteVideo()} style={{color: '#ffffff'}}>
        <VideocamIcon/>
      </IconButton>
    }

    //SCREEN SHARE OPTION

    // function shareScreen(){
    //     navigator.mediaDevices.getDisplayMedia({cursor:true})
    //     .then(screenStream =>{
    //         peersRef.current.replaceTrack(stream.getVideoTracks()[0],screenStream.getVideoTracks()[0],stream)
    //         userStream.current.srcObject = screenStream;
    //         userStream.current = screenStream;
    //         screenStream.getTracks()[0].onended = () =>{
    //         peersRef.current.replaceTrack(screenStream.getVideoTracks()[0],stream.getVideoTracks()[0],stream)
    //         userStream.current.srcObject = stream;
    //         userStream.current = stream;
    //         }
    //     })
    // }

    // function shareScreen() {
    //     navigator.mediaDevices.getDisplayMedia({ cursor: true }).then(stream => {
    //         const screenTrack = stream.getTracks()[0];
    //         peersRef.current.find(sender => sender.track === 'video').replaceTrack(screenTrack);
    //         screenTrack.onended = function() {
    //             peersRef.current.find(sender => sender.track === "video").replaceTrack(userStream.current.getTracks()[1]);
    //         }
    //     })
    // }

    // function isMobileDevice() {
    //     let check = false;
    //     (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    //     return check;
    //   };

    // let screenShare =
    //   <IconButton onClick={()=>shareScreen()} style={{color: '#ffffff'}}>
    //       <ScreenShareIcon/>
    //     </IconButton>
    // if(isMobileDevice()){
    //   screenShare=<></>
    // }

    // let socketInstance = useRef(null);    
    // useEffect(() => {
    //     startConnection();
    // }, []);
    // const startConnection = () => {
    //     params = {quality: 12}
    //     socketInstance.current = createSocketConnectionInstance({
    //         params
    //     });
    // }

    // const [mediaType, setMediaType] = useState(false);    
    // const toggleScreenShare = (displayStream ) => {
    //     const { reInitializeStream, toggleVideoTrack } = socketInstance.current;
    //     displayStream === 'displayMedia' && toggleVideoTrack({
    //         video: false, audio: true
    //     });
    //     reInitializeStream(false, true, displayStream).then(() => {
    //         setMediaType(!mediaType)
    //     });
    // }

    
    //FULL SCREEN
    // let fullscreenButton;  
    // if(isfullscreen){
    //     fullscreenButton=<IconButton onClick={()=>{setFullscreen(false)}} style={{color: '#ffffff'}}>
    //         <FullscreenExitIcon/>
    //     </IconButton>
    // } else {
    //     fullscreenButton=<IconButton onClick={()=>{setFullscreen(true)}} style={{color: '#ffffff'}}>
    //         <FullscreenIcon/>
    //     </IconButton>
    // }

    //COPY LINK TO CLIPBOARD
    const url = window.location.href;
    const copied = () => toast.success("Meeting link copied to clipboard!", {
        position: toast.POSITION.BOTTOM_CENTER
    });
      
    //LEAVE MEETING

    const leaveMeeting = () => {
        alert('You are leaving the meeting!')
    }

    return (
        <Container style={{marginTop: '10vh', backgroundColor: '#1b1a1a', width: '100vw'}}>
            <StyledVideo controls muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer) => {
                return (
                    <Video key={peer.peerID} peer={peer.peer} />
                );
            })}

            {/* CONTROLS */}

            <AppBar position="fixed" className={classes.controls}>
                <Toolbar className={classes.controlsToolbar}>
                    {audioControl}     
                    {videoControl}
                    <Participants />
                    <Chat />
                    {/* {screenShare} */}
                    {/* {fullscreenButton} */}
                    <CopyToClipboard text={url}>
                        <IconButton onClick={copied}>
                            <LinkIcon style={{color: '#ffffff'}}/>
                            <ToastContainer />
                        </IconButton>
                    </CopyToClipboard>
                    <IconButton onClick={leaveMeeting} href='/teams' style={{color: '#9d2f42'}}>
                        <CallEndIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Container>
    );
};

export default Room;