"use client"
import { useEffect, useState } from "react"
import {FaSearch} from "react-icons/fa"
import { db } from "@/lib/db"
import axios from "axios"

export default function Searchbar({setData}){
    
    const [value, setValue]  = useState("")

    
    
    useEffect(()=>{
        
    
            fetch("http://localhost:3000/api/find")
               .then((response)=> response.json())
               .then((json)=>{
                   const results = json.filter((user)=>{
                       return value && user && user.username && user.username.toLowerCase().includes(value);
                   }) 
                   setData(results)
               })
               
       
           
    }, [value])



    return(
        <div className="bg-white flex space-x-4 items-center rounded-xl h-[2.5rem] px-2 w-[20rem] shadow-lg">
            <FaSearch id="search-icon"/>
            <input type="text" placeholder="Search Users" onChange={(e)=>{setValue(e.target.value)}} className="  outline-none"/>
        </div>
    )
}