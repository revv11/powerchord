"use client"
import { createContext , useState, useEffect, useContext, ReactNode, useRef} from "react";
import io, {Socket} from "socket.io-client"
import { useSession } from "next-auth/react";
import React from 'react';

interface ISocketContext{
    socket: Socket | null;
    onlineUsers : string[];
    
}




const socketURL = process.env.NEXT_PUBLIC_API_URL

const SocketContext = createContext<ISocketContext | undefined>(undefined)

export const useSocketContext = (): ISocketContext =>{
    const context = useContext(SocketContext);
    if(context === undefined){
        throw new Error("useSocketContext must be used within a SocketContextProvider");
    }
    return context;
}


export const SocketContextProvider = ({children}: {children: ReactNode})=>{
    const socketRef = useRef<Socket | null>(null)
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const session = useSession();
    const username = session.data?.user.username;



    useEffect(()=>{
        if(session.status !== "loading" && session.status === "authenticated"){

            const socket = io(socketURL, {
                query: {
                    username
                }
            })
            socketRef.current = socket;

            socket.on("getOnlineUsers", (users: string[])=>{
                setOnlineUsers(users);
                
            });

            return ()=>{
                socket.close();
                socketRef.current=null;
            }


        }
        else if(session.status !== "loading" && session.status === "unauthenticated"){
            if(socketRef.current){
                socketRef.current.close();
                socketRef.current = null;
            }
        }
    },[session.data?.user, session.status])

    return(
        <SocketContext.Provider value={{socket: socketRef.current, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
    
}