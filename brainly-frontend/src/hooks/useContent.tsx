import axios from "axios";
import { useState,useEffect} from "react";
import { BACKEDNED_URL } from "../config";


export function useContent(){
    const [content ,setContent] = useState([]);

    function refresh(){

            axios.get(`${BACKEDNED_URL}/api/v1/content`,{
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            })
            .then ( (response) => {
                setContent(response.data.content);
            })
        }
    


    useEffect(()=>{
        refresh()
        const interval = setInterval(
            refresh
            ,3*1000)
    
    return ()=> clearInterval(interval);
    },[]);
    
    return {content};

}