import axios from "axios";
import setting from "../../setting";
function toQueryString(obj){
    const keys=Object.keys(obj)
    return keys.map(key => `${key}=${obj[key]}`).join('&');
}
export const inventoryApi={
    list: async (data)=>{
        const querystring=toQueryString(data)          
        const res= await axios.get(setting.root+"/inventory/inventory/?format=json"+(querystring?'&'+querystring:""))
        return  res.data 
    },
    create:async (data)=>{
        console.log(JSON.stringify(data))
        const res= await axios.post(setting.root+"/inventory/inventory/?format=json",
            JSON.stringify(data),
            {
                headers:{
                    'content-type': 'application/json'

            }
        })
        return  res.data 
    },
    delete:async(data)=>{   
        const res=await axios.delete(setting.root+`/inventory/inventory/${data}/?format=json`)
        return res.data
    }
}
window.inventoryApi=inventoryApi