"use client"
import { useEffect, useState } from "react"
import {FaSearch} from "react-icons/fa"


export default function Searchbar({setData}:any){
    
    const [value, setValue]  = useState("")
    const [res , setRes] = useState<any[]>()
    useEffect(()=>{
        fetch("/api/find")
            .then((response)=>response.json())
            .then((json)=>{
                setRes(json)
            })
    },[])
    
    
    useEffect(()=>{
        
    
        if(res){
            const results = res.filter((user:any)=>{
                return value && user && user.username && user.username.toLowerCase().includes(value);
            }) 
            setData(results)

        }   
              
               
       
           
    }, [value])



    return(
        <div className="bg-gray-700 w-[20rem] flex space-x-4 items-center rounded-xl h-[2.5rem] px-2  shadow-lg">
            <FaSearch id="search-icon" color="white"/>
            <input  type="text" placeholder="Search Users" onChange={(e)=>{setValue(e.target.value)}} className=" bg-transparent text-white outline-none"/>
        </div>
    )
}