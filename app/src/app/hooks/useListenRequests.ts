import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "@/zustand/useConversation";


const useListenRequests = () =>{
    const { socket }  = useSocketContext();
    const {requests, setRequests} = useConversation();


    useEffect(()=>{
        socket?.on("newRequest", (newRequest: RequestType)=>{
            
            
            setRequests([...requests,newRequest])
           
           

        })

        return ()=>{
            socket?.off("newRequest")
        }
    },[socket, requests, setRequests])
}

export default useListenRequests;