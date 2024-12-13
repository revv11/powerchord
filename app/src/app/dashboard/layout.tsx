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
        <div className="h-screen  flex">
            <div className="h-full xl:w-[400px] w-[250px]">
                <Sidebar users={users} />
            </div>
            <div className="bg-cover w-[calc(100%-250px)] xl:w-[calc(100%-400px)] bg-center h-screen"
                style={{
                    backgroundImage: "url('/images/bg1.jpg')",
                }}>
                <Appbar/>
                {children}
            </div>

        </div>
        
    )
}