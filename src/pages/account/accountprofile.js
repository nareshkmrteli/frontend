import React,{useContext,useState} from 'react'
import {Avatar,TextField, Container,List,ListItem,ListItemAvatar,ListItemIcon,ListItemText,makeStyles, Divider,Typography, ListItemSecondaryAction, Button} from "@material-ui/core"
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link,useHistory} from'react-router-dom'
import {UserContext} from './../../context/usercontext'
import {} from './../../models/users'
const useStyles = makeStyles((theme)=>({
    root: {
        backgroundColor: theme.palette.background.paper,
      },
    customborder:{
        
    },
    Large:{
        height:theme.spacing(12),
        width:theme.spacing(12),
        display:"inline-block"
    }
}));
export default function AccountProfile(){
    const classes=useStyles()
    const usercontext = useContext(UserContext)
    const history=useHistory()
    const name=window.localStorage.getItem('name')
    const mobileno=window.localStorage.getItem('mobileno')
    
    if(!usercontext.isUserLogined())
        history.push('/account/signin');
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
                        {name}<br/>{mobileno}
                    </Typography>
                </ListItem>
                <Divider/>
                <Link to='/account/setnewpassword' style={{textDecoration:"none",color:"inherit"}}>
                    <ListItem button>
                                <ListItemText>
                                Change Password
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <KeyboardArrowRightIcon/>
                                </ListItemSecondaryAction>
                    </ListItem>
                </Link>
                <Divider/>
                <Link to='/address/listaddress' style={{textDecoration:"none",color:"inherit"}}>
                    <ListItem button>
                                <ListItemText>
                                Address
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <KeyboardArrowRightIcon/>
                                </ListItemSecondaryAction>
                    </ListItem>
                </Link>
                <Divider/>
                <Link to='/inventory' style={{textDecoration:"none",color:"inherit"}}>
                    <ListItem button>
                                <ListItemText>
                                Inventory
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <KeyboardArrowRightIcon/>
                                </ListItemSecondaryAction>
                    </ListItem>
                </Link>
                <Divider/>
                <Link to='/account/signout' style={{textDecoration:"none",color:"inherit"}}>
                    <ListItem button >
                                    <ListItemText>
                                    Logout
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <ExitToAppIcon/>
                                    </ListItemSecondaryAction>
                    </ListItem>
                </Link>
                <Divider/>
                
            </List>
        </Container>
    );
}