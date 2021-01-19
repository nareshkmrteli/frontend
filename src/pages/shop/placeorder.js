import { Button, Card, CardContent, Container, Grid, Paper, Typography } from '@material-ui/core';
import { CheckCircle, KeyboardArrowDown } from '@material-ui/icons';
import { ConditionalDisplay } from 'pages/component/condtionaldisplay';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AddressModel } from '../../models/address';
import { OrderModel } from '../../models/order';
import { useDispatch, useSelector } from '../../redux/cart/cart';
import { ShowList } from './component/productshopshowlist';
import { ShowAddressList } from './component/showaddresslist';

export function PlaceMyOrder(props){
    const [open, setOpen] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [address, setAddress] = useState(null)
    const cartDispatch=useDispatch()
    const {grandTotal,data,qty,shop}=useSelector((s)=>{//state
        let data=[];
        let grandTotal=0
        let shop
        for(const key in s.object){
            data.push(s.object[key])
            grandTotal+=s.object[key].rate*s.cart[key]
            shop=s.object[key].shop
        }
        return {grandTotal,data,qty:s.cart,shop}
    })
    useEffect(() => {
        AddressModel({
            url:'list',
            callback:(data,status)=>{
                setAddress(data)
            }
        })
    }, [])
    //place the order
    function orderSubmit(e){
        if(!selectedAddress) 
            return
        //Field mapping to required field    
        const cartItems=data.map((item)=>{
            return {
              variant:item.variant && item.variant.id,
              qty:qty[item.id],
              rate:item.rate,
              product:item.product.id
            }
        })
        OrderModel({
            action:'create',
            data:{
                shop:shop,
                address:selectedAddress.id,
                items:cartItems
            },
            callback:(data,status)=>{
                if(status==201){
                    setOrderPlaced(true)
                    cartDispatch({type:'default'})
                }
            }
        })       
        
    }
    return(
        <>
        <ConditionalDisplay 
            condition={orderPlaced}
            value={
                <>
                <CheckCircle color='secondary' />
                your Order is Placed
                <Typography align='center'>
                   <Link to='/frontend/myorder' style={{style:'none'}}>
                        Track my order
                    </Link> 
                </Typography>
                </>
            }
        />
        <ConditionalDisplay 
            condition={data && data.length==0 && orderPlaced==false} 
            value={
                <>
                <Typography variant='body1'>
                    You have no order
                </Typography>
                <Typography align='center'>
                   <Link to='/frontend/shop' style={{style:'none'}}>
                        Go to store section
                    </Link> 
                </Typography>
                </>
            } 
        />
        {
            data && data.length !=0 &&
            <>
            <Card>
                <CardContent >
                    <Typography color='textSecondary' variant='caption'>
                        Address
                    </Typography>
                    <Typography>
                        {
                            !selectedAddress ?
                            <Button variant='outlined' fullWidth color='primary' onClick={()=>setOpen(true)}>
                                Select an address
                            </Button>
                            :
                            <Grid container>
                            <Grid item xs={11}>
                            <Typography color='textPrimary'>
                                {selectedAddress.village}
                                <br/>
                                {selectedAddress.pincode}
                            </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <KeyboardArrowDown onClick={()=>setOpen(true)} />
                            </Grid>
                            </Grid>
                        }
                    </Typography>
                </CardContent>
            </Card>
            {   
                open &&
                <Container style={{marginLeft:'auto',marginRight:'auto',position:'fixed',left:'0',top:'0',width:'100%',height:'100%',zIndex:'100',backgroundColor:'#00000073'}}>
                    <br/>
                    <br/>
                    <Paper>
                    <ShowAddressList results={address} selectedItemCallback={(data)=>{setSelectedAddress(data.selectedItem);setOpen(false)}} />           
                    <Link to='/frontend/address/listaddress' style={{textDecoration:'none'}}>
                        <Button fullWidth>
                            Add New Address
                        </Button>
                    </Link>
                    </Paper>
                </Container>
            }
            <ShowList results={data.length!=0 && data} />
            <Typography align='right' component='div' color='initial'>
                <Grid container>
                    <Grid xs={5}>

                    </Grid>
                    <Grid child xs={6} >
                        <Typography style={{color:'#aaaaaa'}}>
                            Grand Toatal : 
                        </Typography>
                    </Grid>
                    <Grid child xs={1}>
                        <Typography style={{color:'#D81B60',fontWeight:'bolder',fontSize:'1.2em'}} align='center'>
                            {grandTotal}/-
                        </Typography>
                    </Grid>
                </Grid>
                 
            </Typography>
            <br/><br/><br/><br/><br/>
            <Typography align='center' component='div' fullWidth style={{position:'absolute',left:'0',bottom:'58px',width:'100%'}}>
                <Button  color='secondary' onClick={orderSubmit} style={{width:'100%',borderRadius:'0',backgroundColor:'#009688',style:'none'}}  variant='contained'>
                    Place my order
                </Button>
            </Typography>
        </>
        } 
    </>
    )
}