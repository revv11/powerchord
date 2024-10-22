import Appbar from "../components/ui/Appbar"


export default async function UserLayout({
    children
}:{
    children : React.ReactNode
}){
    return(
        <div className="h-screen">
            <Appbar/>
            <div className="">
                {children}
            </div>

        </div>
        
    )
}