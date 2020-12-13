import React,{useState} from 'react'
import {Avatar,TextField, Container,List,ListItem,ListItemAvatar,ListItemIcon,ListItemText,makeStyles, Divider,Typography, ListItemSecondaryAction, Button} from "@material-ui/core"
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link,useHistory} from'react-router-dom'
import {useDispatch,useSelector} from "../../redux/inventory/inventory"
import {inventoryAction} from "../../redux/inventory/action"
const useStyles = makeStyles((theme)=>({
    root: {
        backgroundColor: theme.palette.background.paper,
      },
    customborder:{
        
    },
    Large:{
        height:theme.spacing(12),
        width:theme.spacing(12),
        display:"inline-block"
    },
    StyleNone:{
        textDecoration:"none"
    }
}));

export  function ListInventory(props){
    const classes=useStyles()
    const inventoryDispatch = useDispatch()
   
    inventoryDispatch(inventoryAction.getInventoryList())
    
    return(
    <Container maxWidth='xs' component='main'  style={{position:"relative",padding:"0px"}} className={classes.customborder}>
        <br/>
        <Link to='/inventory/addinventory' className={classes.StyleNone}>
            <Button
            variant='outlined'
            size='medium'
            color='primary'
            fullWidth
            >
                Add New Inventory
            </Button>
        </Link>
        <br/>
        <br/>
        <Typography variant='body1' align='center'>
            Loading ...
        </Typography>
    </Container>
    );
}