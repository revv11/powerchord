
import Image from 'next/image';
import demo from "@/../public/images/demo.png"
import { db } from '@/lib/db';
import Link from 'next/link';
import useConversation from '@/zustand/useConversation';


export default async function UserProfile({params}:{params:{
    username:string
}}) {
  

  const user = await db.user.findUnique({
    where:{
        username: params.username
    },
    select:{
        username:true,
        createdAt:true,
        id: true,
    }
  })
  if(user){
    
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                {/* Profile picture */}
                <Image
                  src={demo}
                  alt={`${user?.username}'s profile picture`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              {/* Username */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {user?.username}
              </h2>
              {/* Member since */}
              <p className="text-gray-600 mb-4">Member since {user?.createdAt.toString()}</p>
              {/* Message button */}
              <Link href="/dashboard">
                <button  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                  Message
                </button>
              </Link>
            </div>
          </div>
        </div>
      );

  }
  else{
    return(
        <div>
            not found
        </div>
    )
  }
}
