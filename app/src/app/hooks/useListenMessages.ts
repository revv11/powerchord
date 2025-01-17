import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "@/zustand/useConversation";


const useListenMessages = () =>{
    const { socket }  = useSocketContext();
    const {messages, setMessages, selectedConversation, setnewMessages, newmessages} = useConversation();


    useEffect(()=>{
        socket?.on("newMessage", (newMessages: MessageType)=>{
            if(newMessages.senderId!=selectedConversation?.username){
                setnewMessages([...newmessages, newMessages])
                console.log(newMessages)
            }
            else{

                setMessages([...messages, newMessages])
            }
           

        })

        return ()=>{
            socket?.off("newMessage")
        }
    },[socket, messages , setMessages])
}

export default useListenMessages;