import { useEffect } from "react";
import { Appbar } from "./components/Appbar";
import { Balance } from "./components/balance";
import { Users } from "./components/users";
import { useNavigate } from "react-router-dom";
export function DashBoard(){
  const navigate=useNavigate()
   useEffect(()=>{
     if(!localStorage.getItem("token")){
       navigate("/signin")    
     }
   },[])
   return(
     <div className="flex flex-col gap-3 px-7 py-2 min-h-screen">
        <Appbar/>
        <Balance />
        <Users />

    </div>  
   )
}