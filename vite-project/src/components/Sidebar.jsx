import React, { useState } from 'react'
import { Fa500Px } from "react-icons/fa";
import { CiSliderHorizontal } from "react-icons/ci";
import { RiChatNewLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";

const Sidebar = () => {
    const [showSidebar,setShowSidebar]=useState(true);
    const [showChats,setShowChats]=useState(true);
  return (
    <div className={`${showSidebar ? "w-[20%]" : "w-[5%]"} h-screen bg-black border border-r-3 border-gray-700 relative`}>
       <div className='text-white flex w-full items-center justify-between pt-5 px-4'>
        {showSidebar && <Fa500Px className='w-7 h-7' />}
        <CiSliderHorizontal 
        className='w-7 h-7 cursor-pointer'
        onClick={()=>setShowSidebar(prev=>!prev)}
        />
       </div>
       <div className='text-white mt-20 flex flex-col gap-3 pl-2 pr-2'>
        <div className='flex gap-4 items-center p-2 hover:bg-gray-700 rounded-2xl'>
            <RiChatNewLine  className='w-6 h-6'/> 
            {showSidebar && <span>New Chat</span>}
        </div>
        <div className='flex gap-4 items-center p-2 hover:bg-gray-700 rounded-2xl'>
            <CiSearch  className='w-6 h-6'/> 
            {showSidebar && <span>Search Chat</span>}
        </div>
       </div>
      {showSidebar 
      &&
      ( <div className='text-white mt-15 flex flex-col gap-3 pl-5'>
         <div className='flex gap-3'>
         <span>Your Chats</span> 
        {showChats ? 
        <RiArrowDropDownLine 
         className='w-7 h-7 cursor-pointer'
         onClick={()=>setShowChats(prev=>!prev)}
         />
         :
         <RiArrowDropUpLine
        className='w-7 h-7 cursor-pointer'
         onClick={()=>setShowChats(prev=>!prev)}
         />
       }
         </div>
        {showChats && 
        ( <div>
            <p className='p-2 hover:bg-gray-700 rounded-2xl mr-2'>First Chat</p>
         </div>)
        }
       </div>)
      }
      <div className='absolute bottom-5 left-2 '>
        <div className='flex gap-3 items-center text-white'>
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
        alt="default profile"
        className='w-10 h-10 object-cover'
        />
       {showSidebar &&  <p>SAM</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
