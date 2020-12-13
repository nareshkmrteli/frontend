import axios from "axios"
import setting  from 'setting'
import qs from "qs"
export function AddressModel(props){
    if(setting.faker){
        faker(props);
        return;
    }
    // All url cases
    const source=axios.CancelToken.source();
    const config={
        baseURL:setting.root+'/address/',
        CancelToken:source.token,
        parms:"format=json"
    }
    switch(props.url){
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
            config.url=''+props.data.id;
            config.method='DELETE'
            config.data=qs.stringify(props.data)
            break;
        case 'update':
            config.url=''+props.data.id+'/';
            config.method='PUT'
            config.data=qs.stringify(props.data)
            break;
            
    }
    axios(config).then((res)=>{
            props.callback(res.data.data,res.data.status)
    }).catch(()=>{
            alert(":( please Check Internet Connection")
    })
}

function faker(props){
    var data=[
        {   
            id:1,
            village:'khamor',
            pincode:'311023'
        },
        {
            id:2,
            village:'baral 2',
            pincode:'302017'
        }
    ];
    if(props.url=='list')
        props.callback(data,200)
    else if(props.url=='create'){
        
    }
    
}