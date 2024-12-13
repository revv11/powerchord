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


    return(
        <div>
            {children}
        </div>
    )
}