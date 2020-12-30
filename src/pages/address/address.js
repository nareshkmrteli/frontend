import React from "react"
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { CreateAddress } from './createaddress'
import { EditAddress } from './editaddress'
import { ListAddress } from './listaddress'
export function Address(){
    const {path}=useRouteMatch()
    return(
        <Switch>
            <Route path={`${path}/createaddress`}> 
                <CreateAddress />
            </Route>
            <Route path={`${path}/listaddress`}> 
                <ListAddress />
            </Route>
            <Route path={`${path}/editaddress`}>
                <EditAddress />
            </Route>
        </Switch>
    )
}
