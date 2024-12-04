"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import Searchbar from "./Searchbar";
import SearchResults from "./SearchResults";
import { useState } from "react";
import { useUserContext } from "@/app/context/UserContext";
import Image from "next/image";
import Link from "next/link";
import Dp from "./Dp";
import { profile } from "console";


export default function Appbar(){
    const {profilepic} = useUserContext();
    console.log(profilepic)
    const [data, setData] = useState([]);
    const session = useSession();
    const username  = session.data?.user?.username
    
    return(
    <div className="bg-blue-200 rounded-lg shadow-xl flex items-center h-[110px] p-5 px-10 justify-between">
        <h1 className="text-2xl w-[30%] font-semibold"></h1>
        <div className="flex w-[30%] flex-col items-center">
            <div><Searchbar setData={setData}/></div>
            <div className="absolute top-20"><SearchResults data={data}/></div>
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
           
            <button onClick={()=>{signOut()}} className="bg-gray-800 text-white text semibold p-3 rounded-lg hover:bg-gray-700 ">Logout</button>
        </div>
    </div>

    )
}