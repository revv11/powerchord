
import Appbar from "../components/ui/Appbar"
import Sidebar from "../components/ui/Sidebar";
import RequestListener from "../components/Listeners/RequestListener";



export default function UserLayout({
    children
}:{
    children : React.ReactNode
}){
  
   
    
    return(
        <RequestListener>
            <div className="bg-[#020210] p-6 h-full">
                <div className=" mb-6 rounded-lg">
                    <Appbar/>
                </div>
                <div className="flex h-[calc(100%-150px)]"> 
                    <Sidebar />
                    <div className=" w-full rounded-lg">                         
                        {children}
                    </div>
                </div>

            </div>
        </RequestListener>
        
    )
}