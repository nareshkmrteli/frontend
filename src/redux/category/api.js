import axios from "axios";
import setting from "../../setting";
function toQueryString(obj){
    const keys=Object.keys(obj)
    return keys.map(key => `${key}=${obj[key]}`).join('&');
}
export const categoryApi={
    list: async (data)=>{
        const querystring=toQueryString(data)          
        const res= await axios.get(setting.root+"/product/category/?format=json"+(querystring?'&'+querystring:""))
        return  res.data 
    },
    add:(data)=>{
    }
}
window.myapi=categoryApi