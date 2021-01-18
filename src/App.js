import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import AppBottomNavigation from './component/bottomnavigation';
import { ConditionalDisplay } from './component/condtionaldisplay';
import ShopBottomNavigation from './component/shopbottomnavigation';
import { UserContextProvider } from './context/usercontext';
import { Account } from './pages/account/account';
import { Address } from './pages/address/address';
import { Inventory } from './pages/inventory/inventory';
import { MyOrder } from './pages/myorder/myorder';
import { MyShop } from './pages/myshop/myshop';
import MyShopProfile from './pages/myshop/myshopprofile';
import { ShopSetting } from "./pages/myshop/shopsetting";
import { Product } from './pages/product/product';
import { Proposal } from './pages/proposal/proposal';
import { ProposalInterface } from './pages/proposal_interface/proposalinterface';
import { Shop } from './pages/shop/shop';
import { CartContext } from './redux/cart/cart';
import { CartProposalContext } from './redux/cartproposal/cart';
import { CategoryContext } from "./redux/category/category";
import { ProductContext } from "./redux/product/product";
import { ProposalContext } from "./redux/proposal/proposal";
function App() {
  const history=useHistory()
  if(window.localStorage.getItem('isUserLogined')==null)
    history.push('/frontend/account/signin')
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
  const shopExist=(window.localStorage.getItem('shop_id'))
  return (
  <ThemeProvider theme={theme}>
  <UserContextProvider>
  <CategoryContext>
  <ProductContext>
  <CartContext>
  <CartProposalContext>
  <ProposalContext>
    <Container maxWidth='xs' style={{position:'relative',border:"red 1px dotted",maxWidth:"445px",padding:'0',height:window.innerHeight+'px'}}>
        <Switch>
         <Route exact  path='/frontend/account/'>         
            <Account/>  
            <AppBottomNavigation/>
          </Route>    
          <Route  path='/frontend/address'>         
            <Address/>
            <AppBottomNavigation/>
          </Route>
          <Route  path='/frontend/myorder'>         
            <MyOrder/>
            <AppBottomNavigation/>
          </Route> 
          <Route  path='/frontend/shop'>         
            <Shop/>
            <AppBottomNavigation/>
          </Route> 
          <Route  path='/frontend/myshop/inventory'>      
            <ConditionalDisplay condition={shopExist}>
              <Inventory/>
            </ConditionalDisplay>   
            <ShopBottomNavigation/>
          </Route>  
          <Route  path='/frontend/myshop/product'>   
            <ConditionalDisplay condition={shopExist}>
              <Product/>
            </ConditionalDisplay>
            <ShopBottomNavigation/>
          </Route>  
          <Route  path='/frontend/myshop/shopsetting'>         
            <ShopSetting/>
            <ShopBottomNavigation/>
          </Route>
          <Route  path='/frontend/myshop/proposal'>         
            <ConditionalDisplay condition={shopExist}>
              <Proposal/>
            </ConditionalDisplay>  
            <ShopBottomNavigation/>
          </Route> 
          <Route  path='/frontend/myshop/proposalinterface'>         
            <ConditionalDisplay condition={shopExist}>
              <ProposalInterface/>
            </ConditionalDisplay>  
            <ShopBottomNavigation/>
          </Route> 
          <Route  path='/frontend/myshop/myshopprofile'>         
            <MyShopProfile/>
            <ShopBottomNavigation/>
          </Route> 
          <Route  path='/frontend/myshop'>    
            <ConditionalDisplay condition={shopExist}>
              <MyShop/>
            </ConditionalDisplay>
            <ShopBottomNavigation/>
          </Route> 
          <Route exact path='/frontend'>
            <Shop/>
            <AppBottomNavigation/>
          </Route>
          <Route exact path=''>
            <Shop/>
            <AppBottomNavigation/>
          </Route>
          </Switch>
      
    </Container>
    </ProposalContext>
    </CartProposalContext>
    </CartContext>
  </ProductContext>
  </CategoryContext>    
  </UserContextProvider>
  </ThemeProvider>
  );
}

export default App;
