import { Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { OrderModel } from '../../models/order'
import { Pagination } from '../component/pagination'
import { ShopOrderList } from './component/shoporderlist'
export function ListShopOrder(props){
    const [data, setData] = useState(false)
    const [status, setStatus] = useState(null)
    const history=useHistory()
    useEffect(() => {
        const params={
            shop:true,
        }
        if(status!=null)
            params['status']=status
        OrderModel({
            action:'listshoporder',
            params:params,
            callback:(data,status)=>{
                setData(data)
            }   
        })
    }, [])
    return(
        <Container>
            <ShopOrderList  results={data && data.results} selectedItemCallback={(e)=>{history.push('/shoporder/detailorder/'+e.selectedItem.id)}} />
            <Pagination prev={data && data.previous} next={data && data.next} />
        </Container>
    )
}