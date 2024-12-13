"use client"
import { useState, } from 'react';
import Sidebar from '@/app/components/ui/Sidebar';
import ChatWindow from '@/app/components/ui/ChatWindow';
import { useGetUsers } from '../hooks/useGetUsers';

export default function ChatPage() {


    

        
       
        return (
      
      
          <div className="flex h-[calc(100vh-150px)]">
           
            <ChatWindow />
          </div>
        );
   
  
  
  
  
  

}