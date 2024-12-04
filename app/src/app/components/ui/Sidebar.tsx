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
    <div className="w-1/4 bg-blue-200 p-4">
      <div className='p-10 mx-auto bg-white rounded-lg '>
        <h1 className="text-2xl  text-center font-bold">POWERCHORD</h1>
      </div>
      <h2 className="text-xl font-semibold mb-4">Chats</h2>
      <ul className='felx space-y-2'>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setSelectedConversation({username: user.username, id:user.id, profilepic:user.profilepic})}
            className={`cursor-pointer ${selectedConversation?.username === user.username && "bg-blue-300"} space-x-4 flex items-center p-2 rounded-md hover:bg-blue-100`}
          >
            {user.profilepic?
              <Dp url={user.profilepic} size="10"/>:
              <Dp url={"/images/demo.png"} size="10"/>
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

