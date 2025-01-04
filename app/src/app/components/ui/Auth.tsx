"use client"
import {  usePathname } from "next/navigation"
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";




export default function Auth(){
    const router = useRouter()
    const [err, setErr] = useState<string>();
 

    async function submitlogin(e:any) {
        console.log(fields)
        e.preventDefault()
        try{
            
            
            const signInData = await signIn('credentials',{
                redirect:false,
                username : fields.username,
                password: fields.password
            
            })
            console.log(signInData)
            if(signInData?.error){
                setErr("Invalid Credentials")
            }

            router.push('/dashboard')
            

        }
        catch(e){
            console.log(e)
        }
        

    }


    async function submitsignup(event:any){
    
        event.preventDefault()
        try{
            
            const response = await axios.post('/api/user' , {username: fields.username, email: fields.email, password: fields.password})
            
            
            router.push('/verifyemail')
          

        }
        catch(e:any){
            if(e.response?.data)
                console.log(e.response?.data)
                setErr(e.response?.data.message)

            console.log(e)
        }
        
    }

    const path = usePathname();
    const isSignup = path.includes("signup")
    const [fields , setFields] = useState({
        username : "",
        email : "",
        password: "",
    })
    return(
        <form className="space-y-4 md:space-y-6">
                    <div className="text-red-700">{err}</div>
                        {isSignup&&
                        <div>
                            <label  className="block mb-2 text-sm font-medium  text-white">Email</label>
                            <input onChange={(e)=>{setFields({...fields, email: e.target.value})}}type="email" name="email" id="email" className=" border  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="" required />
                        </div>
                        }
                        <div>
                            <label  className="block mb-2 text-sm font-medium  text-white">Username</label>
                            <input onChange={(e)=>{setFields({...fields, username: e.target.value})}}type="username" name="username" id="username" className="border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required/>
                        </div>
                        <div>
                            <label  className="block mb-2 text-sm font-medium  text-white">Password</label>
                            <input onChange={(e)=>{setFields({...fields, password: e.target.value})}}type="password" name="password" id="password"  className=" border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                
                            </div>
                            <a href="#" className="text-sm font-medium text-white text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <button onClick={isSignup?submitsignup:submitlogin}  className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isSignup?"Sign up":"Login"}</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link href={isSignup?"/login": "/signup"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">{isSignup?"Login":"Sign up"}</Link>
                        </p>
        </form>
    )
}