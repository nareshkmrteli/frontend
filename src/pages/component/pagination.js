import { Button, Paper } from "@material-ui/core";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';

export function Pagination({prev,next}){
    const location=useLocation()
    const history=useHistory()
    console.log(location,next)
    prev=prev && location.pathname+'?'+prev.split('?')[1].replace('format=json','').replace('&&','')    
    next=next && location.pathname+'?'+next.split('?')[1].replace('format=json','').replace('&&','')    
    return(
        <>
        {   (prev || next) &&
            <Paper style={{textAlign:"right"}}>
                {prev && <Link to={prev}><Button onClick={()=>history.push(prev)}   size='small'><NavigateBeforeIcon /></Button></Link>}
                {next && <Link to={next}><Button  size='small'><NavigateNextIcon /></Button></Link>}
            </Paper>
        }
        </>
    )
}