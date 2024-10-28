import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";







export async function GET(req:NextRequest, {params}: {params: {username: string}}){
    const username = params.username;

    const user = await db.user.findUnique({
        where:{
            username: username,
        },
        select:{
            
            username:true,
            profilepic:true,
            createdAt:true,
            id: true,
            bio:true,
            name:true,
            
            
            

            
        }
    })
    return NextResponse.json({user})



}