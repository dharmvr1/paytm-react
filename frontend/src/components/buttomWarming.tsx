import { useNavigate } from "react-router-dom"

export function ButtomWarming({text,fn}:{text:string,fn?:()=>void}){
  

    return(
        <div>
            <h1 onClick={fn} className="text-black cursor-pointer text-md font-normal">{text} </h1>
        </div>
    )

}