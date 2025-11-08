import { DeleteIcons } from "../icons/DeleteIcons";
import { NotebookIcon } from "../icons/NotebookIcon";
import  { ShareIcons } from "../icons/ShareIcons";

import { useEffect } from "react";




function getYoutubeEmbedUrl(url: string) {
  // Regex to extract video ID from common YouTube URLs
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url; // fallback agar match na ho
}


interface CardsProps{
    title : string;
    link : string;
    type : "twitter" | "youtube";
}

export function Cards({title,link,type} : CardsProps){


 useEffect(() => {
  if (type === "twitter") {
    const loadTwitterScript = () => {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    };
    
    if (!(window as any).twttr) {
      loadTwitterScript();
    } else {
      (window as any).twttr.widgets.load(); // re-render existing tweets
    }
  }
}, [type]);
       
    return <div>

    <div className = "bg-white  border shadow-md rounded-xl p-4 border-gray-200 min-h-48 min-w-72">
      
        <div className="flex justify-between ">
            <div className="flex items-center ">
                <div className ="pr-2 text-gray-500">
                    <NotebookIcon/>
                </div>
                <div className ="text-gray-500 text-2xl">
                
                        {title}

                </div> 
            </div>

            <div className="flex items-center pr-2 ">
                <span className="pr-2 text-gray-500">
                    <DeleteIcons/>
                </span>
                    <a href={link} target = "_blank" >
                    <ShareIcons size={"md"}/>
                    </a>
            </div>   
        </div>  
       { /* this is embedde version of the youtube video */}
       <div>
        {type === "youtube" && <div className = "pt-4  ">
            <iframe className="w-full" src={getYoutubeEmbedUrl(link)}  title="YouTube video player" style={{ border: "none" }} allow="accelerometer; autoplay; 
            clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>}
    
        {type === "twitter" && (
        <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
        </blockquote>
        )}


       </div>
       
        

        {/* this is the twitter version of the video */}
       
        {/* {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a> 
                </blockquote>} */}
        

        
        

    </div>

    </div>
}