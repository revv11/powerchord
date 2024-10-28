// components/Sidebar.tsx
import React from 'react';
import useConversation from '@/zustand/useConversation';
import { useSocketContext } from '@/app/context/SocketContext';
import Image from 'next/image';

type User = {
  id: number;
  username: string;
  profilepic?:string;
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
            onClick={() => setSelectedConversation({username: user.username, id:user.id, profilepic:user.profilepic})}
            className="cursor-pointer space-x-4 flex items-center p-2 rounded-md hover:bg-gray-300"
          >
            {user.profilepic?
              <Image alt='' className='w-10 h-10 rounded-full' src={user.profilepic} width={100} height={100}/>:
              <Image alt='' className='w-10 h-10 rounded-full' src="/images/demo.png" width={100} height={100}/>
            }
            <div>

              {user.username}
              <div className='text-green-600'>{onlineUsers.includes(user.username)?"online": ""}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

