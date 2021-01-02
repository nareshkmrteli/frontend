import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React from "react";
import { useDispatch, useSelector } from '../../../redux/cart/cart';


export  function ShowList({results,selectedShopCallback=false,autofocus=false}){
    const cart=useSelector((s)=>{return s.cart })
    const cartDispatch=useDispatch()
    
    function onclick(e){
        const target=e.currentTarget
        const index= e.currentTarget.getAttribute("index")
        const actionType = e.currentTarget.getAttribute("actionType") 
        selectedShopCallback && selectedShopCallback({selectedShop:results[index],actionType:actionType,target:target})
    }
    function cartHandleOnClick(e){//event
        const product=e.currentTarget.getAttribute('product')
        const variant=e.currentTarget.getAttribute('variant')
        const shop=e.currentTarget.getAttribute('shop')
        const  actionType=e.currentTarget.getAttribute('actionType')
        console.log(variant,actionType,product,shop)
        cartDispatch({type:'ADD_OR_UPDATE',key:actionType,product:product,variant:variant,shop:shop})
    }
    return(
        <List>
        {
        results &&
        results.map((shop,i)=>(
            <React.Fragment key={shop.product.id}>
            <ListItem alignItems="flex-start" id={shop.product.id} index={i} actionType='shop.productClick' autoFocus={autofocus===shop.product.id} button onClick={onclick}>
                <ListItemAvatar>
                <Avatar variant='rounded' sizes='400px' alt="Remy Sharp" src={shop.product.productimg} />
                </ListItemAvatar>
                <ListItemText
                primary={shop.product.name}
                secondary={
                    <Typography
                        component="span"
                        variant="body2"
                        style={{color:'#aaaaaa'}}
                    >
                    rate: {shop.variant[0].rate} <span></span>
                    stoke: {shop.variant[0].qty}<span> </span>
                    {
                        cart[shop.variant[0].id] &&
                        <span>price:{cart[shop.variant[0].id]*shop.variant[0].rate}</span>
                    }
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