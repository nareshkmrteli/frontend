import { Button, Container, makeStyles } from "@material-ui/core";
import qs from "qs";
import React, { useEffect } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { inventoryAction } from "../../redux/inventory/action";
import { useDispatch, useSelector } from "../../redux/inventory/inventory";
import Loading from "../component/loading";
import { Pagination } from "../component/pagination";
import ShowList from "./component/showlist";

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
    var  componentmounted=false
    const classes=useStyles()
    const history=useHistory()
    const location=useLocation()
    const parms=useParams()
    const inventoryDispatch = useDispatch()
    const inventory=useSelector((state)=>{
        return {
            list_loading:state.list.list_loading,
            list_load_successful:state.list.list_load_successful,
            list_data:state.list.list_data
        }
    });

    function deleteListItem(ids){
        inventoryDispatch({type:'LIST_REMOVE_ELEMENT',id:ids})
        inventoryDispatch(inventoryAction.deleteInventory(ids))
    }

    function editInventory(inventory){
        history.push(`${location.pathname}/editinventory/`+inventory.id,inventory)
    }
    useEffect(() => {
        componentmounted=true
        const qss=qs.parse(document.location.search.replace('format=json','').replace('&&',''),{ignoreQueryPrefix:true});
        inventoryDispatch(inventoryAction.getInventoryList(qss))   
    }, [parms])
    
    return(
    <Container maxWidth='xs' component='main'  style={{position:"relative"}} className={classes.customborder}>
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
        <Loading show={inventory.list_loading}/>
        <ShowList 
            list_load_successful={inventory.list_load_successful} 
            results={inventory.list_data.results} 
            deleteListItem={deleteListItem} 
            editInventory={editInventory}
        />      
        { 
            inventory.list_load_successful && 
            <Pagination prev={inventory.list_data.previous} next={inventory.list_data.next} />
        }
    </Container>
    );
}