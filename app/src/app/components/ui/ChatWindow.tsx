"use client"
import React, {  useState } from 'react';
import useConversation from '@/zustand/useConversation';
import NoChatSelected from './NoChatSelected';
import axios from 'axios';
import Messages from './Messages';



const ChatWindow = () => {
  const {selectedConversation} = useConversation();
  console.log("rendered")
  return (
    <div className='w-[911px] rounded-lg bg-[#0E0D1D] mx-auto backdrop:blur-xl flex flex-col'>
      {!selectedConversation? (<NoChatSelected/>): (
        <div className=" p-4 flex flex-col">
        <Messages/>
        <Input/>
        
      </div>
      ) }
      
    </div>
  );
};

export default ChatWindow;

const Input = ()=>{
  const {selectedConversation, setMessages, messages} = useConversation();
  const [newMessage, setNewMessage] = useState('');
  const sendMessage = async (e:any) => {
    e.preventDefault()
    
    if(!newMessage){
      return ;
    }
    setNewMessage('')
    try{
      const message = await axios.put(`/api/messages/send/${selectedConversation?.username}`, {message: newMessage})
      const sent = message.data as MessageType
      setMessages([...messages, sent])
      
      
  
    }
    catch(e){
      console.log(e)
    }
  };
  return(
    <form className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded-md p-2"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </form>
  )
}