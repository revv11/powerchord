import useListenMessages from "@/app/hooks/useListenMessages";





export default function MessageListener({children}:{children: React.ReactNode}){
    useListenMessages();
    return(
        <div className="h-full">
            {children}
        </div>
    )
}