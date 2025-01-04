// components/Sidebar.tsx
import React from 'react';
import useConversation from '@/zustand/useConversation';
import { useSocketContext } from '@/app/context/SocketContext';
import Dp from './Dp';

type User = {
  id: number;
  username: string;
  profilepic?:string;
};

interface SidebarProps {
  users: User[];
}

const Sidebar: React.FC<SidebarProps> = ({ users }) => {
  const {setSelectedConversation, selectedConversation} = useConversation()
  const {onlineUsers} = useSocketContext();
  
  

  return (
    <div className="w-full h-full rounded-lg bg-[#0E0D1D] p-4">
      <h2 className="text-xl font-semibold my-10 text-white mb-4">Chats</h2>
      <ul className='space-y-2'>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setSelectedConversation({username: user.username, id:user.id, profilepic:user.profilepic})}
            className={`cursor-pointer ${selectedConversation?.username === user.username && "bg-gray-700"} space-x-4 flex items-center p-2 text-white rounded-md hover:bg-gray-700`}
          >
            {user.profilepic?
              <Dp url={user.profilepic} size="10"/>:
              <Dp url={"/images/demo.png"} size="10"/>
              
            }
            {onlineUsers.includes(user.username)?<div className='h-3 w-3 bg-green-600 top-4 right-7 relative rounded-full border border-white'></div>: <div className='h-3 w-3 bg-transparent top-4 right-7 relative rounded-full  '></div>}
            
            <div>

              {user.username}
              <div className='text-green-600'></div>
              {}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

