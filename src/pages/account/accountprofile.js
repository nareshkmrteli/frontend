import { Avatar, Container, Divider, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Typography } from "@material-ui/core";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
        history.push('/account/signin');
    
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
            <List style={{height:"100px",backgroundImage:"linear-gradient(to right, #007cde, rgb(35 230 255 / 75%)),url('/static/account-background-2.jpg')",backgroundBlendMode:"darken"}}>
                
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
                            <img style={{width:'100%'}} src="/static/avator.jpg" />
                        </Avatar>
                        <input hidden type='file' id='user_profile_file_input' onChange={setImageRequest} accept='image/*' />
                   </ListItemAvatar>
                </ListItem>
                <ListItem style={{display:'block'}}>
                    <Typography display='block' variant='body2' color='textSecondary' align='center'>
                        {name}<br/>{mobileno}
                    </Typography>
                </ListItem>
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
                <Link to='/myorder' style={{textDecoration:"none",color:"inherit"}}>
                    <ListItem button>
                                <ListItemText>
                                My Order
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <KeyboardArrowRightIcon/>
                                </ListItemSecondaryAction>
                    </ListItem>
                </Link>
                <Divider/>
                <div style={{height:'2px',boxShadow:'inset 0px 0px 5px 0px hsl(0deg 0% 91%)'}}></div>
                { 
                    // if user level  not defined that mean shop does not exist 
                    // level is store to localstore during login
                    !userLevel ?  
                    <>  
                    <Link to='/shopsetting' style={{textDecoration:"none",color:"inherit"}}>
                    <ListItem button>
                                <ListItemText>
                                Setup my shop
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <KeyboardArrowRightIcon/>
                                </ListItemSecondaryAction>
                    </ListItem>
                    </Link>
                    <Divider/>
                    </>
                    :
                    <>
                    <Link to='/shopsetting' style={{textDecoration:"none",color:"inherit"}}>
                        <ListItem button>
                                    <ListItemText>
                                    Shop Setting
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
                    <Link to='/proposal' style={{textDecoration:"none",color:"inherit"}}>
                        <ListItem button>
                                    <ListItemText>
                                    Proposal
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <KeyboardArrowRightIcon/>
                                    </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                    <Divider/>
                    <Link to='/myshop/shoporder' style={{textDecoration:"none",color:"inherit"}}>
                        <ListItem button>
                                    <ListItemText>
                                    Shop Order
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <KeyboardArrowRightIcon/>
                                    </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                    <Divider/>
                    </>
                }
                <div style={{height:'2px',boxShadow:'inset 0px 0px 5px 0px hsl(0deg 0% 91%)'}}></div>
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