import React from 'react'
import {Typography} from '@material-ui/core'
export default function Loading({show}){
    return(
        <>
        {show &&
        <Typography variant='body1' align='center'>
             Loading ...
        </Typography>
        }
        </>
    )
}