import { Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { ProductShopModel } from '../../models/productshop'
import { Url } from '../../utility'
import { ShowList } from './component/productshopshowlist'
export function ListProductShop(props){
    const [data, setData] = useState({})

    useEffect(() => {
        const url=new Url(document.location.href)
        ProductShopModel({
            action:'list',
            params:url.search,
            callback:(data,status)=>{
                if(status==200)
                    setData(data)
            }
        })
    }, [])

    return(
        <Container>
            <ShowList results={data.results} />
        </Container>
    )
}