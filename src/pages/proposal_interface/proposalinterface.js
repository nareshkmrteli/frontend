import { Button, Typography } from '@material-ui/core'
import React from "react"
import { Link, Route, Switch, useLocation, useRouteMatch } from "react-router-dom"
import { useSelector } from '../../redux/cartproposal/cart'
import { ListProductShop } from './listproductshop'
import { ListShop } from "./listshop"
import { PlaceMyOrder } from './placeorder'

function PlaceMyOrderLink({cart,path}){
    const login=window.localStorage.getItem('isUserLogined')
    return(
        <>
        {
            Object.keys(cart).length!=0 &&
            <Link to={login?`${path}/placemyorder/`:'/frontend/account/signin'}>
            <Typography align='center' component='div' fullWidth style={{position:'absolute',left:'0',bottom:'58px',width:'100%'}}>
                <Button  color='secondary' style={{width:'100%',borderRadius:'0',backgroundColor:'#009688',style:'none'}}  variant='contained'>
                    Accept the proposal
                </Button>
            </Typography>
            </Link>
        }
        </>
    )
}
export function ProposalInterface(){
    const cart=useSelector((s)=>{ return s.object})
    const {path}=useRouteMatch()
    const {search}=useLocation()
    return(
                <>
                <Switch>
                    <Route exact path={path}
                    render={()=>
                        <>
                        <ListShop/>
                        <PlaceMyOrderLink cart={cart} path={path} />
                        </>} 
                    />     
                    <Route exact path={`${path}/listproductproposal/`}
                    render={()=>
                        <>
                        <ListProductShop key={search} />
                        <PlaceMyOrderLink cart={cart} path={path} />
                        </>} 
                    />     
                    <Route exact path={`${path}/placemyorder/`}
                    render={()=>
                        <PlaceMyOrder key={search} />} 
                    />  
                </Switch>                    
                </>                
        );
}