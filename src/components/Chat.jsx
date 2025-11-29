import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { RiAiGenerate2 } from "react-icons/ri";
import { ChatStore } from "../store/ChatStore";
import { sendToGemini } from "../gemini";

const Chat = () => {
  const {
    chats,
    activeChatId,
    setActiveChat,
    addMessage,
    getActiveMessages,
    createNewChat,
  } = ChatStore();

  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showBox, setShowBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);
  const boxRef = useRef(null);
  const messageRef=useRef(null);

  const texts = [
    { txt: "Hello SAM", size: "text-[80px]", direction: "bg-linear-to-bl" },
    { txt: "I'm Your Personal Assistant", size: "text-[60px]", direction: "bg-linear-to-br" },
    { txt: "How Can I Help You Today?", size: "text-2xl", direction: "bg-linear-to-br" }
  ];

  const activeMessages = getActiveMessages();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleImage = () => {
    inputRef.current.click();
    setShowBox(false);
  };

  const handleClickOutside = (e) => {
    if (boxRef.current && !boxRef.current.contains(e.target)) {
      setShowBox(false);
    }
  };

  const handleSubmit = async () => {
    if (!text && !imageFile) return;

    if (!activeChatId) {
      createNewChat();
    }

    addMessage({
      type: "user",
      content: text || "[Image]",
      image: imageFile ? URL.createObjectURL(imageFile) : null,
    });

    setIsLoading(true);

    const aiReply = await sendToGemini(text, imageFile);

    setIsLoading(false);

    addMessage({
      type: "gemini",
      content: aiReply,
    });

    setText("");
    setImageFile(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(()=>{
    messageRef.current?.scrollIntoView({behavior: "smooth"})
  },[activeMessages]);

  return (
    <div className="flex-1 flex flex-col bg-black h-screen">
      {(!activeChatId || activeMessages.length === 0) ? (
        <div className="w-full h-[85%] mt-3 overflow-y-auto flex flex-col items-center justify-center gap-5 text-center">
          {texts.map((t, i) => (
            <p
              key={i}
              className={`${t.size} font-extrabold ${t.direction} from-[#ff0080] via-[#9500ff] to-[#00e1ff] bg-clip-text text-transparent`}
            >
              {t.txt}
            </p>
          ))}
        </div>
      ) : (
        <div className="w-full mb-20 h-screen px-6 overflow-y-auto flex flex-col gap-4 mt-5 transition-all">
          {activeMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-3 max-w-[60%] rounded-xl ${
                  msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {msg.image && <img src={msg.image} className="w-40 rounded-lg mb-2" />}
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-300 px-4 py-2 rounded-xl flex gap-2 w-fit">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.15s" }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>●</span>
              </div>
            </div>
          )}
          <div ref={messageRef} />
        </div>
      )}

      <div className="w-full h-[15%] flex items-center justify-center">
        <div className="bg-white w-160 py-3 px-4 rounded-full flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-10 rounded-full flex items-center justify-center bg-white hover:bg-gray-300 transition-all"
              onClick={() => setShowBox((prev) => !prev)}
            >
              <FaPlus className="w-6 h-6 text-black" />
            </div>

            <input
              type="text"
              placeholder="Ask me Anything...."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full pl-2 text-[16px] border-none outline-none"
            />
          </div>

          <div
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-gray-100 transition-all"
            onClick={handleSubmit}
          >
            <IoMdSend className="w-8 h-8 text-blue-500 pl-1" />
          </div>

          {showBox && (
            <div
              ref={boxRef}
              className="w-[250px] h-[120px] p-3 absolute bottom-16 left-0 rounded-2xl bg-white shadow-xl"
            >
              <div
                className="flex gap-4 items-center p-2 hover:bg-gray-100 rounded-2xl text-black cursor-pointer"
                onClick={handleImage}
              >
                <CiImageOn className="w-8 h-8 text-blue-500 pl-1" />
                <p>Add Image</p>
              </div>

              <div className="flex gap-4 items-center p-2 hover:bg-gray-100 rounded-2xl text-black cursor-pointer">
                <RiAiGenerate2 className="w-8 h-8 text-blue-500 pl-1" />
                <p>Generate Image</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <input type="file" ref={inputRef} onChange={handleFileChange} className="hidden" />
    </div>
  );
};

export default Chat;
