"use client"

import ChatWindow from '@/app/components/ui/ChatWindow';
import MessageListener from '../components/Listeners/MessageListener';


export default function ChatPage() {


    

        
       
        return (
      
          <MessageListener>
              <div className="flex h-full">              
                <ChatWindow />
              </div>
          </MessageListener>
        );
   
  
  
  
  
  

}