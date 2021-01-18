import { Avatar, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Switch, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import setting from '../../setting';
import userAvator from '../../static/avator.jpg';
import { toMultipart } from '../../utility';
import { UserContext } from './../../context/usercontext';
const useStyles = makeStyles((theme)=>({
    root: {
        backgroundColor: theme.palette.background.paper,
      },
    customborder:{
        
    },
    Medium:{
        height:theme.spacing(6),
        width:theme.spacing(6),
        display:"inline-block",
        border:'3px #eeeeee solid'
    },
    Large:{
        height:theme.spacing(12),
        width:theme.spacing(12),
        display:"inline-block"
    }
}));
export default function MyShopProfile(){
    const [userLevel, setUserLevel] = useState(window.localStorage.getItem('level'))
    const [shop_name] = useState(window.localStorage.getItem('shop_name'))
    const [shop_image,setShop_image] = useState(window.localStorage.getItem('shop_image'))
    const [shop_active,setShop_active] = useState(window.localStorage.getItem('shop_active'))
    const [shop_id] = useState(window.localStorage.getItem('shop_id'))
    const classes=useStyles()
    const usercontext = useContext(UserContext)
    const history=useHistory()
    const name=window.localStorage.getItem('name')
    const mobileno=window.localStorage.getItem('mobileno')
    const [refresh, setRefresh] = useState(false) //its use to re-render the component to support localStorage update
    if(!usercontext.isUserLogined())
        history.push('/account/signin');
    useEffect(() => {
        if(userLevel){
            if(!shop_name){
                axios.get(setting.root+'/shopsetting/shopsetting/?format=json').then(({data})=>{
                    window.localStorage.setItem('shop_name',data[0].name)
                    window.localStorage.setItem('shop_image',data[0].image) 
                    window.localStorage.setItem('shop_active',data[0].active)
                    window.localStorage.setItem('shop_id',data[0].id) 
                    
                })
            }
        }
    }, [])
    
    function setImageRequest(e){
        const file=e.target.files
        if(!file) 
            return

        const formdata=new toMultipart({'image':file[0]})
        formdata.run()
        console.log(formdata.formdata)
        axios.post(setting.root+"/shopsetting/shopsetting/"+shop_id+"/setimage/",formdata.formdata,{
            headers:{
                'content-type':'application/multipart'
            }
        })
            .then(({data})=>{
                window.localStorage.setItem('shop_image',data.image)
                setShop_image(data.image)
            })
    }
    function setActive(e){
        const new_active=e.target.checked
        window.localStorage.setItem('shop_active',new_active)
        setShop_active(new_active)
        axios.post(setting.root+'/shopsetting/shopsetting/'+shop_id+'/setActive/',{active:new_active?"True":"False"}).catch(()=>{
            setShop_active(!shop_active)
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
                            src={shop_image}
                            onClick={()=>document.getElementById('user_profile_file_input').click()}
                        >
                            <img style={{height:'100%'}} src={userAvator} />
                        </Avatar>
                        <input hidden type='file' id='user_profile_file_input' onChange={setImageRequest} accept='image/*' />
                        <Link to='/account'>
                            <Avatar  style={{position:'absolute',right: '10px',top: '33%'}}>
                                <AccountCircle className={classes.Medium}  />
                            </Avatar>
                        </Link>
                   </ListItemAvatar>
                </ListItem>
                <ListItem style={{display:'block'}}>
                    <Typography display='block' variant='body2' color='textSecondary' align='center'>
                        {shop_name}
                    </Typography>
                </ListItem>
                <div style={{height:'2px',boxShadow:'inset 0px 0px 5px 0px hsl(0deg 0% 91%)'}}></div>
                
                { 
                    // if user level  not defined that mean shop does not exist 
                    // level is store to localstore during login
                    !userLevel ?  
                    <>  
                    <Link to='/myshop/shopsetting' style={{textDecoration:"none",color:"inherit"}}>
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
                    <ListItem>
                        <Grid container xs >
                            <Grid item xs={10}>
                                <Typography variant='body1'>
                                    Activate The Shop
                                    <br/>
                                    <Typography variant='caption' color='#a2a2a2'>
                                        you will recive the new order if the shop is activated
                                    </Typography> 
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Switch 
                                    checked={shop_active}
                                    onChange={setActive}
                                />
                            </Grid>
                        </Grid>
                    </ListItem>
                    <div style={{height:'2px',boxShadow:'inset 0px 0px 5px 0px hsl(0deg 0% 91%)'}}></div>
                    <Link to='/myshop/shopsetting' style={{textDecoration:"none",color:"inherit"}}>
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
                    <Link to='/myshop/proposal' style={{textDecoration:"none",color:"inherit"}}>
                        <ListItem button>
                                    <ListItemText>
                                    Create/edit my proposal
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <KeyboardArrowRightIcon/>
                                    </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                    <Divider/>
                    </>
                }
            </List>
        </Container>
    );
}