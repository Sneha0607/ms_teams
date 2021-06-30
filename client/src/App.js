import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import { AuthProvider } from './contexts/AuthContext';
import Home from './homepage/home';
import Signup from './homepage/signup';
import Signin from './homepage/signin';
import Teams from './teams/teams';
import Chat from './chat/chat';
import Room from './teams/videoCall/room';
import Calendar from './calendar/calendar';
import Tasks from './tasks/tasks';
import Navbar from './components/navbar';
import JoinTeam from './teams/joinTeam';
import Team from './teams/team';

const App = () => {
  const [user, setUser] = useState('');

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


  return (
      <>
      {user ?
        <>
        <CssBaseline>
        <Router>
          <AuthProvider>
            <Navbar />
              <Switch>
                <Route path = '/teams' exact component = {Teams}/>
                <Route path = '/join-create' component = {JoinTeam}/>
                <Route path = '/teams/:teamID' exact component = {Team}/>
                <Route path = '/room/:roomID' component={Room} />
                <Route path = '/chat' component = {Chat}/>
                <Route path = '/calendar' component = {Calendar}/>
                <Route path = '/tasks' component = {Tasks}/>
            </Switch>
          </AuthProvider>
        </Router>
        </CssBaseline>
        </>  
        : 
        <>
        <CssBaseline>
        <Router>
        <Switch>
          <Route path = '/' exact component = {Home}/>
          <Route path = '/signup' component = {Signup}/>
          <Route path = '/signin' component = {Signin}/>       
        </Switch>
        </Router>
        </CssBaseline>
        </>}
      </>
  );
}

export default App;