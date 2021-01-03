import React from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { CartContext } from '../../redux/cart/cart';
import { DetailOrder } from './component/detailorder';
import { ListShopOrder } from './listshoporder';
export function ShopOrder(){
    const {path}=useRouteMatch()
    const {search}=useLocation()
    return(
                <Switch>
                    <CartContext>
                    <Route exact path={path}
                    render={()=>
                        <ListShopOrder key={document.location.search}/>} 
                    /> 
                    <Route exact path={`${path}/detailorder/:orderid`}
                    render={()=>
                        <DetailOrder key={document.location.search}/>} 
                    />            
                    </CartContext>                    
                </Switch>             
        );
}