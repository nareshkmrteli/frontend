import React from "react"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Icon, ListItemSecondaryAction } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
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
                        <EditIcon/>
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