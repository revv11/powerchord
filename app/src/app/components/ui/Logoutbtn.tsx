"use client"
import { signOut } from "next-auth/react";

const Button = ()=>{
    return(
        <button onClick={()=>{signOut()}} className="bg-gray-800 border border-red-800 text-white text semibold p-3 rounded-lg hover:bg-gray-700 ">Logout</button>

    )
}

export default Button;