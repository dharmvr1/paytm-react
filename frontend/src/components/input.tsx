interface IinputBox{
    heading:string
    placeholder:string
    type?:string
}

export function InputBox({heading,type,placeholder}:IinputBox){
   
    return (
        <div className="flex flex-col gap-2 w-full">
            <h1 className="text-black font-2xl font-medium">{heading}</h1>
            <input type={type} placeholder={placeholder} className="px-3 py-1 rounded-lg border border-gray-300 text-xl placeholder:text-gray-300"/>
        </div>
    )
}