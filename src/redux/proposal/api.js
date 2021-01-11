import axios from "axios";
import setting from "../../setting";
function toQueryString(obj){
    const keys=Object.keys(obj)
    return keys.map(key => `${key}=${obj[key]}`).join('&');
}
export const proposalApi={
    list: async (data)=>{
        const querystring=toQueryString(data)          
        const res= await axios.get(setting.root+"/proposal/proposal/?format=json"+(querystring?'&'+querystring:""))
        return  res.data 
    },
    create:async (data)=>{
        console.log(JSON.stringify(data))
        const res= await axios.post(setting.root+"/proposal/proposal/?format=json",
            JSON.stringify(data),
            {
                headers:{
                    'content-type': 'application/json'

            }
        })
        return  res.data 
    },
    delete:async(data)=>{   
        const res=await axios.delete(setting.root+`/proposal/proposal/${data}/?format=json`)
        return res.data
    }
}
window.proposalApi=proposalApi