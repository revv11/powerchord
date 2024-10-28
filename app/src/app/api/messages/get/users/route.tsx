import { NextApiRequest } from "next";
import { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export  async function GET(req: NextRequest){

    try{

        const token = await getToken({req})
        const username = String(token?.username);
    
    
        const users = await db.user.findMany({
            where: {
                username:{
                    not: username
                },
                
            },
            select:{
                username: true,
                id:true,
                profilepic:true,
            }
        })
        return NextResponse.json({users})
    }
    catch(e){
        console.log(e)
    }
}