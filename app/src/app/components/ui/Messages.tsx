
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
            <h2 className="text-xl font-semibold mb-2">{`Chat with ${selectedConversation?.username}`}</h2>
            <div className="flex justify-center items-center h-[calc(100vh-250px)]">
                <h1>loadingggg</h1>
            </div>

          </div>
        )
    }

    return(
        <div className="">
          <h2 className="text-xl text-white font-semibold mb-2">{`Chat with ${selectedConversation?.username}`}</h2>
          <div className="flex-1 h-[calc(100vh-250px)] overflow-y-auto w-full mb-4" ref={ref}>
              <div className="space-y-2">
          

              {messages?.map((message: MessageType) => (
              
                  (message.senderId===selectedConversation?.username || message.senderId===session.data?.user.username) &&
                  <div className={`flex ${message.senderId===session.data?.user.username?"justify-end": ""}`} key={String(message.id)}>
                    <div className={`p-2 flex items-center space-x-5 w-[50%] bg-slate-300 backdrop-blur-sm rounded-md`}>
                    <div>
                      <p className="font-semibold">{message.senderId===session.data?.user.username?"Me": message.senderId}:</p>
                      <p>{message.body}</p>
                    </div>
                    </div>                

                  </div>
                  
                  
              
              ))}
            </div>

          </div>
        </div>
        
    )
}