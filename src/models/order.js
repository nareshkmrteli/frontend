import axios from "axios";
import setting from 'setting';

export async function OrderModel(props){
    const source=axios.CancelToken.source();
    const config={
        baseURL:setting.root+'/order/order/?format=json',
        headers:{
            'content-type': 'application/json'
        },
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
            config.data=JSON.stringify(props.data)
            break;
        case 'delete':
            config.url=''+props.id;
            config.method='DELETE'
            config.data=JSON.stringify(props.data)
            break;
        case 'update':
            config.url=''+props.id+'/';
            config.method='PUT'
            config.data=JSON.stringify(props.data)
            break;
        case 'changestatus':
            config.url=''+props.id+'/changestatus/';
            config.method='POST'
            config.data=JSON.stringify(props.data)
            
            
    }
    try{
        const res=await axios(config)
            props.callback(res.data,res.status)
    }catch(e){
        console.log(e)
         //props.callback(e.request,e)
    }
}