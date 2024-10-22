"use client"
import { useState, } from 'react';
import Sidebar from '@/app/components/ui/Sidebar';
import ChatWindow from '@/app/components/ui/ChatWindow';
import { useGetUsers } from '../hooks/useGetUsers';



// const users = [
//   { id: 1, username: 'John Doe' },
//   { id: 2, username: 'Jane Smith' },
//   { id: 3, username: 'Mike Johnson' },
// ];

export default function ChatPage() {
    const [selectedUser, setSelectedUser] = useState("");
    const {users , loading} = useGetUsers();
    if(loading){
        return(
            <div className='flex justify-center items-center'>
                Loading...
            </div>
        )
        
    }
        // setSelectedUser(users[0].username)
        
        const handleUserSelect = (userId: number) => {
          const user = users.find((u) => u.id === userId);
          if (user) {
            setSelectedUser(user.username);
          }
        };
        return (
      
      
          <div className="flex h-[calc(100vh - 150px)]">
            <Sidebar users={users} onSelectUser={handleUserSelect} />
            <ChatWindow />
          </div>
        );
   
  
  
  
  
  

}