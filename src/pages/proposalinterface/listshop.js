import { Button, Card, CardContent, Container, makeStyles, Tab, Tabs, TextField } from '@material-ui/core'
import axios from 'axios'
import { Pagination2 } from 'pages/component/pagination'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Url } from 'utility'
import { useDispatch, useSelector } from '../../redux/cart/cart'
import setting from '../../setting'
import { ConditionalDisplay } from '../component/condtionaldisplay'
import { ShowList } from './component/showlist'

const useStyle=makeStyles((theme)=>(
    {
        box:{
                boxShadow:'inset 0 0 5px 1px #eee',
                height:'5px',
                marginTop:'10px',
                width:'100%',
        }
    }
))
async function getShopList(props){
    const data =await axios.get(
        setting.root+'/shop/shop/?format=json',
        {
            params:props.params || {}
        }
        )
    props.callback(data.data)
}

function LevelFilter({level=0,setLevel=console.log}){
    const user_level=window.localStorage.getItem('level')
    let level_choices=[
        'Buyer',
        'Distributer',
        'Farmer'
    ]
    level_choices=level_choices.slice(0,level_choices.length==user_level?user_level:( parseInt(user_level)+1))

    if(level_choices.length<=1)
        return ''
    return(
        <>
        <Tabs
            value={level-1}
            variant='scrollable'
            //index start with zero here so add 1
            onChange={(s,newvalue)=>{setLevel(newvalue+1)}}
            textColor='primary'
            indicatorColor='primary'
            style={{backgroundColor:'azure',width:'100%'}}
        >
            {
                level_choices.map((i)=>(<Tab label={i}/>))
            }
        </Tabs>
        </>
    )
}

export function ListShop(props){
    const url=new Url(document.location.href)
    const [queryParameter, setQueryParameter] = useState(url.search)
    
    const classes=useStyle()
    const cartDispatch=useDispatch()
    const [selectedShop, setSelectedShop] = useState(null)
    const [open, setOpen] = useState(false)
    const cart=useSelector((s)=>{return s.object})
    const [search, setSearch] = useState('')
    const [shoplist, setShoplist] = useState({})
    const [loading, setLoading] = useState(true)
    const location=useLocation()
    const history=useHistory()
    
    useEffect(() => {        
        //update url query string
        if(!queryParameter.search) delete queryParameter.search
        url.search=queryParameter
        history.push(location.pathname+url.getQueryParams()) 
        getShopList({
            params: queryParameter,
            callback:(data)=>{
                setShoplist(data)
                setLoading(false)
            }
        })
    }, [queryParameter])
    
    function selectedShopCallback(e){
        if(e.actionType=='shopClick'){
            var key=false
            for(key in cart)
                break

            if(Object.keys(cart).length==0 || (key && cart[key].shop==e.selectedShop.id) )
                history.push('/shop/listproductshop/?shop='+e.selectedShop.id,e.selectedShop)
            else{
                setOpen(true)
                setSelectedShop(e.selectedShop)
            }
        }
    }
    function continueWithPreviousShop(e){
        setOpen(false)
        var key
        for(key in cart)
            break
        history.push('/shop/listproductshop/?shop='+cart[key].shop)
        setSelectedShop(null)
    }
    function ContinewWithNewShop(e){
        setOpen(false)
        cartDispatch({type:'Default'})
        history.push('/shop/listproductshop/?shop='+selectedShop.id,selectedShop)
        setSelectedShop(null)
    } 
    return(
        <>
            <br/>
            <Container>
                <TextField value={queryParameter.search} name='search' type='search' label='Search a shop' onChangeCapture={(e)=>{setQueryParameter({...queryParameter,page:1,search:e.target.value})}} size='small' fullWidth variant='outlined' />
            </Container>
            <div className={classes.box}/>
            <LevelFilter level={queryParameter.level} setLevel={(newlevel)=>setQueryParameter({...queryParameter,level:newlevel,page:1})}/>
            <Container>   
                <ShowList results={shoplist.results} selectedShopCallback={selectedShopCallback} />
                <ConditionalDisplay  condition={loading} value='Loading...' />
                <ConditionalDisplay  condition={shoplist.results && shoplist.results.length==0} value='Nothting to show' />
            </Container>
            <Pagination2 prev={shoplist.previous} next={shoplist.next} page={queryParameter.page} setPage={(newpage)=>{console.log(newpage);setQueryParameter({...queryParameter,page:newpage})}} />
            {
                open &&     
                <Container  style={{marginLeft:'auto',marginRight:'auto',position:'fixed',left:'0',top:'0',width:'100%',height:'100%',zIndex:'100',backgroundColor:'#00000073'}}>
                    <br/>
                    <Card>
                        <CardContent>
                            You are moving to other store/shop, would you like to remove items from previous store
                            <br/>
                            <br/>
                            <Button variant='contained' color='secondary' fullWidth onClick={continueWithPreviousShop}>
                                No, Continue with previous Store
                            </Button>
                            <br/>
                            <br/>
                            <Button variant='outlined' fullWidth onClick={ContinewWithNewShop}>
                                Yes, continue with new Store
                            </Button>
                        </CardContent>
                    </Card>
                </Container>
            }
        </>
        )
}