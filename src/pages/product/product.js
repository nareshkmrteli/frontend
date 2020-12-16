import {useRouteMatch,Route,Switch} from "react-router-dom"
import React from "react"
import {ListProduct} from './listproduct'
import {ProductContext} from "../../redux/product/product"
import {CategoryContext, categoryContext} from '../../redux/category/category'
import {ProductSelect} from "./productselect"
export function Product(){
    const {path,url}=useRouteMatch()
    return(
                <Switch>
                    <Route exact path={path}>
                        <ListProduct/>
                    </Route> 
                    <Route exact path={`${path}/addproduct`}>
                        
                    </Route> 
                    <Route exact path={`${path}/selectproduct`}>
                        <ProductSelect />
                    </Route>              
                </Switch>             
        );
}