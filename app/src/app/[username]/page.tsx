"use client"
import Image from 'next/image';
import { useGetUser } from '../hooks/useGetUser';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Appbar from '../components/ui/Appbar';


export default function UserProfile({params}:{params:{
    username:string
}}) {
  const session = useSession()
  const {user, loading} = useGetUser(params.username)
  if(loading){
    return(
      <div>
        loading..
      </div>
    )
  }
  else if(user){
      console.log(user)
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
        <button
          className="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          // onClick={() => router.push(`/messages/${username}`)}
        >
          Message
        </button>
        <button
          className="mt-6 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          // onClick={() => router.push(`/messages/${username}`)}
        >
          Add Friend
        </button>
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
