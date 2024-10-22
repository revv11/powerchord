"use client"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import Searchbar from "./Searchbar";
import SearchResults from "./SearchResults";
import { useState } from "react";


export default function Appbar(){
    const [data, setData] = useState([]);
    const session = useSession();
    const username  = session.data?.user?.username
    
    return(
    <div className="bg-purple-300 rounded-lg shadow-xl flex items-center h-[150px] p-5 px-10 justify-between">
        <h1 className="text-2xl w-[30%] font-semibold">POWERCHORD</h1>
        <div className="flex w-[30%] flex-col items-center">
            <div><Searchbar setData={setData}/></div>
            <div className="absolute top-16"><SearchResults data={data}/></div>
        </div>
        <div className="flex w-[30%] justify-end items-center space-x-10">
            <h1>{username}</h1>
            <button onClick={()=>{signOut()}} className="bg-gray-800 text-white text semibold p-3 rounded-lg hover:bg-gray-700 ">Logout</button>
        </div>
    </div>

    )
}