import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";



export async function GET(req: NextRequest){

    try{
        const token = await getToken({req})
        const username = String(token?.username);

        const requests = await db.friendReq.findMany({
            where: {
                receiverId: username,
                status: "SENT",
            },
            select:{
                receiverId:true,
                sender:{
                    select:{
                        profilepic:true,
                        username:true,
                    }
                },
                senderId:true,
                createdAt:true,
            }
        })

        return NextResponse.json(requests)
    }
    catch(e){
        return NextResponse.json({error:e})
    }
}