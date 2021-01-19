import { Avatar, Container, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Typography } from "@material-ui/core";
import { KeyboardArrowRight, Store } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import userAvator from '../../static/avator.jpg';
import { UserContext } from './../../context/usercontext';
import { setImage } from './../../models/users';
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
    const [userLevel, setUserLevel] = useState(window.localStorage.getItem('level'))
    const classes=useStyles()
    const usercontext = useContext(UserContext)
    const history=useHistory()
    const name=window.localStorage.getItem('name')
    const mobileno=window.localStorage.getItem('mobileno')
    const [refresh, setRefresh] = useState(false) //its use to re-render the component to support localStorage update
    if(!usercontext.isUserLogined())
        history.push('/frontend/account/signin');
    
    function setImageRequest(e){
        const file=e.target.files
        console.log(e.target.files)
        if(!file) return
        setImage({
            file:file[0],
            callback:(data,status)=>{
                window.localStorage.setItem('image',data.image)
                setRefresh(!refresh)
            }
        })
    }
    return(
        <Container maxWidth='xs' component='main'  style={{position:"relative",padding:"0px"}} className={classes.customborder}>
            <List style={{height:"100px",backgroundImage:"linear-gradient(to right, #007cde, rgb(35 230 255 / 75%)),url('/static/frontend/build/static/account-background-2.jpg')",backgroundBlendMode:"darken"}}>
                
            </List>
            <List component='nav' aria-label="main mailbox folders"  style={{backgroundColor:"transparent", position:"relative",top:"-65px"}} className={classes.root}>
                <ListItem button style={{textAlign:"center",width:"100%",display:"inline-block"}}>
                    <ListItemAvatar >
                        <Avatar 
                            alt={"avator"}
                            className={classes.Large}
                            src={window.localStorage.getItem('image')}
                            onClick={()=>document.getElementById('user_profile_file_input').click()}
                        >
                            <img style={{height:'100%'}} src={userAvator} />
                        </Avatar>
                        <input hidden type='file' id='user_profile_file_input' onChange={setImageRequest} accept='image/*' />
                        <Link to='/frontend/myshop/myshopprofile'>
                            <Avatar  style={{position:'absolute',right: '10px',top: '33%'}}>
                                <Store/>
                            </Avatar>
                        </Link>
                   </ListItemAvatar>
                </ListItem>
                <ListItem style={{display:'block'}}>
                    <Typography display='block' variant='body2' color='textSecondary' align='center'>
                        {name}<br/>{mobileno}
                    </Typography>
                </ListItem>
                <Link to='/frontend/address/listaddress' style={{textDecoration:"none",color:"inherit"}}>
                    <ListItem button>
                                <ListItemText>
                                Address
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <KeyboardArrowRight/>
                                </ListItemSecondaryAction>
                    </ListItem>
                </Link>                
                <Divider/>
                <Link to='/frontend/myorder' style={{textDecoration:"none",color:"inherit"}}>
                    <ListItem button>
                                <ListItemText>
                                My Order
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <KeyboardArrowRight/>
                                </ListItemSecondaryAction>
                    </ListItem>
                </Link>
                <Divider/>
                <div style={{height:'2px',boxShadow:'inset 0px 0px 5px 0px hsl(0deg 0% 91%)'}}></div>
                <Link to='/frontend/account/setnewpassword' style={{textDecoration:"none",color:"inherit"}}>
                    <ListItem button>
                                <ListItemText>
                                Change Password
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <KeyboardArrowRight/>
                                </ListItemSecondaryAction>
                    </ListItem>
                </Link>
                <Divider/>
                <Link to='/frontend/account/signout' style={{textDecoration:"none",color:"inherit"}}>
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