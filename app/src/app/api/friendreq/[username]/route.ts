import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import axios from "axios";



export async function POST(req: NextRequest , {params}:{params:{username:string}}){
    try{
        const receiver = String(params.username);
        
        const token = await getToken({req})
        const sender = String(token?.username);
        const friendreq = await db.friendReq.create({
            data:{
                senderId: sender,
                receiverId: receiver
            },
            select:{
                receiverId:true,
                senderId:true,
                createdAt:true,
                sender:{
                    select:{
                        username: true,
                        profilepic: true,


                    }

                }
            }
        })
        axios.post(`${process.env.BACKEND_URL}/request/${receiver}`, friendreq)
        return NextResponse.json({sent: friendreq})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:e})
    }
}