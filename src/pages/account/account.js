import React from "react"
import RecoverPassword from './recoverpassword'
import AccountProfile from "./accountprofile"
import SetNewPassword from './setnewpassword'
import SignIn from './signin';
import SignUp from './signup'
import VerificationCode from './verificationcode'
import Signout from './signout'

import {useRouteMatch,Route,Switch} from "react-router-dom"
export function Account(){
    const {path,url}=useRouteMatch()
    return(
            <Switch>
                <Route exact path={path}>
                    <AccountProfile/>
                </Route>
                <Route exact path={`${path}/signup`}>
                    <SignUp/>
                </Route>
                <Route exact path={`${path}/signin`}>
                    <SignIn/>
                </Route>
                <Route exact path={`${path}/recoverpassword`}>
                    <RecoverPassword/>
                </Route >
                <Route exact path={`${path}/:id/verificationcode`}>
                    <VerificationCode/>
                </Route>
                <Route  path={`${path}/setnewpassword`} component={SetNewPassword}/>
                <Route path={`${path}/signout`}>
                    <Signout/>
                </Route>

                
            </Switch>   
    
        );
}