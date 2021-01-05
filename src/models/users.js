import axios from "axios";
import qs from "qs";
import setting from './../setting';
axios.defaults.withCredentials=true
export function signUp(props){
        axios.post(setting.root+"/users/?format=json",qs.stringify(props.data)).then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
    }
export function signIn(props){
    axios.post(setting.root+"/users/login/?format=json",qs.stringify(props.data)).then((res) => {
        const data=res.data   
        props.callback.call(props.context,data.data,data.status);
    }).catch((err)=>{
        alert('Please Check Internet Connection')
        console.log(err)        
    });
    
}
export function resendVerifiationCode(props){
    axios.post(setting.root+"/users/"+props.id+"/resendverificationcode/?format=json").then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
}
export function confirmverificationcode(props){
    axios.post(setting.root+"/users/"+props.id+"/confirmverificationcode/?format=json",qs.stringify(props.data)).then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
}
export function recoverPassword(props){
    axios.post(setting.root+"/users/recoverpassword/?format=json",qs.stringify(props.data)).then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
}
export function signout(props){
    axios.post(setting.root+"/users/logout/?format=json").then((res) => {
        const data=res.data   
        props.callback.call(props.context,data.data,data.status);
    }).catch((err)=>{
        alert('Please Check Internet Connection')
        console.log(err)        
    });
}
export function setNewPassword(props){
    axios.post(setting.root+"/users/setnewpassword/?format=json",qs.stringify(props.data)).then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
}
export function setImage(props){
    const data=new FormData()
    if(!props.file) 
        return
    data.append('image',props.file)
    
    axios.post(setting.root+"/users/setimage/?format=json",data).then((res) => {
            const data=res.data   
            props.callback(data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
}
