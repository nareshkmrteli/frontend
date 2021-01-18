import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { ConditionalDisplay } from 'pages/component/condtionaldisplay';
import { Pagination } from 'pages/component/pagination';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { OrderModel } from '../../models/order';
import { Url } from '../../utility';
import { MyOrderList } from './component/myorderlist';
export function ListMyOrder(props){
    const [refresh, setRefresh] = useState(false)
    const [cancelOrderObject, setCancelOrderObject] = useState(false)
    const [data, setData] = useState(null)
    const history=useHistory()
    useEffect(() => {
        const url=new Url(document.location.search)
        OrderModel({
            action:'list',
            params:url.search,
            callback:(data,status)=>{  
                console.log(data,status)   
                if( status==200)
                    setData(data)
                else if(status==404 && url.search['page']){
                    const url2=new Url(document.location.search)
                    window.a=url2
                    url2.search['page']=parseInt(url2.search['page'])-1
                    history.push('/frontend/myorder/'+url2.url())
                }
            }
        })
    }, [refresh])
    function cancelOrder(){
        OrderModel({
            action:'delete',
            params:{},
            id:cancelOrderObject.item.id,
            callback:(d,status)=>{     
                if( status==204){
                    setRefresh(!refresh)
                }
            }
        })
        setCancelOrderObject(false)
                    
    }
    function setRating({id,rating}){
        OrderModel({
            action:'setrating',
            params:{},
            data:{'rating':rating},
            id:id,
            callback:(d,status)=>{     
                if( status==204){
                    setRefresh(!refresh)
                }
            }
        })
    }
    return(
        <>
        <ConditionalDisplay condition={data && data.results.length==0}  value='You have no order' />
        {/*show order list  */ }
        <MyOrderList results={data && data.results} setRating={setRating} cancelOrder={(d)=>{setCancelOrderObject(d)}} />
        <Pagination prev={data && data.previous} next={data && data.next}/>
        <Dialog open={!!cancelOrderObject} onClose={()=>setCancelOrderObject(false)}>
            <DialogContent>
                Are you sure you want cancel the order
            </DialogContent>
            <DialogActions>
                <button onClick={()=>{cancelOrder()}}>
                    yes
                </button>
                <button onClick={()=>setCancelOrderObject(false)}>
                    no
                </button>
            </DialogActions>

        </Dialog>
        </>
   )
}