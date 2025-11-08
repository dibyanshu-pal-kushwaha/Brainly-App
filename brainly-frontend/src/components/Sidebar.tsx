import { SidebarItem } from "./SidebarItem";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TagsIcons } from "../icons/TagsIcons";
import { LinksIcon } from "../icons/LinksIcon";
import { DocumentsIcon } from "../icons/DocumentsIcon";
import { BrainIcons } from "../icons/BrainIcons";



export function Sidebar(){


    return <div className =" h-full w-72 bg-white border-2 border-gray-200 shadow-md  top-0 left-0 pt-6 pl-6 ">
        <div className ="flex  items-center justify-start gap-1 pb-12">
            <BrainIcons/>
            <span className=" text-4xl">
            Brainly
            </span>

        </div>
       <SidebarItem text ="Twitter" icons={<TwitterIcon/>}  />
       <SidebarItem text ="Youtube" icons={<YoutubeIcon/>} />
       <SidebarItem text ="Tags" icons={<TagsIcons/>}  />
       <SidebarItem text ="Links" icons={<LinksIcon/>}  />
       <SidebarItem text ="Documents" icons={<DocumentsIcon/>}  />
       
    </div>
}