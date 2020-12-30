import React from "react"
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom"
import { InventoryContext } from "../../redux/inventory/inventory"
import { CreateInventory } from './createinventory'
import { EditInventory } from './editinventory'
import { ListInventory } from './listinventory'
export function Inventory(){
    const {path}=useRouteMatch()
    const location=useLocation()
    return(
            <InventoryContext>
                <Switch>
                    <Route exact path={path}>
                        <ListInventory/>
                    </Route> 
                    <Route exact path={`${path}/addinventory`}
                        render={()=><CreateInventory key={location.search}/>}
                    />  
                    <Route exact path={`${path}/editinventory/:id`}>
                        <EditInventory/>
                    </Route>               
                </Switch>             
            </InventoryContext>
        );
}