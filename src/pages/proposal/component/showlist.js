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

export default function ShowList({results, list_load_successful, deleteListItem,editProposal}){
    const deleteme=0
    function del(ev){
        const ids=ev.currentTarget.id
        const del=ev.currentTarget.del
        if (del=='1'){
            deleteListItem(ids)
        }
        else{
            ev.currentTarget.style.color='red';
            ev.currentTarget.del='1'
        }
    }
    function editproposal(event){
        const id=event.currentTarget.id
        const index=event.currentTarget.getAttribute("aindex")
        editProposal(results[index])
    }
    return(
        <>
            { list_load_successful ?
                <List>
                {
                results.map((proposal,i)=>(
                    <React.Fragment key={proposal.id}>
                    <ListItem alignItems="flex-start" id={proposal.id} aindex={i} button onClick={editproposal}>
                        <ListItemAvatar>
                            <Avatar variant='rounded' sizes='400px' alt="Remy Sharp" src={proposal.product_img} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={proposal.product_name}
                        secondary={
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                            rate: {proposal.variant[0].rate} quantity: {proposal.variant[0].qty}
                            </Typography>
                        }
                        />
                    <ListItemSecondaryAction  id={proposal.id} del={deleteme} onClick={del}>
                        <Delete />
                    </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                    </React.Fragment>
                ))
                }
                </List> :""
            }
        </>
    );
}