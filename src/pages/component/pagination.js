import React from "react"
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {Button, Paper,Link} from "@material-ui/core"
export function Pagination({prev,next}){
    return(
        <>
        {   (prev || next) &&
            <Paper style={{textAlign:"right"}}>
                {prev && <Link to={prev}><Button  size='small'><NavigateBeforeIcon /></Button></Link>}
                {next && <Link to={next}><Button  size='small'><NavigateNextIcon /></Button></Link>}
            </Paper>
        }
        </>
    )
}