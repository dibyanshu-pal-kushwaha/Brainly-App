
interface InputProps{
    placeholder : string,
    ref?: any 
}

export function Input({ref,placeholder}:InputProps){
    return(
        <div>
            <input  ref={ref} type ={"text"} placeholder={placeholder} className=" placeholder-gray-500 px-4 py-2 border-slate-200 border rounded-md my-1" >
            </input>
        </div>
        )

}