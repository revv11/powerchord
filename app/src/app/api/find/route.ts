import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    const users = await db.user.findMany({
        select:{
            username:true,
        }
    })
    return NextResponse.json(users)
}