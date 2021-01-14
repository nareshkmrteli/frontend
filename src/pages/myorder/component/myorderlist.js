import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { CloseOutlined } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import React, { useState } from "react";
import { useDispatch, useSelector } from '../../../redux/cart/cart';
const status_map={
    '1':'Placed',
    '2':'Accepted',
    '3':'Dispatched',
    '4':'Delivered',
    '5':'Canceled'
}

export  function MyOrderList({results,setRating,selectedItemCallback=false,cancelOrder=alert,autofocus=false}){
    const cart=useSelector((s)=>{return s.cart })
    const cartDispatch=useDispatch()
    const [openId, setOpenId] = useState(null)
    function onclick(e){
        const target=e.currentTarget
        const index= e.currentTarget.getAttribute("index")
        const actionType = e.currentTarget.getAttribute("actionType") 
        selectedItemCallback && selectedItemCallback({selectedItem:results[index],actionType:actionType,target:target})
    }
    function cartHandleOnClick(e){//event
        const product=e.currentTarget.getAttribute('product')
        const variant=e.currentTarget.getAttribute('variant')
        const item=e.currentTarget.getAttribute('item')
        const  actionType=e.currentTarget.getAttribute('actionType')
        console.log(variant,actionType,product,item)
        cartDispatch({type:'ADD_OR_UPDATE',key:actionType,product:product,variant:variant,item:item})
    }
    return(
        <List>
        {
        results &&
        results.map((item,i)=>(
            <React.Fragment key={item.shop.id}>
            <ListItem alignItems="flex-start" id={item.shop.id} index={i} actionType='itemClick' autoFocus={autofocus===item.shop.id} button onClick={()=>setOpenId(item.id)}>
                <ListItemAvatar>
                <Avatar variant='rounded' sizes='400px' alt="Remy Sharp" src={item.shop.image} />
                </ListItemAvatar>
                <ListItemText
                primary={item.shop.name}
                secondary={
                    <>
                    <Typography
                        component="span"
                        variant="body2"
                        style={{color:'#aaaaaa'}}
                    >
                    status : Order is {status_map[item.status]}
                    </Typography>
                    {item.rating &&<Rating style={{verticalAlign:'sub'}} defaultValue={item.rating} size="small" />}
                    </>
                }
                />
            </ListItem>
            {
                !item.rating && item.status =='5' &&
                <ListItem style={{backgroundColor:'#eeeeee'}}>
                    <ListItemText
                        primary={
                            <>
                            <span color='#616161'> Rate this order : </span>
                            <Rating style={{verticalAlign:'bottom'}} max={5} onChange={(o,value)=>setRating({id:item.id,rating:value})}  value={item.rating} size="large" />
                            </>
                    }
                    />
                </ListItem>
            }
            <Divider/>
            <Dialog fullWidth open={openId==item.id} onClose={()=>setOpenId(null)}>
                <DialogTitle>
                    <Grid container>
                        <Grid child  xs={11}>
                            My Order Item
                        </Grid>
                        <Grid child xs={1}>
                            <CloseOutlined onClick={()=>setOpenId(null)} />
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    <List>
                        <Container>
                        {
                            item.items.map((a,j)=>(
                                <>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar variant='rounded' sizes='400px' alt="Remy Sharp" src={a.product.productimg}  />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            a.product.name
                                        }
                                        secondary={
                                            <>
                                                Quantity: {a.qty} <span></span>
                                                Rate: {a.rate}<span> </span>
                                                {
                                                    <span>price:{a.rate*a.qty}</span>
                                                }
                                            </>
                                        }
                                    />
                                </ListItem>
                                <Divider/>
                                </>
                            ))    
                        }
                        </Container>
                    </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions autoCapitalize={false}>
                    <Typography fullWidth align='left' style={{width:'100%'}} component='div'>
                    <Button size='small' orderindex={i} orderid={item.id} style={{color:'red'}} autoCapitalize={false} disableElevation 
                        onClick={(e)=>cancelOrder({item:item,index:i})} 
                    >
                        Cancel Order
                    </Button>
                    </Typography>
                </DialogActions>
            </Dialog>
            </React.Fragment>
        ))
        }
        </List> 
        
    );
}