
import { useSession } from "next-auth/react"
import useChatScroll from "@/app/hooks/useChatScroll";
import { useGetConversation } from "@/app/hooks/useGetConversation";
import useConversation from "@/zustand/useConversation";




export default function Messages(){
    const {selectedConversation} = useConversation()
    const {messages, loading} =useGetConversation()
    const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;
    const session = useSession()

    if(loading){
        return (
            <div>
                loadingggg
            </div>
        )
    }
    console.log(messages)
    return(
        <div className="flex-1 h-screen overflow-y-auto w-full mb-4" ref={ref}>
          <h2 className="text-xl font-semibold mb-2">{`Chat with ${selectedConversation?.username}`}</h2>
            <div className="space-y-2">
         

            {messages?.map((message: MessageType) => (
              <div className={`flex ${message.senderId===session.data?.user.username?"justify-end": ""}`} key={String(message.id)} >
               
                  <div className={`p-2 flex flex-col w-[50%] bg-slate-300 rounded-md`}>
                    <p className="font-semibold">{message.senderId===session.data?.user.username?"Me": message.senderId}:</p>
                    <p>{message.body}</p>
                  </div>                
                
              </div>
            ))}
          </div>
        </div>
        
    )
}