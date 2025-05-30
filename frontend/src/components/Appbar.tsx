import axios from "axios"
import { useEffect, useState } from "react"

export function Appbar(){
   const [user,setUser]=useState<string>()
   const value=user?.charAt(0)
    async function getUser(){
        const response =await axios.get("http://localhost:3000/api/v1/user/profile",{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        return response.data.message
    }
    useEffect(()=>{
           getUser().then((res)=>{setUser(res.firstName)})
    },[])

    return(
        <div className="flex justify-between items-center py-2 px-7   border border-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-medium text-black">PayTM App</h1>
            <div className="flex gap-4 items-center">
                <h1 className="text-2xl">Hello! {user}</h1>
            <h1 className="bg-purple-200 px-4 py-3 text-3xl rounded-full">{value?.toUpperCase()}</h1>

            </div>

        </div>
    )
}