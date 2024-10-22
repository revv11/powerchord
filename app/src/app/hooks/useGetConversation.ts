import { useEffect, useState } from "react"
import axios from "axios";
import useConversation from "@/zustand/useConversation";


export const useGetConversation = ()=>{
    const {selectedConversation, setMessages, messages} = useConversation()
    const [loading , setLoading] = useState(false);
    


    useEffect(()=>{
        const getConversation = async () => {
            setLoading(true);
            if(!selectedConversation){
                return null
            }
            try{
                const res = await axios.get(`http://localhost:3000/api/messages/get/${selectedConversation?.username}`)
                
                
                setMessages(res.data.messages)
                setLoading(false)
                
            }
            catch(e){
                console.log(e)
            }
        }
        getConversation();
    },[selectedConversation, setMessages])

    return {messages, loading}
}   