import Link from "next/link"
import Dp from "./Dp"
import { useUserContext } from "@/app/context/UserContext";
import { useSession } from "next-auth/react";

export default function Userimg(){

    const {profilepic} = useUserContext();
    const session = useSession();
    const username  = session.data?.user?.username
    return(
        <div className="">
            {profilepic?
                
                <Link href={`/${username}`}>
                    <Dp url={profilepic} size="12"/>
                </Link>
                    :
                <Link href={`/${username}`}>
                    <Dp url={"/images/demo.png"} size="12"/>
                </Link>
            }
        </div>
    )
}