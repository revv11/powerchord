"use client"
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useConversation from "@/zustand/useConversation";



export default function Dropdown({requests, loading}: {requests:RequestType[], loading:boolean}){
   

    return(
        <div className="bg-[#CB579D] w-[18rem] text-black rounded-xl p-5  z-[20]">
            <h1 className="text-xl pb-3">
                Friend Requests
            </h1>
            
            
            <ul className="flex flex-col space-y-5 max-h-[300px] overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded">
                {loading?
                <div key={"loading"}>
                    loading...
                </div>
                :
                <div key={"requests"}>
                    {requests.length===0 && 
                        <div>
                            No friend requests.
                        </div>
                    }
                    {requests.map((requests:any)=>(
                        <li key={requests.username}>
                            <DropdownItem  username={requests.senderId} profilepic=""/>

                        </li>
                        
                    ))}
                    

                </div>
            }
            
            </ul>
        </div>
    )
}

function DropdownItem({username, profilepic}:{username:string, profilepic:string}){
    const session  = useSession();
    const currentuser = session.data?.user.username;
 
    const {requests, setRequests} = useConversation(); 
    const Accept = async ()=>{
        try{
            setRequests(requests.filter(item => item.senderId !== username))
            
            const call = await axios.post('/api/friendreq/response', {sender: username, receiver: currentuser, response: "ACCEPTED" })
            
        }
        catch(e){
           
            console.log(e)
        }
    }
    const Decline = async ()=>{
        try{
            
            setRequests(requests.filter(item => item.senderId !== username))
    
            
            const call = await axios.post('/api/friendreq/response', {sender: username, receiver: currentuser, response: "DECLINED" })
            
        }
        catch(e){
            console.log(e)
          
        }
    }
    return(
        <div className="">
            <div className="flex justify-center items-center space-x-5">
                <Image src={"/images/demo.png"} height={50} className="rounded-full" width={50} alt=""></Image>
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-xl">{username}</h1>
                    <div>
                        <button onClick={Accept} className="  font-semibold border-green-800 border-[2px] text-black p-1 rounded-lg mx-1 hover:bg-green-700">
                            Accept
                        </button>
                        <button onClick={Decline} className=" font-semibold border-red-800 border-[2px] text-black p-1 rounded-lg mx-1 hover:bg-red-700">
                            Decline
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}