import type { ReactElement } from "react"


export function SidebarItem({text,icons, onClick} :{
    text: string ,
    icons: ReactElement,
    onClick ?: ()=>void
}){
    return <div className = "flex gap-2 pt-4 pb-4 pl-6 rounded-md transition-all hover:bg-gray-200  duration-150 items-center" onClick={onClick}>
         <span className="cursor-pointer">
            {icons}    
        </span> 

        <span className="cursor-pointer text-gray-500">
            {text}
        </span>
          
    </div>
}