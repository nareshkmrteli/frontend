import axios from "axios";
import qs from "qs";
import setting from 'setting';

export async function ProductShopModel(props){
    
    const source=axios.CancelToken.source();
    const config={
        baseURL:setting.root+'/shop/productshop/?format=json',
        CancelToken:source.token,
    }
    if(props.params)
        config['params']=props.params
        
    switch(props.action){
        case 'list':
            config.url='';
            config.method='GET';
            break;
        case "create":
            config.url='';
            config.method='POST';
            config.data=qs.stringify(props.data)
            break;
        case 'delete':
            config.url=''+props.id;
            config.method='DELETE'
            config.data=qs.stringify(props.data)
            break;
        case 'update':
            config.url=''+props.id+'/';
            config.method='PUT'
            config.data=qs.stringify(props.data)
            break;
            
    }
    try{
        const res=await axios(config)
            props.callback(res.data,res.status)
    }catch(e){
        console.log(e)
         //props.callback(e.request,e)
    }
}