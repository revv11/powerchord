import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { db } from "@/lib/db";

export async function GET(req: NextRequest, {params}: {params:{id:string}}){
    try{
        const receiver = params.id;
        const token = await getToken({req})
        const sender = String(token?.username);
        

        const conversation = await db.conversation.findFirst({
            where:{
                participantIds: {
                    hasEvery: [sender, receiver]
                }
            },
            include: {
                messages:{
                    orderBy:{
                        createdAt: "asc"
                    }
                }
            }
        })
        if(!conversation){
            return NextResponse.json([])
        }
        return NextResponse.json(conversation)
    }
    catch(e){
        console.log(e)
    }
}