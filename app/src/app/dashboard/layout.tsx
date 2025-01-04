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
        <div className="bg-[#020210] p-6 h-full">
            <div className=" mb-6 rounded-lg">
                <Appbar/>
            </div>
            <div className="flex h-[calc(100%-150px)]">
                <div className="mr-6 w-[314px] ">
                    <Sidebar users={users} />
                </div>
                <div className=" w-full rounded-lg"
                   >
                    
                    {children}
                </div>

            </div>

        </div>
        
    )
}