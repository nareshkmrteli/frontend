import React,{useContext,useState } from 'react';
export const UserContext=React.createContext({
        isUserLogined:()=>{},
        setIsUserLogined:()=>{}
  });

export function UserContextProvider(props){
  const [a, setA] = useState(null)
  const intialContext={
    isUserLogined:()=>{
            if(a==null){
            var b=window.localStorage.getItem('isUserLogined');
            if(b==null){
                return false;
            }
            else{
                setA(b);
                return b;
            }
            }else{
                return a;
            }
        },
    setIsUserLogined:(parms)=>{
            setA(parms);
            if (parms==false){
                window.localStorage.removeItem('isUserLogined');
            }else{
                window.localStorage.setItem('isUserLogined',parms);
            }
        }
}

  return(
    <UserContext.Provider value={intialContext} >
      {props.children}
    </UserContext.Provider>
  )
} 
export const getUserContext=()=>{
  return useContext(UserContext)
}
