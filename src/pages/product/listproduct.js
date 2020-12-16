import React,{useState,useEffect} from 'react'
import {Avatar,TextField,Container,List,ListItem,ListItemAvatar,ListItemIcon,ListItemText,makeStyles, Divider,Typography, ListItemSecondaryAction, Button, FormControl, InputLabel, Select} from "@material-ui/core"
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link,useHistory} from'react-router-dom'
import {useDispatch,useSelector} from "../../redux/product/product"
import {productAction} from "../../redux/product/action"
import Loading from "../component/loading"
import ShowList from "./component/showlist"
import {useDispatch as useDispatchCategory,useSelector as useSelectorCategory} from "../../redux/category/category"
import {categoryAction} from "../../redux/category/action"
import qs from "qs"
import {Pagination} from '../component/pagination'
import {LinkButton} from "../component/linkbutton"
import {DropDownInput} from '../component/dropdowninput'
import {ConditionalDisplay} from "../component/condtionaldisplay"
const useStyles = makeStyles((theme)=>({
 
}));

export  function ListProduct({selectedProductCallback=false,secondaryActionIcon=false,autofocus=false}){
    var  componentmounted=false
    const classes=useStyles()
    const productDispatch = useDispatch()
    const product=useSelector((state)=>{
        return {
            list_loading : state.list.list_loading,
            list_load_successful : state.list.list_load_successful,
            list_data : state.list.list_data,
            list_error : state.list.list_error
        }
    });
    const categoryDispatch = useDispatchCategory()
    const category = useSelectorCategory((state)=>{
        return{
            list_loading : state.list.list_loading,
            list_load_successful : state.list.list_load_successful,
            list_data : state.list.list_data
        }
    });
    useEffect(() => {
        componentmounted=true
        const qss=qs.parse(document.location.search,{ignoreQueryPrefix : true})
        productDispatch(productAction.getProductList(qss))
        categoryDispatch(categoryAction.getCategoryList())   
    }, [componentmounted])
    
    function categoryOnChange(value){
        var qss=qs.parse(document.location.search,{ignoreQueryPrefix : true})
        if(!value)
            delete qss.category
        else
            qss['category']=value         
        productDispatch(productAction.getProductList(qss))
    }
    return(
    <Container maxWidth='xs' component='main'  style={{position : "relative"}}>
        <LinkButton link='/product/addproduct/' value='add new Product'/>
        <DropDownInput values={category.list_load_successful && category.list_data.results} keyname='id' value='name' onChange={categoryOnChange} label='category' />        
        <Loading show={product.list_loading}/>
        <ConditionalDisplay condition={!(product.list_data && product.list_data.results.length)} value=':( Nothing to Show' />
        { product.list_load_successful && 
            <>
            <ShowList results={product.list_data.results} selectedProductCallback={selectedProductCallback} secondaryActionIcon={secondaryActionIcon} autofocus={autofocus} />
            <Pagination prev={product.list_data.previous} next={product.list_data.next} />
            </>
        }
    </Container>
    );
}
