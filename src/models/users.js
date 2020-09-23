import  axios from "axios"
import config from './../config'
import qs from "qs"
    
export function signUp(props){
        axios.post("http://127.0.0.1:8080/users/users/?format=json",qs.stringify(props.data)).then((res) => {
            const data=res.data   
            props.callback.call(props.context,data.data,data.status);
        }).catch((err)=>{
            alert('fail')
            console.log(err)        
        });
    }
export function signIn(props){
    
}
