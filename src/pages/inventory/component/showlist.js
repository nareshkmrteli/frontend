import { ListItemSecondaryAction } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Delete } from '@material-ui/icons';
import React from "react";
export default function ShowList({results,list_load_successful}){
    return(
        <>
            { list_load_successful ?
                <List>
                {
                results.map((inventory,i)=>(
                    <>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar variant='rounded' sizes='400px' alt="Remy Sharp" src={inventory.product_img} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={inventory.product_name}
                        secondary={
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                            rate: {inventory.variant[0].rate} quantity: {inventory.variant[0].qty}
                            </Typography>
                        }
                        />
                    <ListItemSecondaryAction>
                        <Delete/>
                    </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                    </>
                ))
                }
                </List> :""
            }
        </>
    );
}