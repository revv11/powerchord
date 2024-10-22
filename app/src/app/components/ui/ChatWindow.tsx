import React, { useEffect, useState } from 'react';
import useConversation from '@/zustand/useConversation';
import NoChatSelected from './NoChatSelected';
import axios from 'axios';
import { useGetConversation } from '@/app/hooks/useGetConversation';
import useListenMessages from '@/app/hooks/useListenMessages';
import { useSession } from 'next-auth/react';




const ChatWindow = () => {
  const {loading, conversation}  = useGetConversation()
  const session= useSession();

  
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
      
      setMessages([...messages, {senderId: sent.senderId, body:sent.body, id:sent.id}])
      

    }
    catch(e){
      console.log(e)
    }
  };


  if(loading && selectedConversation){
    return(
      <div className='w-3/4 h-screen justify-center items-center bg-white p-4 flex flex-col'>loading...</div>
    )
  }
  
  

  return (
    <div className='w-3/4 h-full bg-white p-4 flex flex-col'>
      {!selectedConversation|| loading? (<NoChatSelected/>): (
        <div className="w-3/4 h-[calc(100vh-220px)] bg-white p-4 flex flex-col">
        <div className="flex-1 h-screen overflow-y-auto w-full mb-4">
          <h2 className="text-xl font-semibold mb-2">{`Chat with ${selectedConversation.username}`}</h2>
          <div className="space-y-2">
            {conversation?.map((message: MessageType) => (
              <div key={String(message.id)} >
                {message.senderId === session.data?.user.username || message.senderId === selectedConversation.username &&
                  <div className={`p-2 bg-gray-100 rounded-md`}>
                    <p className="font-semibold">{message.senderId===session.data?.user.username?"Me": message.senderId}:</p>
                    <p>{message.body}</p>
                  </div>                
                }
              </div>
            ))}

            {messages?.map((message:MessageType)=>(
            <div key={String(message.id)} className={`p-2 flex bg-gray-100 rounded-md`}>
              <div>
                <p className="font-semibold">{message.senderId===session.data?.user.username?"Me": message.senderId}:</p>
                <p>{message.body}</p>
              </div>                
            </div>
            ))}
          </div>
        </div>
        <div className="flex">
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
        </div>
      </div>
      ) }
      
    </div>
  );
};

export default ChatWindow;