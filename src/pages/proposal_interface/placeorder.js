import { Button, Grid, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { ConditionalDisplay } from 'pages/component/condtionaldisplay';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderModel } from '../../models/proposalorder';
import { useDispatch, useSelector } from '../../redux/cartproposal/cart';
import { ShowList } from './component/productshopshowlist';

export function PlaceMyOrder(props){
    const [open, setOpen] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState(false)
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
    //place the order
    function orderSubmit(e){
        //Field mapping to required field    
        const cartItems=data.map((item)=>{
            return {
              variant:item.id,
              qty:qty[item.id],
              rate:item.rate,
              
            }
        })
        OrderModel({
            action:'create',
            data:{
                shop:shop,
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
                   <Link to='/myorder' style={{style:'none'}}>
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
                   <Link to='/shop' style={{style:'none'}}>
                        Go to store section
                    </Link> 
                </Typography>
                </>
            } 
        />
        {
            data && data.length !=0 &&
            <>
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
                    Place my proposal
                </Button>
            </Typography>
        </>
        } 
    </>
    )
}