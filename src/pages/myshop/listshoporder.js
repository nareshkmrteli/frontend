import { Container, Tab, Tabs } from '@material-ui/core'
import Loading from 'pages/component/loading'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { OrderModel } from '../../models/order'
import { Pagination2 } from '../component/pagination'
import { Url } from './../../utility'
import { ConditionalDisplay } from './../component/condtionaldisplay'
import { ShopOrderList } from './component/shoporderlist'

export function ListShopOrder(props){
    const url=new Url(document.location.href)
    const [queryParameter, setQueryParameter] = useState(url.search)
    
    const location=useLocation()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(false)
    const [status, setStatus] = useState(0)
    const history=useHistory()
    useEffect(() => {
        
        delete queryParameter.format
        url.search=queryParameter
        url.add('shop',true)
        status && url.add('status',status)
        status==0 && (delete queryParameter.status)
        history.push(location.pathname+url.getQueryParams()) 

        setLoading(true)
        setData(false)
        OrderModel({
            action:'listshoporder',
            params:queryParameter,
            callback:(data,status)=>{
                setData(data)
                setLoading(false)
            }   
        })
    }, [queryParameter,status])
    return(
        <>
        <Tabs
            value={status}
            onChange={(e,value)=>{setQueryParameter({...queryParameter,page:1}); setStatus(value)}}
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
            <ConditionalDisplay  condition={data.results && data.results.length==0} value='Nothting to show' />
            <ShopOrderList  results={data && data.results} selectedItemCallback={(e)=>{history.push('/frontend/myshop/detailorder/'+e.selectedItem.id)}} />
            <Pagination2 prev={data.previous} next={data.next} page={queryParameter.page && parseInt(queryParameter.page)} setPage={(newpage)=>{console.log(newpage);setQueryParameter({...queryParameter,page:newpage})}} />
            <br/><br/><br/><br/>
        </Container>
        </>
    )
}