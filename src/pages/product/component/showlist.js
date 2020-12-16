import React from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ListItemSecondaryAction } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
export default function ShowList({results,selectedProductCallback=false, secondaryActionIcon=false,autofocus=false}){
    function onclick(e){
        const index= e.currentTarget.getAttribute("index")
        const actionType = e.currentTarget.getAttribute("type") 
        selectedProductCallback && selectedProductCallback({selectedProduct:results[index],actionType:actionType})
    }
    return(
        <List>
        {
        results &&
        results.map((product,i)=>(
            <>
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
            </>
        ))
        }
        </List> 
    );
}