"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import useConversation from "@/zustand/useConversation";


export const useGetUsers  = () =>{
    const [loading, setLoading] = useState(true)
    const {friends, setFriends} = useConversation()
    useEffect(()=>{
        axios.get(`/api/messages/get/users`,{
        })
            .then(response => {
                
                setFriends(response.data.users)
              
           
                setLoading(false)
            })
    },[])

    return(
        {
            loading,friends
        }
    )
    
}