"use client"
import Image from "next/image"
import Dropdown from "./Dropdown"
import { useState, useRef, useEffect } from "react"
import { useGetRequests } from "@/app/hooks/useGetRequests"


export default function Notification(){
    const [dropdown, setDropdown] = useState(false)
    const {requests , loading}  = useGetRequests()
    const dropdownref = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        const handler = (e: MouseEvent)=>{
            if(dropdownref.current && !dropdownref.current.contains(e.target as Node)){
                setDropdown(false);

            }
        };
        document.addEventListener("mousedown", handler)
    })
    return(
        <div>
            <Image src={(requests.length > 0 && !dropdown)?"/images/notification2.svg":"/images/notification1.svg"}  width={40} onClick={()=>{setDropdown(!dropdown)}} alt="bell" color="white" className="cursor-pointer" height={20}/>
                        
                <div ref={dropdownref} className={dropdown?`dropdownactive absolute z-20 right-[4rem] top-[8rem]`:"dropdowninactive absolute right-[4rem] z-20 top-[5rem]"}>
                    <Dropdown requests={requests} loading={loading}/>
                </div>
        </div>
    )
}