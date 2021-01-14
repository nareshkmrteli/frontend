import { Container } from '@material-ui/core'
import { Pagination } from 'pages/component/pagination'
import React, { useEffect, useState } from 'react'
import { ProductShopModel } from '../../models/productproposal' // its copy of product component so may be look like product component
import { useSelector } from '../../redux/cartproposal/cart'
import { Url } from '../../utility'
import { ShowList } from './component/productshopshowlist'
export function ListProductShop(props){
    const [data, setData] = useState({})
    const [pagination, setPagination] = useState({prev:null,next:null})
    const cart=useSelector((s)=>{return s.cart})
    useEffect(() => {
        const url=new Url(document.location.href)
        ProductShopModel({
            action:'list',
            params:url.search,
            callback:(data,status)=>{
                if(status==200){
                    setData(data)
                    setPagination({prev:data.previous,next:data.next})
                }
            }
        })
    }, [])

    return(
        <Container>
            <ShowList results={data.results} />
            <Pagination {...pagination}/>
        </Container>
    )
}