import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";


export interface User{
    id: number;
    username:string;
    profilepic?:string;
    createdAt: Date
    name?:string,
    bio?:string,
    image?:string
}
export const useGetUser  = (username:string) =>{

    const DefaultUser = useSession();
    const [loading, setLoading] = useState(true)
    const [user , setUser] = useState<User>();

    useEffect(()=>{
        axios.get(`/api/${username}`,{
        })
            .then(response => {
                setUser(response.data.user);
                setLoading(false)
            })
    },[])

    return(
        {
            loading,user
        }
    )
    
}