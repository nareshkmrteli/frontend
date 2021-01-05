import { Container, Tab, Tabs } from '@material-ui/core'
import Loading from 'pages/component/loading'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { OrderModel } from '../../models/order'
import { Pagination } from '../component/pagination'
import { ShopOrderList } from './component/shoporderlist'
export function ListShopOrder(props){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(false)
    const [status, setStatus] = useState(0)
    const history=useHistory()
    useEffect(() => {
        const params={
            shop:true,
        }
        if(status!=0)
            params['status']=status
        setLoading(true)
        setData(false)
        OrderModel({
            action:'listshoporder',
            params:params,
            callback:(data,status)=>{
                setData(data)
                setLoading(false)
            }   
        })
    }, [status])
    return(
        <>
        <Tabs
            value={status}
            onChange={(e,value)=>setStatus(value)}
            indicatorColor='primary'
            textColor='primary'
            scrollButtons='auto'
            ScrollButtonComponent='circle'
            variant='scrollable'
            style={{backgroundColor:'#d2f1ff'}}
        >   
            <Tab label='All' />
            <Tab label='New' />
            <Tab label='Recived' />
            <Tab label='Dispatched' />
            <Tab label='Delivered' />
            <Tab label='Canceled' />
        </Tabs>
        <Container>
            <Loading show={loading} top={20}/>
            <ShopOrderList  results={data && data.results} selectedItemCallback={(e)=>{history.push('/shoporder/detailorder/'+e.selectedItem.id)}} />
            <Pagination prev={data && data.previous} next={data && data.next} />
        </Container>
        </>
    )
}