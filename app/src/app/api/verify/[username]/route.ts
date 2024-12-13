import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";





export async function GET(req:NextRequest, {params}: {params: {username: string}}){
    const username = params.username;

    const user = await db.user.update({
        where:{
            username: username,
        },
        data:{
            
            isVerified:true,
            
            
            

            
        }
    })
    return NextResponse.json({user})



}