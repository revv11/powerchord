"use client"
import { useSession } from "next-auth/react"

import { useRouter } from "next/navigation"
import { useEffect } from "react";


interface childrenType{
    children: React.ReactNode
}


export default function RootLayout({
    children
}:childrenType){

    // const session = useSession()
    // const router = useRouter();
    // useEffect(()=>{
    //     if(session?.status==='authenticated'){
    //         router.push('/dashboard')
    //     }
    // },[session])

    return(
        <div>
            {children}
        </div>
    )
}