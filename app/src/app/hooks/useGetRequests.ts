import { useState, useEffect } from "react";
import axios from "axios";
import useConversation from "@/zustand/useConversation";




export const useGetRequests  = () =>{

    const {requests, setRequests} = useConversation()
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        axios.get(`/api/requests`,{
        })
            .then(response => {
                setRequests(response.data);
                setLoading(false)
            })
    },[setRequests])

    return(
        {
            loading,requests
        }
    )
    
}
