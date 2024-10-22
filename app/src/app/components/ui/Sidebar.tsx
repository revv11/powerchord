// components/Sidebar.tsx
import React from 'react';
import useConversation from '@/zustand/useConversation';
import { useSocketContext } from '@/app/context/SocketContext';

type User = {
  id: number;
  username: string;
};

interface SidebarProps {
  users: User[];
  onSelectUser: (userId: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ users }) => {
  const {setSelectedConversation, selectedConversation} = useConversation()
  const {onlineUsers} = useSocketContext();
  
  

  return (
    <div className="w-1/4 h-[60%] bg-gray-200 p-4">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setSelectedConversation({username: user.username, id:user.id})}
            className="cursor-pointer p-2 rounded-md hover:bg-gray-300"
          >
            {user.username}
            <div>{onlineUsers.includes(user.username)?"online": ""}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

