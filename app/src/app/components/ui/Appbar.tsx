

import Button from "./Logoutbtn";
import Link from "next/link";

import Search from "./Search";
import Notification from "./Notification";
import Userimg from "./Userimg";







export default function Appbar(){
  
    
    return(
    <div className=" bg-[#0E0D1D] shadow-xl rounded-lg flex items-center h-[130px] p-5 px-10 justify-between">
        <Link href="/dashboard" className="w-[30%]">
            <h1 className="text-2xl font-semibold text-white">POWERCHORD</h1>
        </Link>
        <Search/>
        <div className="flex w-[30%] justify-end items-center space-x-10">
            <Userimg/>
           <Notification/>
           <Button/>
        </div>
    </div>

    )
}


