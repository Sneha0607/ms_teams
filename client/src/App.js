import React, { useEffect, useState } from 'react';
import { CssBaseline, IconButton, Typography, AppBar, Toolbar } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import useStyles from './styles';
import firebase from './firebase';
import { AuthProvider } from './contexts/AuthContext';
import Home from './homepage/home';
import Signup from './homepage/signup';
import Signin from './homepage/signin';
import Teams from './teams/teams';
import Chat from './chat/chat';
import Sidebar from './components/sidebar';
import Room from './teams/room';
import HearingIcon from '@material-ui/icons/Hearing';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
  const [user, setUser] = useState('');
  
  const classes = useStyles();

  const authlistener = () =>{
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        setUser(user);
      }
      else{
        setUser('');
      }
    });
  };

  useEffect(() =>{
    authlistener();
  }, []);

  const commands = [
    {
        command: ["Go to *", "Go to * page", "Open *", "Open * page", "*"],
        callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ]

  const {transcript} = useSpeechRecognition({commands});
  const [redirectUrl, setRedirectUrl] = useState('');
  const pages = ['teams', 'chat', 'tasks', 'activity', 'calls', 'calendar'];
  const urls = {
      teams: '/teams',
      chat: '/chat',
      tasks: '/tasks',
      activity: '/activity',
      calls: '/calls',
      calendar: '/calendar'
  };

  if(!SpeechRecognition.browserSupportsSpeechRecognition) {
      return null;
  }
  let redirect = '';
  if(redirectUrl) {
      if(pages.includes(redirectUrl)) {
          redirect = <Redirect to={urls[redirectUrl]} />
      } else {
          redirect = <p>Could not find page: {redirectUrl}</p>
      }
  }

  return (
      <>
      {user ?
        <>
        <CssBaseline>
        <Router>
          <AuthProvider>
            <Sidebar />
            {/* <Switch> */}
              <Route path = '/teams' component = {Teams}/>
              <Route path = '/room/:roomID' component={Room} />
              <Route path = '/chat' component = {Chat}/>

              {redirect}
            {/* </Switch> */}
          </AuthProvider>
        </Router>
        <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <IconButton onClick={SpeechRecognition.startListening} edge="start" className={classes.hearButton}>
                  <HearingIcon />
                </IconButton>          
                <Typography>Click and speak to navigate between pages: {transcript}</Typography>
              </Toolbar>
            </AppBar>
        </CssBaseline>
        </>  
        : 
        <>
        <CssBaseline>
        <Router>
        <Switch>
          <Route path = '/' exact component = {Home} />
          <Route path = '/signup' component = {Signup} />
          <Route path = '/signin' component = {Signin} />       
        </Switch>
        </Router>
        </CssBaseline>
        </>}
      </>
  );
}

export default App;