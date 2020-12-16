import {useRouteMatch,Route,Switch} from "react-router-dom"
import React from "react"
import {ListInventory} from './listinventory'
import {InventoryContext} from "../../redux/inventory/inventory"
import {CreateInventory} from './createinventory'
export function Inventory(){
    const {path,url}=useRouteMatch()
    return(
            <InventoryContext>
                <Switch>
                    <Route exact path={path}>
                        <ListInventory/>
                    </Route> 
                    <Route exact path={`${path}/addinventory`}>
                        <CreateInventory/>
                    </Route>               
                </Switch>             
            </InventoryContext>
        );
}