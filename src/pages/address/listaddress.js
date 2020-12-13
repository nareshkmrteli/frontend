import React,{useState,useEffect} from "react"
import {Card, CardActionArea, CardContent, Container, Typography,CardActions, Button, ButtonBase,makeStyles} from '@material-ui/core'
import {AddressModel} from 'models/address'
import { AddRounded,DeleteForeverOutlined } from "@material-ui/icons"
import {CreateAddress} from './createaddress'
import {Link,useHistory} from 'react-router-dom'
const useStyles=makeStyles((theme)=>({
    customCard:{
        boxShadow:"#d6d6d6 0px 0px 1px 1px",
    }
}))

export function ListAddress(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingCall, setLoadingCall] = useState(true)
    const history=useHistory()
    const classes=useStyles()
    useEffect(() => {
        loadaddresses()
        setLoadingCall(false)
    }, [loadingCall])
    function loadaddresses(){
        AddressModel({url:'list',callback:callback})
    }
    function callback(res,status){
        if(status==200){
            setLoading(false)
            setData(res)
            
        }
    }
    function addressEdit(e){
        const editEddress=data.find((address)=>(address.addressid==e.target.addressid));
        history.push('/address/editaddress',{editAddress:editEddress});
    }
    function addressRemove(e){
        const addressid=e.target.getAttribute('addressid');
        AddressModel({url:'delete',callback:addressDeleteCallback,data:{id:addressid}})
    }
    function addressDeleteCallback(res,status){
        if(status==200){
            const copydata=[...data];
            const newdata=copydata.filter(function(address){
                if(address.id==res.addressid)
                    return false;
                else
                    return true;
            });
            setData(newdata)

        }
    }
    
    return(
        <Container>
            <br/>
            <Link to='./createaddress'>
                <Button fullWidth variant='outlined' color='primary'>
                    Add address
                </Button>
            </Link>
            <br/>
            <br/>
            {(()=>{
                if(loading)
                return(
                    <Typography align='center'>
                        <br/>
                        loading...
                    </Typography>
                )
            return data.map((d)=>{
            return( <div>
                    <Card className={classes.customCard}>
                    <CardActionArea>
                    <CardContent>
                        <Typography variant='body1'>
                            {d.village}
                        </Typography>
                        <Typography variant='body2'>
                            {d.pincode}
                        </Typography>
                        
                    </CardContent>
                    </CardActionArea>
                        <hr style={{margin:"0 10px 0 10px",border:'0',borderTop:"#e6e6e6e8 1px solid"}}/>
                        <CardActions style={{textAlign:"right"}}>
                            <ButtonBase   variant='text' size='small' addressid={d.id} onClick={addressEdit}>
                                edit
                            </ButtonBase>
                            <ButtonBase style={{color:"red"}} variant='text' size='small' addressid={d.id} color='secondary' onClick={addressRemove}>
                                remove
                            </ButtonBase>
                        </CardActions>
                    </Card>
                    <br/>
                    </div>)})
            })()}
        </Container>
    )
}