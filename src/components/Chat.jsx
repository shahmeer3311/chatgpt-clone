import React, { useEffect, useRef, useState } from 'react'
import { IoMdSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { RiAiGenerate2 } from "react-icons/ri";

const Chat = () => {
  const texts = [
  { txt: "Hello SAM", size: "text-[80px]", direction: "bg-linear-to-bl" },
  { txt: "I'm Your Personal Assistant", size: "text-[60px]", direction: "bg-linear-to-br" },
  { txt: "How Can I Help You Today?", size: "text-2xl", direction: "bg-linear-to-br" }
];

  const [showBox,setShowBox]=useState(false);
  const inputRef=useRef(null);
  const boxRef=useRef(null);

  const handleImage=()=>{
    inputRef.current.click();
    setShowBox(prev=>!prev)
  }

  const handleClickOutside=(e)=>{
     if(boxRef.current && !boxRef.current.contains(e.target)){
      setShowBox((prev)=>!prev);
     }
  }

  useEffect(()=>{
    document.addEventListener("mousedown",handleClickOutside);
    return ()=>{
    document.removeEventListener("mousedown",handleClickOutside)
    }
  },[]);

  return (
    <div className='flex-1 flex flex-col bg-black h-screen'>
      <div className='w-full h-[85%] mt-3 flex flex-col items-center justify-center gap-5 text-center'>
    {texts.map((text,i)=>(
      <p 
      key={i}
      className={`${text.size} font-extrabold  ${text.direction} from-[#ff0080] via-[#9500ff] to-[#00e1ff] bg-clip-text text-transparent`}>{text.txt}</p>
    ))} 
      </div>
      <div className='w-full h-[15%] flex items-center justify-center'>
        <div className='bg-white w-160 py-3 px-4 rounded-full flex items-center justify-between relative'>
         <div className='flex items-center gap-3'>
           <div className='w-12 h-10 rounded-full flex items-center justify-center bg-white hover:bg-gray-300 transition-all'>
          <FaPlus  className='w-6 h-6 text-black'
          onClick={()=>setShowBox(prev=>!prev)}
          />
          </div>
           <input 
          type='text'
          placeholder='Ask me Anything....'
          className='w-full pl-2 text-[16px] border-none outline-none'
          />
         </div>
         <div className='w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-gray-100 transition-all'>
           <IoMdSend className='w-8 h-8 text-blue-500 pl-1' />
         </div>
        </div>
      </div>
      <input type='file' ref={inputRef} className='hidden' />
      {showBox && (
        <div className='w-[250px] h-[120px] p-3 absolute bottom-25 left-126 rounded-2xl bg-white'
        ref={boxRef}
        >
          <div
          className='flex gap-4 items-center p-2 hover:shadow-lg rounded-2xl text-black cursor-pointer'
          onClick={handleImage}
          >
            <CiImageOn className='w-8 h-8 text-blue-500 pl-1' />
            <p>Add Image</p>
          </div>
           <div className='flex gap-4 items-center p-2 hover:shadow-lg rounded-2xl text-black cursor-pointer'>
            <RiAiGenerate2 className='w-8 h-8 text-blue-500 pl-1' />
            <p>Generate Image</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat
