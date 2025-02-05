"use client"
import useListenRequests from "@/app/hooks/useListenRequests"





export default function RequestListener({children}:{children: React.ReactNode}){
    useListenRequests();
    return(
        <div className="h-full">
            {children}
        </div>
    )
}