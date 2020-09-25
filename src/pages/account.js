import React from 'react'
import {Avatar,TextField, Container,List,ListItem,ListItemAvatar,ListItemIcon,ListItemText,makeStyles, Divider,Typography, ListItemSecondaryAction, Button} from "@material-ui/core"
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
const useStyles = makeStyles((theme)=>({
    root: {
        backgroundColor: theme.palette.background.paper,
      },
    customborder:{
        border:"1px red dotted",
    },
    Large:{
        height:theme.spacing(12),
        width:theme.spacing(12),
        display:"inline-block"
    }
}));
export default function Account(){
    const classes=useStyles()
    return(
        <Container maxWidth='xs' component='main'  style={{position:"relative",padding:"0px"}} className={classes.customborder}>
            <List style={{height:"100px",backgroundImage:"linear-gradient(to right, #007cde, rgb(35 230 255 / 75%)),url('/static/account-background-2.jpg')",backgroundBlendMode:"darken"}}>
                
            </List>
            <List component='nav' aria-label="main mailbox folders"  style={{backgroundColor:"transparent", position:"relative",top:"-65px"}} className={classes.root}>
                <ListItem button style={{textAlign:"center",width:"100%",display:"inline-block"}}>
                    <ListItemAvatar >
                        <Avatar 
                        alt={"avator"}
                        src="/static/avator.jpg" 
                        className={classes.Large}/>
                   </ListItemAvatar>
                </ListItem>
                <ListItem style={{display:'block'}}>
                    <Typography display='block' variant='body2' color='textSecondary' align='center'>
                        Naresh<br/>9929175289
                    </Typography>
                </ListItem>
                <Divider/>
                <ListItem button>
                            <ListItemText>
                            Change Password
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <KeyboardArrowRightIcon/>
                            </ListItemSecondaryAction>
                </ListItem>
                <Divider/>
                
            </List>
        </Container>
    );
}