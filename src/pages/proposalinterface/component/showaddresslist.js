import { ListItemSecondaryAction } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React from "react";
export  function ShowAddressList({results,selectedItemCallback=false, secondaryActionIcon=false,autofocus=false}){
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
                <ListItemText
                primary={item.village}
                secondary={
                    <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                    >
                    {item.pincode}
                    </Typography>
                }
                />
            {  
            secondaryActionIcon && 
            <ListItemSecondaryAction id={item.id} index={i} actionType='SecondaryAction' onClick={onclick}>
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