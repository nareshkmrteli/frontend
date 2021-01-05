import { Avatar, Button, Card, CardContent, Container, Grid, Select, Switch, Typography } from '@material-ui/core';
import { ImageOutlined } from '@material-ui/icons';
import axios from 'axios';
import { TextField } from 'final-form-material-ui';
import { AddressModel } from 'models/address';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { toMultipart } from 'utility';
import { ShowImage } from '../../component/showimage';
import setting from '../../setting';
import { Snackbars } from '../component/snackbar';

// api end point regard the shop setting
async function ShopSettingAxios(action,data,callback){
    let method,url,headers={},d // d is FromData instance
    
    switch(action){
        case 'list':
            method='GET';
            url='';
            data={}
            
            break;
        case 'create':
            method='POST';
            url='';
            d=new toMultipart(data)
            data=d.run()
            headers={
                'content-type': 'multipart/form-data'
            }
            break;
        case 'update':
            method='PATCH';
            url=data.id+'/';
            d=new toMultipart(data)
            data=d.run()
            headers={
                'content-type': 'multipart/form-data'
            }
            break;
        case 'delete':
            method='POST';
            url=data.id+'/';
            data={}
            break;
    }

    var shopsetting={}
    var address=[]
    try
    {
        shopsetting = await axios({
        method:method,
        url:setting.root+'/shopsetting/shopsetting/'+url+'?format=json',
        data:data,
        headers:headers   
        })
        shopsetting=shopsetting.data

    }catch(e){
        console.log(e)
    }
    //if request is list then the address list also need for select options in form
    if(action=='list'){
        await AddressModel({callback:(data,status)=>{console.log(address,data); address.push(...data);}})
        callback({shopsetting,address})
    }else{
        callback(shopsetting)
    }
}


export function ShopSetting(){
    const [shopData, setShopData] = useState({})
    const [options, setOptions] = useState([])
    const [snackbarData, setSnackbarData] = useState({message:'',visible:false})
    //load shopsetting data and addresses if these are exist else set empty object
    useEffect(() => {    
        ShopSettingAxios(
            'list',
            {},
            (data)=>{
                const s=data.shopsetting && data.shopsetting[0]
                s && setShopData({id:s.id,name:s.name,preorderdays:s.preorderdays,level:s.level,active:s.active,address:s.address,image:s.image})
                setOptions([{},...data.address])
                console.log(data)
            }
        )
    }, [])
    //on form submit callback
    function submit(v){
        const values={...v}
        //image field can't be a any kind as text or url or null, it must be file or filelist object
        // else server will through type error
        if(values.image && values.image.toString().search(/.*(File|FileList).*/)==-1)
            delete values.image

        //this is a quick fix so that it change its state, so react re-render the snackbar
        setSnackbarData({message:'',visible:false})
        
        //id is exist if setting is already exist which get during intial fetching so just update the setting
        //of course we can handle with like create_or_update but backend is django restframework and don't want to mess at server end
        if(!values.id){
            ShopSettingAxios(
                'create',
                values,
                (data)=>{
                    if(values.level!=null)
                    window.localStorage.setItem('level',values.level)
                    setSnackbarData({message:'Shop Setting Saved',visible:true})
                }                
            )
        }else{
            ShopSettingAxios(
                'update',
                values,
                (data)=>{
                    if(values.level!=null)
                    window.localStorage.setItem('level',values.level)
                    setSnackbarData({message:'Shop Setting Saved',visible:true})
                }                
            )
        }
    }
    return(
        <Container>
            <br/>
            <Form 
                onSubmit={submit}
                initialValues={shopData}
                render={({values,handleSubmit,submitting})=>{
                    return(
                        <form onSubmit={handleSubmit}>
                        <Field name='id' hidden component='input' />
                        <Card>
                        <CardContent>
                        <Grid container xs>
                        <Grid xs={2}>
                        <Field name='image' >
                        {
                            ({input})=>(
                            <>
                            <Avatar src={input.value} variant='square' component='span' onClick={()=>document.getElementById('shopimage').click()}>
                                {   
                                    (input.value && <ShowImage file={input.value} />) || <ImageOutlined/>
                                }
                            </Avatar>
                            <input id='shopimage' onChange={(e)=>input.onChange(e.target.files && e.target.files[0])} hidden type='file' value=''  name='image' />
                            </>
                            )
                        }
                        </Field>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='body1'>
                                Activate The Shop
                                <br/>
                                <Typography variant='caption' color='#a2a2a2'>
                                    you will recive the new order if the shop is activated
                                </Typography> 
                            </Typography>
                        </Grid>
                            <Field name='active' type='checkbox' required>
                                {   
                                    ({input})=>(
                                    <Grid xs={2}>
                                        <Switch 
                                            name={input.name}
                                            checked={input.checked}
                                            onChange={input.onChange}
                                        />
                                    </Grid>
                                    )
                                }
                            </Field>
                        </Grid>
                        </CardContent>
                        </Card>
                        <br/>
                        <Card>
                        <CardContent>
                        <Field name='name' fullWidth required placeholder='Shop Name' component={TextField} />
                        <Field name='preorderdays' required type='number'min='0' placeholder='Pre Order Days' fullWidth component={TextField} />
                        <Field name='address' fullWidth options={options}>
                            {
                                ({input,meta,options})=>(
                                    <Select value={input.value} placeholder='Address Of Shop' style={{color:values.address?'inherit':'#c2c2c2'}} required native fullWidth onChange={input.onChange} >
                                        {
                                            options.map((item)=>(
                                                <option value={item.id}>{item.village}</option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </Field>
                        <Field name='level' fullWidth options={[{id:1,key:'buyer'},{id:2,key:'distributer'},{id:3,key:'farmer'}]}>
                            {
                                ({input,meta,options})=>(
                                    <Select value={input.value} placeholder='I am a ...' style={{color:values.address?'inherit':'#c2c2c2'}} required native fullWidth onChange={input.onChange} >
                                        {
                                            options.map((item)=>(
                                                <option value={item.id}>{item.key}</option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </Field>
                        </CardContent>
                        </Card>
                        <br/>
                        <Button type='submit' color='primary' fullWidth variant='outlined'>
                            Save Setting
                        </Button>
                        </form>
                    )
                }}
            />
        <Snackbars {...snackbarData} />
        </Container>
    )
}