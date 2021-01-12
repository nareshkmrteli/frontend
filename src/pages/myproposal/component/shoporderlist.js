import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { KeyboardArrowDown } from '@material-ui/icons';
import React, { useState } from "react";
import { useDispatch, useSelector } from '../../../redux/cart/cart';
const status_map={
    '1':'Placed',
    '2':'Accepted',
    '3':'Dispatched',
    '4':'Delivered',
    '5':'Canceled'
}

export  function ShopOrderList({results,selectedItemCallback=false,cancelOrder=alert,autofocus=false}){
    const cart=useSelector((s)=>{return s.cart })
    const cartDispatch=useDispatch()
    const [openId, setOpenId] = useState(null)
    function onclick(e){
        const target=e.currentTarget
        const index= e.currentTarget.getAttribute("index")
        const actionType = e.currentTarget.getAttribute("actionType") 
        selectedItemCallback && selectedItemCallback({selectedItem:results[index],actionType:actionType,target:target})
    }
    return(
        <List>
        {
        results &&
        results.map((item,i)=>(
            <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start" id={item.id} index={i} actionType='itemClick' autoFocus={autofocus===item.id} button onClick={onclick}>
                <ListItemAvatar>
                <Avatar variant='rounded' sizes='400px' src={item.user.image} alt={ item.user.name} />
                </ListItemAvatar>
                <ListItemText
                primary={item.user.name+' / '+item.user.mobileno}
                secondary={
                    <Typography
                        component="span"
                        variant="body2"
                        style={{color:'#aaaaaa'}}
                    >
                    status : Order is {status_map[item.status]}
                    <KeyboardArrowDown style={{verticalAlign:'bottom'}} fontSize='0.5em' />
                    </Typography>
                }
                />
            </ListItem>
            <Divider/>
            </React.Fragment>
        ))
        }
        </List> 
        
    );
}