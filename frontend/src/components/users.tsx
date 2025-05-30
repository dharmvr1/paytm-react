import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { sendContext } from "../context";
import { useNavigate } from "react-router-dom";
// import { send } from "vite";

export function Users() {
  const [users, setusers] = useState([]);
  const searchRef = useRef<HTMLInputElement>();
  async function getbulk(e: string) {
    const response = await axios("http://localhost:3000/api/v1/user/bulk", {
      params: {
        filter: e,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  }
  useEffect(()=>{
      getbulk(searchRef.current.value).then((response) => {
            setusers(response.users);
          }).catch((e)=>{console.log(e)});
  },[])

  return (
    <div className="flex flex-col px-7">
      <h1 className="text-3xl font-bold">Users</h1>
      <input
        onChange={(e) => {
          getbulk(e.target.value).then((response) => {
            setusers(response.users);
          }).catch((e)=>{console.log(e)});
        }}
        ref={searchRef}
        className="rounded-lg placeholder:font-medium py-1 mt-5 text-lg px-3 border-gray-300 border"
        type="text"
        placeholder="search users..."
      />
      <div className="flex flex-col gap-2 mt-5">
        {
            users.map((e,index)=>(<Send key={index} prop={e}/>))
        }
      </div>
    </div>
  );
}
interface Isend{
    id:number,
    username:string,
    firstName:string,
    lastName:string,
    password:string    
}
function Send({prop}:{prop:Isend}) {
    const navigate=useNavigate()
    const context=useContext(sendContext)
    const senduser=context.senduser
    const setSendUser=context.setSendUser
    const value=prop.firstName[0].toUpperCase()
     function sendMoney(){
             setSendUser(prop) 
             navigate("/send") 
                     
     }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="bg-purple-200 rounded-full px-4 py-3">{value}</span>
        <h1 className="text-xl font-medium">{prop.firstName}</h1>
      </div>
      <button onClick={sendMoney} className="bg-black text-lg px-3 py-1 outline-none cursor-pointer rounded-lg text-white">
        {" "}
        Send Money
      </button>
    </div>
  );
}
