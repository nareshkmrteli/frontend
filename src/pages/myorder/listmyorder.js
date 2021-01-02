import React, { useEffect } from 'react';
import { OrderModel } from '../../models/order';
export function ListMyOrder(props){
    useEffect(() => {
        OrderModel({
            action:'list',
            params:{},
            callback:(data,status)=>{                
            }
        })
    }, [])
    return(
        <>
        </>
   )
}