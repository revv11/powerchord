

import Auth from "@/app/components/ui/Auth"

export default function Login(){
    return(

        <section className="bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                POWERCHORD   
            </a>
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-900 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                        Sign in to your account
                    </h1>
                    <Auth/>
                </div>
            </div>
        </div>
        </section>
    )
}