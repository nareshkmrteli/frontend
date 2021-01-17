import { ListItemSecondaryAction } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from '../../../redux/cartproposal/cart';


export  function ShowList({results,selectedShopCallback=false, secondaryActionIcon=false,autofocus=false}){
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
        const index= e.currentTarget.getAttribute("index")
        console.log(variant,actionType,product,shop)
        cartDispatch({type:'ADD_OR_UPDATE',key:actionType,product:product,variant:variant,shop:shop,object:results[index]})
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
                    rate: {shop.rate} <span></span>
                    stoke: {shop.qty}<span> </span>
                    {
                        cart[shop.id] &&
                        <span>price:{cart[shop.id]*shop.rate}</span>
                    }
                    </Typography>
                }
                />
            {  
            <ListItemSecondaryAction alignItems='centre' variantid={shop.id} id={shop.product.id} index={i} actionType='SecondaryAction'>
                {!cart[shop.id] ?
                <button actionType='+' onClick={cartHandleOnClick} shop={shop.shop} index={i} variant={shop.id} product={shop.product.id}>add</button>:
                <div style={{display:'inline'}}>
                <KeyboardArrowUpOutlined actionType='+' onClick={cartHandleOnClick} index={i} shop={shop.shop} variant={shop.id} product={shop.product.id} style={{height:'33%',display:'block'}}/>
                {
                    <input value={cart[shop.id] || 0} style={{textAlign:'center',height:'33%',width:'24px',fontSize:'100%',margin:'0',border:'0',padding:'0'}}/>
                }
                <KeyboardArrowDownOutlined actionType='-' onClick={cartHandleOnClick} index={i} shop={shop.shop} variant={shop.id} product={shop.product.id} style={{height:'33%',display:'block'}}/>
                </div>}
            </ListItemSecondaryAction>
            }
            
            </ListItem>
            <Divider/>
            </React.Fragment>
        ))
        }
        </List> 
    );
}