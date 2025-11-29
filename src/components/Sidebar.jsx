import React, { useState } from 'react'
import { Fa500Px } from "react-icons/fa";
import { CiSliderHorizontal } from "react-icons/ci";
import { RiChatNewLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { ChatStore } from "../store/ChatStore";
import { FiMoreVertical } from "react-icons/fi";

const Sidebar = () => {
    const [showSidebar,setShowSidebar]=useState(true);
    const [showChats,setShowChats]=useState(true);
    const [menuOpen,setMenuOpen]=useState(null);

    const chats=ChatStore((state)=>state.chats);
     const activeChatId = ChatStore((state) => state.activeChatId);
     const createNewChat = ChatStore((state) => state.createNewChat);
      const setActiveChat = ChatStore((state) => state.setActiveChat);
     const deleteChat = ChatStore((state) => state.deleteChat);

     const truncate=(text,max=15)=>{
     return text.length>max? text.substring(0,max) + "...." : text;
     }

    console.log(chats);

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
        <div className='flex gap-4 items-center p-2 hover:bg-gray-700 rounded-2xl'
        onClick={createNewChat}
        >
            <RiChatNewLine 
            className='w-6 h-6'/> 
            {showSidebar && <span>New Chat</span>}
        </div>
        <div className='flex gap-4 items-center p-2 hover:bg-gray-700 rounded-2xl'>
            <CiSearch  className='w-6 h-6'/> 
            {showSidebar && <span>Search Chat</span>}
        </div>
       </div>
      {showSidebar 
      &&
      ( <div className='text-white mt-15 flex flex-col gap-8 pl-5'>
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
        ( 
        <>
        {chats.map((chat)=>{
          const firstMsg=chat.messages[0]?.content  || "Empty chat";
          console.log(firstMsg);
          return(
             <div key={chat.id}
           className={`p-2 rounded-2xl flex items-center justify-between mr-2 ${chat.id===activeChatId ? "bg-purple-700/50" : "hover:bg-gray-800/40"}`}
           onClick={()=>setActiveChat(chat.id)}
           >
            <p className='pl-3'>{truncate(firstMsg)}</p>
            <div className="relative" onClick={(e) => e.stopPropagation()}>
             <FiMoreVertical
                className="w-5 h-5 cursor-pointer" 
                onClick={()=>setMenuOpen(menuOpen===chat.id ? null : chat.id)}
                />
                {menuOpen === chat.id && (
                <div
                  className={`absolute -right-5.5 bottom-4 mt-2 w-24 bg-white shadow-lg rounded-md z-10
              `}
                >
                  <button
                    className="w-full text-left px-3 py-2 hover:bg-red-500 text-gray-500 hover:text-white rounded-md"
                    onClick={() => {
                      deleteChat(chat.id);
                      setMenuOpen(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
                </div>
         </div>
          )
        })}
        </>
         )
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
