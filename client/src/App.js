import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import firebase from './firebase';
import Home from './homepage/home';
import Signup from './homepage/signup';
import Signin from './homepage/signin';
import Teams from './teams/teams';
import Chat from './chat/chat';

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
        <Switch>
          <Route path = '/teams' component = {Teams}/>
          <Route path = '/chat' component = {Chat}/>
        </Switch>
        </Router>
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

<>
        
    </>