import axios from "axios";
import qs from "qs";
import setting from 'setting';
export async function AddressModel(props){

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
    await axios(config).then((res)=>{
            props.callback(res.data.data,res.data.status)
    }).catch((e)=>{
            alert(":( please Check Internet Connection")
    })
}
