import { SignalCellular0Bar } from "@material-ui/icons"
import React from "react"
import {useRouteMatch,Route,Switch} from 'react-router-dom'
import {CreateAddress} from './createaddress'
import {ListAddress} from './listaddress'
import {EditAddress} from './editaddress'
export function Address(){
    const {path,url}=useRouteMatch()
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
