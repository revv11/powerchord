"use client"
import { useEffect } from "react";
import {signOut} from "next-auth/react";




export default function Verifyemail(){
    useEffect(()=>{
      
        signOut({ redirect: false })
      
    },[])
    return(
        <div className="flex h-full justify-center items-center">
            <h1 className="text-2xl">
                Check your email for the verification link.
            </h1>
        </div>
    )
}