import React,{useState,useEffect} from 'react'
import {Container} from "@material-ui/core"
import {ListProduct} from './listproduct'
import {SelectedProduct} from './component/selectedproduct'
export  function ProductSelect({selectedProduct,setSelectedProduct}){  
    
    function selectedProductCallback(p){
        setSelectedProduct(null)
    }
    
    return(
        <>
        {selectedProduct && <SelectedProduct {...selectedProduct} onClick={selectedProductCallback}/>}
        { !(selectedProduct && 1) && <ListProduct selectedProductCallback={setSelectedProduct}/>}
        </>
    );
}
