import { Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
export function ConditionalDisplay({condition=false,children}){
    return(
        <>
        {
        condition? 
        children
        :
        <>
        <br/><br/><br/><br/><br/>
        <Typography color='textSecondary' align='center' variant='subtitle1'>
            Please setup the shop Profile to sell the product<br/> 
            <Link to='/frontend/myshop/shopsetting' style={{textDecoration:"none",color:"blue"}}>
                Setup my shop
            </Link>
        </Typography>
        </>
        }
        </>
    )
}