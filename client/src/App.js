import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './homepage/home';
import Signup from './homepage/signup';
import Signin from './homepage/signin';


const App = () => {
  return (
      <>
      <CssBaseline>
        <Router>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/signin' exact component={Signin}/>
          </Switch>
        </Router>
      </CssBaseline>
      </>
  );
}

export default App;