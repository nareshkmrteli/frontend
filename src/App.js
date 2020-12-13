import React,{useContext,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import { Container,createMuiTheme,ThemeProvider } from '@material-ui/core';


import AppBottomNavigation from './component/bottomnavigation'
import {UserContextProvider} from './context/usercontext'
import {Address} from './pages/address/address'
import {Account} from './pages/account/account'
import {Inventory} from './pages/inventory/inventory'
function App() {
  const [isUserLogined, setIsUserLogined] = useState(false)
  const intialContext={isUserLogined,setIsUserLogined}

  const theme = createMuiTheme({
    spacing:8,
    mixins:{
      toolbar:{
        minHeight: 35
        }
     },
     typography:{
       fontSize:14,
     }
    })
  
  return (
  <ThemeProvider theme={theme}>
  <UserContextProvider>
  <Container maxWidth='xs' style={{border:"red 1px dotted",maxWidth:"445px",padding:'0',height:window.innerHeight+'px'}}>
      <Router>
        <Switch>
          <Route  path='/account'>         
            <Account/>  
          </Route>    
          <Route  path='/address'>         
            <Address/>
          </Route>
          <Route  path='/inventory'>         
            <Inventory/>
          </Route>  
        </Switch>
      <AppBottomNavigation/>
      </Router>
    </Container>    
  </UserContextProvider>
  </ThemeProvider>
  );
}

export default App;
