import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "@/zustand/useConversation";


const useListenMessages = () =>{
    const { socket }  = useSocketContext();
    const {messages, setMessages} = useConversation();


    useEffect(()=>{
        socket?.on("newMessage", (newMessages: MessageType)=>{
           setMessages([...messages, newMessages])
           console.log("updatedmessages???")

        })
    },[socket, messages , setMessages])
}

export default useListenMessages;