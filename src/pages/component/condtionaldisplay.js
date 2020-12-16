import { Typography } from '@material-ui/core'
import React from 'react'
export function ConditionalDisplay({condition=false,value}){
    return(
        <>
        {
        condition && 
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Typography color='textSecondary' align='center' variant='subtitle1'>
            {value}
        </Typography>
        </>
        }
        </>
    )
}