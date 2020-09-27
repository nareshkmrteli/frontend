import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './pages/signin';
import SignUp from './pages/signup'
import VerificationCode from './pages/verificationcode'
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import RecoverPassword from './pages/recoverpassword';
import Account from "./pages/account"
import SetNewPassword from './pages/setnewpassword'

function App() {
  return (
    <Router>
      <div>
        <div>Navigation</div>
        <Link to='/signin' >Login</Link>
        <Link to="/signup">signup</Link>
      </div>
      <hr/>
      <Switch>
        <Route path='/signup'>
          <SignUp/>
        </Route>
        <Route path='/signin'>
          <SignIn/>
        </Route>
        <Route path='/recoverpassword'>
          <RecoverPassword/>
        </Route >
        <Route path='/:id/verificationcode'>
          <VerificationCode/>
        </Route>
        <Route path='/account'>
          <Account/>
        </Route>
        <Route path='/setnewpassword'>
          <SetNewPassword/>
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
