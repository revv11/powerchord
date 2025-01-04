"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import Searchbar from "./Searchbar";
import SearchResults from "./SearchResults";
import { useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import Link from "next/link";
import Dp from "./Dp";



export default function Appbar(){
    const {profilepic} = useUserContext();
    const [data, setData] = useState([]);
    const session = useSession();
    const username  = session.data?.user?.username
    
    return(
    <div className=" bg-[#0E0D1D] shadow-xl rounded-lg flex items-center h-[130px] p-5 px-10 justify-between">
        <Link href="/dashboard" className="w-[30%]">
            <h1 className="text-2xl  font-semibold text-white">POWERCHORD</h1>
        </Link>
        <div className="flex w-[30%] flex-col items-center">
            <div><Searchbar setData={setData}/></div>
            <div className="absolute top-[8rem]"><SearchResults data={data}/></div>
        </div>
        <div className="flex w-[30%] justify-end items-center space-x-10">
            {profilepic?
                
                <Link href={`/${username}`}>
                    <Dp url={profilepic} size="12"/>
                </Link>
                    :
                <Link href={`/${username}`}>
                    <Dp url={"/images/demo.png"} size="12"/>
                </Link>
            }
           
            <button onClick={()=>{signOut()}} className="bg-gray-800 border border-red-800 text-white text semibold p-3 rounded-lg hover:bg-gray-700 ">Logout</button>
        </div>
    </div>

    )
}