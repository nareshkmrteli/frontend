import React from "react"
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom"
import { CreateProduct } from "./createproduct"
import { EditProduct } from "./editproduct"
import { ListProduct } from './listproduct'
import { ListProductEditMode } from "./listproducteditmode"

export function Product(){
    const {path}=useRouteMatch()
    const {search}=useLocation()
    return(
                <Switch>
                    <Route exact path={path}
                    render={()=>
                        <ListProduct key={search} />} 
                    />                            
                    <Route exact path={`${path}/createproduct`}>
                        <CreateProduct/>
                    </Route> 
                    <Route exact path={`${path}/listproducteditmode`}
                        render={()=>
                        <ListProductEditMode key={search} />} 
                    />      
                    <Route exact path={`${path}/editproduct/:id`}>
                        <EditProduct/>
                    </Route>        
                </Switch>             
        );
}