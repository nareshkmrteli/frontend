import axios from "axios"
import setting from "../../setting"
import qs from 'qs'
function toQueryString(obj){
    const keys=Object.keys(obj)
    return keys.map(key => `${key}=${obj[key]}`).join('&');
}
export const productApi={
    list: async (data)=>{
        const querystring=toQueryString(data) 
        const res= await axios.get(setting.root+"/product/product?format=json"+(querystring?'&'+querystring:""))
        return  res.data 
    },
    add:(data)=>{
    }
}
