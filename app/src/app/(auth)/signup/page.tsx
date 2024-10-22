"use client"
import Image from "next/image"
import Auth from "@/app/components/ui/Auth"
import { usePathname } from "next/navigation"


export default function Signup(){
    const path = usePathname()
    const isSignup = path.includes("signup")
    return(

        <section className="bg-gradient-to-r from-slate-900 to-slate-700">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                POWERCHORD   
            </a>
            <div className="w-full rounded-lg shadow bg-gray-900 md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {isSignup?"Sign up":"Login"} to your account
                    </h1>
                    <Auth/>
                </div>
            </div>
        </div>
        </section>
    )
}