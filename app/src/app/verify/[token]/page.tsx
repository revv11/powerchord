"use client"
import jwt from "jsonwebtoken"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";




export default function Verify({params}:{params: {
    token: string
}}){
    const router = useRouter();
    const token = params.token;
    const [payload, setPayload] = useState("");
    const [status , setStatus]=  useState("PROCESSING")
 
    
    useEffect(()=>{
        async function verifytoken(){
            try{
                signOut({ redirect: false })
                const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || "test")
                if(decoded!= undefined){
                
                    setPayload(String(decoded))
                    await axios.get(`/api/verify/${decoded}`)
                    setStatus("VERIFIED")
                    setTimeout(()=>{
                        router.push('/login')

                    },10000)
    
    
                }

            }
            catch(e){
                console.log(e)
            }

        }
        verifytoken()

    },[])
    return(
        <div className="flex justify-center flex-col space-y-10 items-center h-full text-2xl">
            <h1>
                STATUS: <span className="text-green-800">{status}</span>
            </h1>
            <h1>
                Hello {payload}
            </h1> 
            <div>
                {status==="VERIFIED"?
                <button className="border p-5 rounded-xl border-gray-800" onClick={()=>{router.push("/login")}}>
                    REDIRECT TO LOGIN PAGE
                </button>:
                <h1>
                </h1>}
            </div>
        </div>
    )
}