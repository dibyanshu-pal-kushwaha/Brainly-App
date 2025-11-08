
import { Button } from '../components/Button'
import  { PlusIcon } from '../icons/PlusIcon'
import { ShareIcons } from '../icons/ShareIcons'
import  { Cards } from '../components/Cards'
import { CreateContentModel } from '../components/CreateContentModal'
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent'
import { BACKEDNED_URL } from '../config'
import axios from "axios";


 export function Dashboard() { 
  const [ modal,setModal] = useState(false);
  const {content} = useContent();
 

  return (
    <div className='flex'>
      <div>
        <Sidebar/>
      </div>
      <div className ="items-center p-4 w-full bg-gray-400">
         <CreateContentModel open ={modal} onClose={()=>{setModal(false)}}/>
          <div className ="flex justify-between items-center">
            <div className="text-2xl font-bold">
              All Notes
            </div>
          <div className = "flex justify-end gap-4 pt-3  pb-4">
              <Button  endIcon = {<ShareIcons size={"md"}/>} variant = "secondary"  size = "md"  text = "Share Brain"  onClick ={async()=>{
                const response=await axios.post(`${BACKEDNED_URL}/api/v1/brain/share`,{
                  share:true
                },{
                  headers:{
                    "Authorization" : localStorage.getItem("token")
                  }
                });
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                alert(shareUrl);
              }}/>
              <Button onClick={()=>{setModal(true)}} startIcon={ <PlusIcon size={"md"}/> } variant = "primary"   size = "md"  text = "Add Content" />
          </div>
          </div>
          <div className = "flex gap-4 flex-wrap">
            {/* {JSON.stringify(content)} */}
            {content.map(({type,link,title},index)=> <Cards
              title={title}
              link={link}
              type ={type}
              key={index}
            />)}
      </div>
    </div>
    </div>
  )
}

