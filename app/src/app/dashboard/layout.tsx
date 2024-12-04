"use client"
import Appbar from "../components/ui/Appbar"
import { useGetUsers } from '../hooks/useGetUsers';
import Sidebar from "../components/ui/Sidebar";


export default function UserLayout({
    children
}:{
    children : React.ReactNode
}){
  
    const {users , loading} = useGetUsers();
    if(loading){
        return(
            <div className='flex h-[calc(100vh-150px)] flex-col justify-center items-center'>
                <h1>Loading...</h1>
            </div>
        )
        
    }
    return(
        <div className="h-screen flex">
            <Sidebar users={users} />
            <div className="bg-cover w-full bg-center h-screen"
                style={{
                    backgroundImage: "url('/images/bg1.jpg')",
                }}>
                <Appbar/>
                {children}
            </div>

        </div>
        
    )
}