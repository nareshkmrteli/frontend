import React from "react"
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom"
import { ListProductShop } from './listproductshop'
import { ListShop } from "./listshop"
export function Shop(){
    const {path}=useRouteMatch()
    const {search}=useLocation()
    return(
                <Switch>
                    <cartContext>
                    <Route exact path={path}
                    render={()=>
                        <ListShop key={search} />} 
                    />     
                    <Route exact path={`${path}/listproductshop/`}
                    render={()=>
                        <ListProductShop key={search} />} 
                    />           
                    </cartContext>            
                </Switch>             
        );
}