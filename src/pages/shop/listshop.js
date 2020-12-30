import { Container, TextField } from '@material-ui/core'
import axios from 'axios'
import { Pagination } from 'pages/component/pagination'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Url } from 'utility'
import setting from '../../setting'
import { ConditionalDisplay } from '../component/condtionaldisplay'
import { ShowList } from './component/showlist'
async function getShopList(props){
    const data =await axios.get(
        setting.root+'/shop/shop/?format=json',
        {
            params:props.params || {}
        }
        )
    props.callback(data.data)
}
export function ListShop(props){
    const [search, setSearch] = useState('')
    const [shoplist, setShoplist] = useState({})
    const [loading, setLoading] = useState(true)
    const location=useLocation()
    const history=useHistory()
    useEffect(() => {
        const url=new Url(document.location.href)
        search && url.add('search',search)
        getShopList({
            params: url.search,
            callback:(data)=>{
                setShoplist(data)
                setLoading(false)
            }
        })
    }, [search])
    function selectedShopCallback(e){
        if(e.actionType=='shopClick')
            history.push('/shop/listproductshop/?shop='+e.selectedShop.id,e.selectedShop)
    }
    return(
        <Container>
            <br/>
            <TextField name='search' type='search' label='Search' onChangeCapture={(e)=>{setSearch(e.target.value)}} size='small' fullWidth variant='outlined' onChange={(e)=>{setSearch(e.target.value)}} />
            <ShowList results={shoplist.results} selectedShopCallback={selectedShopCallback} />
            <ConditionalDisplay  condition={loading} value='Loading...' />
            <Pagination prev={shoplist.previous} next={shoplist.next} />
        </Container>
        )
}