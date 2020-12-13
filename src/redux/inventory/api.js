import axios from "axios"
import setting from "../../setting"
import qs from 'qs'
function toQueryString(obj){
    const keys=Object.keys(obj)
    return keys.map(key => `${key}=${obj[key]}`).join('&');
}
export const inventoryApi={
    list: async (data)=>{
        const res= await axios.get(setting.root+"/inventory/inventory?format=json"+toQueryString(data))
        return  res.data 
    },
    add:(data)=>{
    }
}
window.myapi=inventoryApi