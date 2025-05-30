import axios from "axios"
import { useEffect, useState } from "react"

export function Balance(){
    const [balance,setBalance]=useState()
     async function getBalace(){
          const response =await axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization:localStorage.getItem("token")
            }
          })
          return response.data.balance

     }

     useEffect(()=>{
         getBalace().then((balance)=>{setBalance(balance)}).catch((e)=>{console.log(e)})
         
     },[])
    return(
        <div className="flex py-8 gap-3 px-8 items-center ">
            <h1 className="text-2xl font-extrabold">Your Balance </h1>
            <span className="text-2xl font-bold">  ${balance}</span>
        </div>
    )
}