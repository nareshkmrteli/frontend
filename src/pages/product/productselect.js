import React from 'react'
import { SelectedProduct } from './component/selectedproduct'
import { ListProduct } from './listproduct'
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
