import React from 'react'
import {Link} from "react-router-dom"
import {Button} from "@material-ui/core"
export function LinkButton({link,value}){
    return(
        <>
        <br/>
        <Link to={link} style={{textDecoration:"none"}}>
            <Button
            variant='outlined'
            size='medium'
            color='primary'
            fullWidth
            >
                {value}
            </Button>
        </Link>
        <br/>
        <br/>
        </>
    )
}