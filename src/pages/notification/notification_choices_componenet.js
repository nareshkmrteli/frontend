import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const date_now=new Date()
const day_now=date_now.getDay()

const status_map={
    '1':'Placed',
    '2':'Accepted',
    '3':'Dispatched',
    '4':'Delivered',
    '5':'Canceled'
}
function any({notification}){
    return(
        <>
        {
            notification
        }
        </>
    )
}
function neworder({notification,time}){
    notification=JSON.parse(notification)
    var date=new Date(time)
    if(date_now-date<=172800000)
        date= date.getDay()==day_now?'today':date.getDay()+1==day_now?'tomorrow':date.toLocaleString();
    else
        date=date.toLocaleString()
    return(
        <>
        <Link to={'/frontend/myshop/detailorder/'+notification.order} style={{width:'100%',textDecoration:'none',color:'inherit'}} >
        <ListItem>
            <ListItemAvatar>
                <Avatar src={notification.shop_image} variant='square' />
            </ListItemAvatar>
            <ListItemText 
            primary={
                <Typography>
                    {notification.shop_name}
                </Typography>
                }
            secondary={
                <Typography  variant='body2' style={{color:'#999999'}}>
                    New order on your shop,<span style={{color:'#FF5722'}}> {date}</span>,  Rs {notification.netpay} /- 
                </Typography>
            }
            >
            </ListItemText>
        </ListItem>
        </Link>
        </>
    )
}
function orderstatusupdated({notification,time}){
    notification=JSON.parse(notification)
    var date=new Date(time)
    if(date_now-date<=172800000)
        date= date.getDay()==day_now?'today':date.getDay()+1==day_now?'tomorrow':date.toLocaleString();
    else
        date=date.toLocaleString()
    return(
        <>
        <ListItem>
        <ListItemAvatar>
            <Avatar src={notification.shop_image} variant='square' />
        </ListItemAvatar>
        <ListItemText 
        primary={
            <Typography>
                {notification.shop_name}
            </Typography>
            }
        secondary={
            <Typography  variant='body2' style={{color:'#999999'}}>
                Order is {status_map[notification.status+'']},<span style={{color:'#FF5722'}}> {date}</span>, Rs {notification.netpay} /-
            </Typography>
        }
        >
        </ListItemText>
        </ListItem>
        </>
    )
}
function proposalaccepted({notification,time}){
    notification=JSON.parse(notification)
    var date=new Date(time)
    if(date_now-date<=172800000)
        date= date.getDay()==day_now?'today':date.getDay()+1==day_now?'tomorrow':date.toLocaleString();
    else
        date=date.toLocaleString()
    return(
        <>
        <ListItem>
        <ListItemAvatar>
            <Avatar src={notification.shop_image} variant='square' />
        </ListItemAvatar>
        <ListItemText 
        primary={
            <Typography>
                {notification.shop_name}
            </Typography>
            }
        secondary={
            <Typography  variant='body2' style={{color:'#999999'}}>
                your proposal accepted, Rs {notification.netpay} /-
            </Typography>
        }
        >
        </ListItemText>
        </ListItem>
        </>
    )
}
function shopordercancel({notification,time}){
    notification=JSON.parse(notification)
    var date=new Date(time)
    if(date_now-date<=172800000)
        date= date.getDay()==day_now?'today':date.getDay()+1==day_now?'tomorrow':date.toLocaleString();
    else
        date=date.toLocaleString()
    return(
        <>
        <ListItem>
        <ListItemAvatar>
            <Avatar src={notification.shop_image} variant='square' />
        </ListItemAvatar>
        <ListItemText 
        primary={
            <Typography>
                {notification.shop_name}
            </Typography>
            }
        secondary={
            <Typography  variant='body2' style={{color:'#999999'}}>
                Order is {status_map[notification.status+'']},<span style={{color:'#FF5722'}}> {date}</span>, Rs {notification.netpay} /-
            </Typography>
        }
        >
        </ListItemText>
        </ListItem>
        </>
    )
}

export const notification_choices_component={
    '0':any,
    '1':neworder,
    '2':orderstatusupdated,
    '3':proposalaccepted,
    '4':shopordercancel
}
