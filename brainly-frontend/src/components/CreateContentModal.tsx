import { BACKEDNED_URL } from "../config";
import { CrossIcons } from "../icons/CrossIcons";
import {Button} from "./Button"
import {Input} from "./Input"
import {useRef,useState} from "react";
import axios from "axios";

enum ContentType{
    Youtube = "youtube" ,
    Twitter = "twitter",
}


//controlled Component :
export function CreateContentModel({open,onClose}){
    const titleRef= useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    async function AddContent(){
        const title= titleRef.current?.value;
        const link = linkRef.current?.value;

        if( !title || !link){
            alert("PLease Enter both title and link");
        }else{
            await axios.post(`${BACKEDNED_URL}/api/v1/content`,{
                title,
                link,
                type
            },{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            })
        }


    }

    return <div>
        {open && <div className="w-screen h-screen items-center bg-slate-500 fixed top-0 left-0  bg-opacity-60 flex justify-center">
                <div className = "flex flex-col justify-center">
                        <span className ="bg-white   p-4 rounded-md">
                            <div className ="flex justify-end">
                                <div onClick={onClose} className ="cursor-pointer">
                                <CrossIcons/>    
                                </div>
                            </div>
                            <div>
                                
                                <Input placeholder ={"Title"} ref= {titleRef} />
                                <Input placeholder ={"Link"} ref ={linkRef} />
                                
                            </div>  
                            <div>
                                <h1 className=" text-xl pt-2">
                                    Type : 
                                </h1>
                                <div className= "flex gap-4 p-4">
                                    <Button variant ={type===ContentType.Youtube ? "primary" : "secondary"} text ={"Youtube"} size="md" onClick={()=>setType(ContentType.Youtube)}/>
                                    <Button variant ={type===ContentType.Twitter ? "primary" : "secondary"} text ={"Twitter"} size="md" onClick={()=>setType(ContentType.Twitter)}/>
                                </div>
                            </div>
                            <div className ="flex justify-center">
                                    <Button  variant={"primary"} text ={"Create"} size="md" onClick={()=>{
                                        AddContent();
                                        onClose();
                                    }}/>
                            </div>
                        </span>                  
                </div>           
            </div>
        }
    </div>
}


