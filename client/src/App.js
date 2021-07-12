import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './firebase';
import { AuthProvider } from './contexts/AuthContext';
import Home from './homepage/home';
import Signup from './homepage/signup';
import Signin from './homepage/signin';
import NotSigned from './homepage/notSigned';
import Teams from './teams/teams';
import Chat from './chat/chat';
import Room from './teams/videoCall/room';
import CalendarSchedule from './calendar/calendarSchedule';
import Tasks from './tasks/tasks';
import Navbar from './components/navbar';
import CreateTeam from './teams/createTeam';
import Team from './teams/team';
import Activity from './activity/activity';
import Help from './help/help';
import Container from './teams/videoCall/whiteBoard/container';

const App = () => {

  const [user, setUser] = useState('');

  //SETTING THE USER IF HE IS AUTHENTICATED
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
        // ROUTES AVAILABLE IF THE USER IS AUTHENTICATED
        <>
        <CssBaseline>
        <Router>
          <AuthProvider>
            <Navbar />
              <Switch>
                <Route path = '/' exact component = {Help}/>
                <Route path = '/teams' exact component = {Teams}/>
                <Route path = '/create-team' component = {CreateTeam}/>
                <Route path = '/teams/:teamID' exact component = {Team}/>
                <Route path = '/room/:roomID' exact component={Room}/>
                <Route path = '/chat' component = {Chat}/>
                <Route path = '/calendar' component = {CalendarSchedule}/>
                <Route path = '/tasks' component = {Tasks}/>
                <Route path = '/activity' component = {Activity}/>
                <Route path = '/:roomID/whiteboard' component = {Container}/>
            </Switch>
          </AuthProvider>
        </Router>
        </CssBaseline>
        </>  
        : 
        // ROUTES AVAILABLE IF THE USER IS NOT AUTHENTICATED
        <>
        <CssBaseline>
          <Router>
            <Switch>
              <Route path = '/' exact component = {Home}/>
              <Route path = '/signup' component = {Signup}/>
              <Route path = '/signin' component = {Signin}/>
              <Route path = '/room/:roomID' component={NotSigned}/>     
            </Switch>
          </Router>
        </CssBaseline>
        </>}
      </>
  );
}

export default App;