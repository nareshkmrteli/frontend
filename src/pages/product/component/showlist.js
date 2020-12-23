import { ListItemSecondaryAction } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React from "react";
export default function ShowList({results,selectedProductCallback=false, secondaryActionIcon=false,autofocus=false}){
    function onclick(e){
        const target=e.currentTarget
        const index= e.currentTarget.getAttribute("index")
        const actionType = e.currentTarget.getAttribute("actionType") 
        selectedProductCallback && selectedProductCallback({selectedProduct:results[index],actionType:actionType,target:target})
    }
    return(
        <List>
        {
        results &&
        results.map((product,i)=>(
            <React.Fragment key={product.id}>
            <ListItem alignItems="flex-start" id={product.id} index={i} actionType='productClick' autoFocus={autofocus==product.id} button onClick={onclick}>
                <ListItemAvatar>
                <Avatar variant='rounded' sizes='400px' alt="Remy Sharp" src={product.productimg} />
                </ListItemAvatar>
                <ListItemText
                primary={product.name}
                secondary={
                    <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                    >
                    {product.description}
                    </Typography>
                }
                />
            {  
            secondaryActionIcon && 
            <ListItemSecondaryAction id={product.id} index={i} actionType='SecondaryAction' onClick={onclick}>
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