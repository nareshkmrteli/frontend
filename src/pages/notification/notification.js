import { Divider, List } from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import setting from '../../setting'
import { Url } from '../../utility'
import { Pagination2 } from '../component/pagination'
import { notification_choices_component as ncc } from './notification_choices_componenet'

export function Notification(props){
    const [data, setData] = useState(null)
    const [querydata, setQuerydata] = useState(null)
    const history=useHistory()
    
    if(window.localStorage.getItem('isUserLogined')==null)
        history.push('/frontend/account/signin')

    useEffect(() => {
        const url=new Url(document.location.search)
        if(url.search.page)
            url.search.page=parseInt(url.search.page)
        setQuerydata(url.search)
    }, [])
    
    useEffect(() => {
        if(querydata)
        {
            const url=new Url('')
            url.search=querydata
            history.push(url.getQueryParams())
            Axios.get(setting.root+'/notification/notification/',{params:querydata}).then((res)=>{
                const status=res.status
                if(status==200){
                    setData(res.data)
                }
            })
        }
    }, [querydata])
    
    return(
        <>
        <List>
        {
            data && data.results.length && 
            data.results.map((item,i)=>(
                <>
                    {
                        ncc[item.nType](item)                        
                    }
                    
                <Divider/>
                </>
            ))
        }
        </List>
        <Pagination2  prev={data && data.previous} next={data && data.next} page={querydata && querydata.page} setPage={(new_page)=>setQuerydata({...querydata,page:new_page})} />
        <br/><br/><br/>
        </>
    )
}
