import { useState, useEffect } from "react";
import axios from "axios";

export interface User{
    id: number;
    username:string
}
export const useGetUsers  = () =>{
    const [loading, setLoading] = useState(true)
    const [users , setUsers] = useState<User[]>([]);

    useEffect(()=>{
        axios.get(`/api/messages/get/users`,{
        })
            .then(response => {
                setUsers(response.data.users);
                setLoading(false)
            })
    },[])

    return(
        {
            loading,users
        }
    )
    
}