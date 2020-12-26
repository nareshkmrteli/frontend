import React from 'react'
import { useLocation } from 'react-router-dom'
import { FormProduct } from './component/formproduct'
export function EditProduct(props){
    const location=useLocation()
    return(
        <FormProduct intial={location.state} edit={true} />
    )
}