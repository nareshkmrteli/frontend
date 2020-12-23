import React from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import { CreateProduct } from "./createproduct"
import { EditProduct } from "./editproduct"
import { ListProduct } from './listproduct'
import { ListProductEditMode } from "./listproducteditmode"

export function Product(){
    const {path}=useRouteMatch()
    return(
                <Switch>
                    <Route exact path={path}>
                        <ListProduct/>
                    </Route> 
                    <Route exact path={`${path}/createproduct`}>
                        <CreateProduct/>
                    </Route> 
                    <Route exact path={`${path}/listproducteditmode`}>
                        <ListProductEditMode />
                    </Route>      
                    <Route exact path={`${path}/editproduct`}>
                        <EditProduct/>
                    </Route>        
                </Switch>             
        );
}