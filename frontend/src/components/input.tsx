interface IinputBox{
    heading:string
    placeholder:string
    type?:string
    refer?:React.Ref<HTMLInputElement> 
}

export function InputBox({heading,type,placeholder,refer}:IinputBox){
   
    return (
        <div className="flex flex-col gap-2 w-full">
            <h1 className="text-black font-2xl font-medium">{heading}</h1>
            <input  ref={refer}  type={type} placeholder={placeholder} className="px-3 py-1 rounded-lg border border-gray-300 text-xl placeholder:text-gray-300"/>
        </div>
    )
}