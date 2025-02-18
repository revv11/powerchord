
import { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export  async function GET(req: NextRequest){

    try{

        const token = await getToken({req})
        const username = String(token?.username);
    
    
        const users = await db.user.findUnique({
            where: {
                username
                
            },

            select:{
                Friends:{
                    select:{
                        username: true,
                        id:true,
                        profilepic:true,

                    }
                }
            }
        })
        return NextResponse.json({users: users?.Friends})
    }
    catch(e){
        console.log(e)
        return NextResponse.json({error:e})
    }
}