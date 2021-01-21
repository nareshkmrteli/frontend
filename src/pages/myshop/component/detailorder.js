import { Avatar, Button, Container, Dialog, DialogActions, DialogContent, Divider, FormControl, Grid, InputLabel, List, ListItem, ListItemAvatar, ListItemText, Select, Typography } from '@material-ui/core'
import { Snackbars } from 'pages/component/snackbar'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { OrderModel } from '../../../models/order'
const status_map={
    '1':'Placed',
    '2':'Accepted',
    '3':'Dispatched',
    '4':'Delivered'
}

function StatusOptions(){
    var option=[]
    for( let key in status_map)
        option.push({key:key,value:status_map[key]})
    return(
        <>
        {option.map((item)=><option value={item.key}>{item.value}</option>)}
        </>
    )
}
function DetailOrderList({results,orderStatusUpdate=null,orderCancel=null}){
    return(
        <>
        {
            results &&
            <List>
            {
                results.items.map((item)=>(
                    <>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar variant='rounded' src={item.product.productimg}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.product.name}
                            secondary={
                                <>
                                qty:{item.qty}<span> </span>
                                rate:{item.rate}<span> </span>
                                price:{item.qty*item.rate}
                                </>
                            }
                        />
                    </ListItem>
                    <Divider/>
                    </>
                    ))
            }
            </List>
        }
        {
            <Typography style={{padding:'5px'}} >
                Total Price : <span style={{padding:'5px',color:'green',fontWeight:'bolder'}}>{results && results.netpay} /-</span>
            </Typography>
        }
        <br/><br/>
        {
            results.status != 5 &&
            <Grid container spacing={1  }>
            <Grid item xs={6}>
                <FormControl fullWidth size='small'>
                <InputLabel htmlFor='order-status-id' style={{margin:'-7px 0px 0px 10px'}}>Order Status</InputLabel>
                <Select value={results.status} native inputProps={{style:{height:'1em'}}} fullWidth id='order-status-id' variant='outlined' label='order status' onChange={(e)=>orderStatusUpdate(e.currentTarget.value)}>
                    <StatusOptions/>
                </Select>
                </FormControl>
            </Grid>
            <Grid item xs={65}>
                <Button fullWidth color='secondary' variant='outlined' onClick={orderCancel}>
                    Cancel Order
                </Button>
            </Grid>
            </Grid>
        }
        {
            results.status==5 &&
            <Typography style={{color:'red'}}>
                Order is Canceled
            </Typography>
        }
        </>
    )
} 

//main component is here
export function DetailOrder(props){
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(false)
    const [snackbar, setSnackbar] = useState(false)
    const {orderid}=useParams()
    const history=useHistory()
    useEffect(() => {
        OrderModel({
            action:'detailorder',
            id:orderid,
            params:{shop:true},
            callback:(data,status)=>{
                if(status==200)
                    setData(data)
                else
                    alert('somthing is wrong')
            }

        })
    }, [])
    function orderStatusUpdate(status_value){
        OrderModel({
            action:'changestatus',
            id:data.id,
            params:{shop:true},
            data:{status:status_value},
            callback:(_data,status)=>{
                if(status==200){
                    setData({...data,status:status_value})
                    setSnackbar(false)
                    setSnackbar(true)
                }
            }
        })
    }
    function orderCancel(){
        orderStatusUpdate(5)
    }
    return(
        <Container>
            <Snackbars message='Order Status Updated' visible={snackbar} />
            <DetailOrderList results={data} orderCancel={()=>setOpen(true)} orderStatusUpdate={orderStatusUpdate} />
            <Dialog fullWidth open={open}>
                <DialogContent>
                    Please,confirm to delete the order 
                </DialogContent>
                <DialogActions>
                <button onClick={orderCancel}>yes</button>
                <button onClick={()=>setOpen(false)}>no</button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
