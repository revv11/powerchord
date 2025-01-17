"use client"
import Image from 'next/image';
import { useGetUser } from '../hooks/useGetUser';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Appbar from '../components/ui/Appbar';
import useConversation from '@/zustand/useConversation';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Spinner from '../components/ui/Spinner';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/UserContext';



export default function UserProfile({params}:{params:{
    username:string
}}) {
  const currentUser = useUserContext()
  const [load, setLoad] = useState(false)
  const [friends, setFriends] = useState<any[]>([]);
  useEffect(()=>{
    if(currentUser.friends){
      setFriends(currentUser.friends)
      
     
    }
    
  },[currentUser])
  const [sent , setSent] = useState(false)
  
  const isFriend = friends.some(items=> items.username === params.username)

  
  const sendfriendReq = async ()=>{
        try{
          setLoad(true)
          const res = await axios.post(`/api/friendreq/${params.username}`)
          setLoad(false)
          setSent(true)
        }
        catch(e){
          console.log(e)
        }
  }
  const router = useRouter()
  const {setSelectedConversation} = useConversation()
  const session = useSession()
  const {user, loading} = useGetUser(params.username)
  if(loading && !currentUser){
    return(
      <div className='h-full flex justify-center items-center'>
        <Spinner size="8"/>
      </div>
    )
  }
  else if(user){
      return (
        <div className="bg-[#020210]">
          <Appbar/>
        <div className='flex items-center justify-center h-[calc(100vh-110px)] '>

      <div className="max-w-lg w-full p-6 shadow-xl border border-gray-700 bg-transparent backdrop-blur-2xl rounded-lg">
        <div className="flex justify-between items-center">
          <div className='flex items-center'>

            {user?.profilepic?
          <Image alt="" src={user?.profilepic} className='rounded-full h-[4rem] w-[4rem]' width={100} height={100}/>:
          <Image alt="" src="/images/demo.png" width={100} height={100}/>
        }
            <div className="ml-6 text-white">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-white">@{user.username}</p>
              <p className="text-sm text-gray-400">Joined: {new Date(user.createdAt).toDateString()}</p>
            </div>

          </div>
          {session.data?.user.username === params.username &&
            <Link href={`/edit/${params.username}`}>
              <button className='mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200'>Edit</button>
            </Link>
          }

        </div>
        <p className="mt-4 text-gray-700">{user.bio}</p>
        {session.data?.user.username != params.username &&
            <div>
              {isFriend && 
                <button
                  className="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={() => {router.push(`/dashboard`); setSelectedConversation(user)}}
                >
                  Message
                </button>
              }
              {(!isFriend && !sent && !currentUser.friendreq?.some(item => item.receiverId === params.username)) && 
                <button
                  className="mt-6 w-full py-2 px-4 flex justify-center items-center text-xl bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={sendfriendReq}
                >
                  {!load && "Add friend"}
                  {load && <Spinner size="4"/>}
                </button>
              }
              {(sent || currentUser.friendreq?.some(item => item.receiverId === params.username) ) &&
                <button
                className="mt-6 w-full py-2 px-4 border text-white font-semibold rounded-md cursor-context-menu transition duration-200"
              >
                Requested
              </button>
              }
            </div>
          }
      </div>
          </div>
    </div>
      );

  }
  else if(!loading && !user)
    return(
        <div>
            not found
        </div>
    )
  
}
