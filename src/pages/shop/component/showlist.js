import { ListItemSecondaryAction } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
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
            <React.Fragment key={shop.id}>
            <ListItem alignItems="flex-start" id={shop.id} index={i} actionType='shopClick' autoFocus={autofocus===shop.id} button onClick={onclick}>
                <ListItemAvatar>
                <Avatar variant='rounded' sizes='400px' alt="Remy Sharp" src={shop.image} />
                </ListItemAvatar>
                <ListItemText
                primary={shop.name}
                secondary={
                    <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                    >
                    {shop.description}
                    </Typography>
                }
                />
            {  
            secondaryActionIcon && 
            <ListItemSecondaryAction id={shop.id} index={i} actionType='SecondaryAction' onClick={onclick}>
                {secondaryActionIcon}
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