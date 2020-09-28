import  axios from "axios"
import config from './../config'
import qs from "qs"
axios.defaults.withCredentials=true
export function signUp(props){
        axios.post(config.root+"/users/?format=json",qs.stringify(props.data)).then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
    }
export function signIn(props){
    axios.post(config.root+"/users/login/?format=json",qs.stringify(props.data)).then((res) => {
        const data=res.data   
        props.callback.call(props.context,data.data,data.status);
    }).catch((err)=>{
        alert('Please Check Internet Connection')
        console.log(err)        
    });
    
}
export function resendVerifiationCode(props){
    axios.post(config.root+"/users/"+props.id+"/resendverificationcode/?format=json").then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
}
export function confirmverificationcode(props){
    axios.post(config.root+"/users/"+props.id+"/confirmverificationcode/?format=json",qs.stringify(props.data)).then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
}
export function recoverPassword(props){
    axios.post(config.root+"/users/recoverpassword/?format=json",qs.stringify(props.data)).then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
}
export function signout(props){
    axios.post(config.root+"/users/logout/?format=json").then((res) => {
        const data=res.data   
        props.callback.call(props.context,data.data,data.status);
    }).catch((err)=>{
        alert('Please Check Internet Connection')
        console.log(err)        
    });
}
export function setNewPassword(props){
    axios.post(config.root+"/users/setnewpassword/?format=json",qs.stringify(props.data)).then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('Please Check Internet Connection')
            console.log(err)        
        });
}