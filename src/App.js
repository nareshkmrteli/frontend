import React,{useContext,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import { Container } from '@material-ui/core';


import {Account} from './pages/account/account'
import AppBottomNavigation from './component/bottomnavigation'
import AccountProfile from './pages/account/accountprofile'
import {UserContextProvider} from './context/usercontext'


function App() {
  const [isUserLogined, setIsUserLogined] = useState(false)
  const intialContext={isUserLogined,setIsUserLogined}

  return (
  <UserContextProvider>
  <Container maxWidth='xs' style={{border:"red 1px dotted",maxWidth:"445px",padding:'0',height:window.innerHeight+'px'}}>
      <Router>
        <Switch>
          <Route  path='/account'>         
            <Account/>  
          </Route>    
        </Switch>
      <AppBottomNavigation/>
      </Router>
    </Container>    
  </UserContextProvider>

  );
}

export default App;
