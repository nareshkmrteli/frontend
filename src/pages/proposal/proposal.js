import React from "react"
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom"
import { ProposalContext } from "../../redux/proposal/proposal"
import { CreateProposal } from './createproposal'
import { EditProposal } from './editproposal'
import { ListProposal } from './listproposal'
export function Proposal(){
    const {path}=useRouteMatch()
    const location=useLocation()
    return(
            <ProposalContext>
                <Switch>
                    <Route exact path={path}>
                        <ListProposal/>
                    </Route> 
                    <Route exact path={`${path}/addproposal`}
                        render={()=><CreateProposal key={location.search}/>}
                    />  
                    <Route exact path={`${path}/editproposal/:id`}>
                        <EditProposal/>
                    </Route>               
                </Switch>             
            </ProposalContext>
        );
}