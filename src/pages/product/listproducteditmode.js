import { DeleteOutline } from '@material-ui/icons';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { productAction } from '../../redux/product/action';
import { useDispatch } from '../../redux/product/product';
import { ListProduct } from './listproduct';
export  function ListProductEditMode(props){   
    const productDispatch=useDispatch()
    const history=useHistory()
    const location=useLocation()

    function  selectedProductCallback(e){
        switch(e.actionType){
            case 'SecondaryAction':
                !(e.target.style.color=='red')?
                    e.target.style.color='red':
                    productDispatch(productAction.deleteProduct(e.selectedProduct.id)) && 
                    productDispatch({type:'LIST_REMOVE_ELEMENT',id:e.selectedProduct.id})
                break
            case 'productClick':
                history.push("/myshop/product/editproduct/"+e.selectedProduct.id,e.selectedProduct)
                break
                
        }
       
    }  
    return(
        <>
            <ListProduct 
            selectedProductCallback={selectedProductCallback} 
            secondaryActionIcon={<DeleteOutline/>}
            edit={true}
            />
        </>
    );
}
