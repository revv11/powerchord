"use client"
import React, { useEffect, useState } from 'react';
import useConversation from '@/zustand/useConversation';
import NoChatSelected from './NoChatSelected';
import axios from 'axios';
import useListenMessages from '@/app/hooks/useListenMessages';
import Messages from './Messages';



const ChatWindow = () => {
  

  
  useListenMessages();


  
  
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



  
  

  return (
    <div className='w-3/4 h-full mx-auto backdrop:blur-xl p-4 flex flex-col'>
      {!selectedConversation? (<NoChatSelected/>): (
        <div className=" h-[calc(100vh-400px)]  p-4 flex flex-col">
        


        <Messages/>
          
       
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
      </div>
      ) }
      
    </div>
  );
};

export default ChatWindow;