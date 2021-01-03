import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import AppBottomNavigation from './component/bottomnavigation';
import { UserContextProvider } from './context/usercontext';
import { Account } from './pages/account/account';
import { Address } from './pages/address/address';
import { Inventory } from './pages/inventory/inventory';
import { MyOrder } from './pages/myorder/myorder';
import { Product } from './pages/product/product';
import { Shop } from './pages/shop/shop';
import { ShopOrder } from './pages/shoporder/shoporder';
import { ShopSetting } from "./pages/shopsetting";
import { CartContext } from './redux/cart/cart';
import { CategoryContext } from "./redux/category/category";
import { ProductContext } from "./redux/product/product";
function App() {
  const history=useHistory()
  if(window.localStorage.getItem('isUserLogined')==null)
    history.push('/account/signin')
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
  <CategoryContext>
  <ProductContext>
  <CartContext>
    <Container maxWidth='xs' style={{position:'relative',border:"red 1px dotted",maxWidth:"445px",padding:'0',height:window.innerHeight+'px'}}>
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
          <Route  path='/product'>         
            <Product/>
          </Route>  
          <Route  path='/shopsetting'>         
            <ShopSetting/>
          </Route>
          <Route  path='/shop'>         
            <Shop/>
          </Route> 
          <Route  path='/myorder'>         
            <MyOrder/>
          </Route> 
          <Route  path='/shoporder'>         
            <ShopOrder/>
          </Route> 
        </Switch>
      <AppBottomNavigation/>
      
    </Container>
    </CartContext>
  </ProductContext>
  </CategoryContext>    
  </UserContextProvider>
  </ThemeProvider>
  );
}

export default App;
