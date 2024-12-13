"use client"
import { createContext , useState, useEffect, useContext, ReactNode, useRef} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface User{
    id?:number,
    profilepic?: string | null,
    name?: string | null,
    email?: string | null,
    username?: string | null,
}



export const UserContext = createContext<User>({id: undefined })

export const useUserContext = (): User=>{
    const context = useContext(UserContext);
    if(context === undefined){
        throw new Error("useUserContext must be used within a SocketContextProvider");
    }
    return context;
}

export const UserContextProvider = ({children}: {children: ReactNode})=>{
    const session   = useSession()
    const user = session.data?.user;
    
    
    
    const [currentUser, setCurrentUser] = useState<User | any>({id:Number(user?.id) })
    useEffect(()=>{
        async function setuser(){
            const existinguser = await axios.get(`/api/${user?.username}`)
            const data = existinguser.data.user
            setCurrentUser({id:data?.id, name: data?.name, profilepic: data?.profilepic})
        }
        setuser();
    },[session.data?.user])

    return(
        <UserContext.Provider value= {currentUser}>
            {children}
        </UserContext.Provider>
    )
}