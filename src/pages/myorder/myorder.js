import React from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import { CartContext } from '../../redux/cart/cart';
import { ListMyOrder } from './listmyorder';
export function MyOrder(){
    const {path}=useRouteMatch()
    const {search}=useLocation()
    return(
                <Switch>
                    <CartContext>
                    <Route exact path={path}
                    render={()=>
                        <ListMyOrder/>} 
                    />           
                    </CartContext>                    
                </Switch>             
        );
}