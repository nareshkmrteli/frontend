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
export  function ShowList({results,selectedShopCallback=false, secondaryActionIcon=false,autofocus=false}){
    function onclick(e){
        const target=e.currentTarget
        const index= e.currentTarget.getAttribute("index")
        const actionType = e.currentTarget.getAttribute("actionType") 
        selectedShopCallback && selectedShopCallback({selectedShop:results[index],actionType:actionType,target:target})
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
                    stoke: {shop.variant[0].qty}
                    </Typography>
                }
                />
            {  
            <ListItemSecondaryAction alignItems='centre' id={shop.product.id} index={i} actionType='SecondaryAction' onClick={onclick}>
                <div style={{display:'inline'}}>
                <KeyboardArrowUpOutlined style={{height:'33%',display:'block'}}/>
                <input value='45' style={{textAlign:'center',height:'33%',width:'24px',fontSize:'100%',margin:'0',border:'0',padding:'0'}}/>
                <KeyboardArrowDownOutlined style={{height:'33%',display:'block'}}/>
                </div>
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