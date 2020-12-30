import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AccountProfile from "./accountprofile";
import RecoverPassword from './recoverpassword';
import SetNewPassword from './setnewpassword';
import SignIn from './signin';
import Signout from './signout';
import SignUp from './signup';
import VerificationCode from './verificationcode';

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