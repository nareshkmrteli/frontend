import { Typography } from '@material-ui/core'
import React from 'react'
export default function Loading({show,top=0}){
    return(
        <>
        {show &&
        <Typography variant='body1' style={{marginTop:top+'px'}} align='center'>
             Loading ...
        </Typography>
        }
        </>
    )
}