import { useHistory } from 'react-router-dom';
import { GetUserContext } from './../../context/usercontext';
import { signout } from './../../models/users';
export default function Signout(){
    const usercontext=GetUserContext();
    const history=useHistory()

    signout({context:this,"callback":callback});
    history.push('/frontend/account')
    function callback(res,status){
        if(status==200){
            usercontext.setIsUserLogined(false); 
            window.localStorage.clear();           
        }
        else{
            alert("please Check the Internet Connection, and Retry")
        }
    }
    return(null)
}