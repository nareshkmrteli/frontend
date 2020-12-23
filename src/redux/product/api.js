import axios from "axios";
import setting from "../../setting";
import { toMultipart } from '../../utility';

function toQueryString(obj){
    const keys=Object.keys(obj)
    return keys.map(key => `${key}=${obj[key]}`).join('&');
}
export const productApi={
    list: async (data)=>{
        const querystring=toQueryString(data) 
        const res= await axios.get(setting.root+"/product/product/?format=json"+(querystring?'&'+querystring:""))
        return  res.data 
    },
    create:async (data)=>{
        const res= await axios.post(setting.root+"/product/product/?format=json",
            new toMultipart(data).run(),
            {
                headers:{
                    'content-type': 'application/form-data'
            }   
        })
        return  res.data 
    },
    delete:async(id)=>{   
        const res=await axios.delete(setting.root+`/product/product/${id}/?format=json`)
        return res.data
    }
}

