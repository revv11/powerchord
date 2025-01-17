import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";



export async function POST(req: NextRequest){
    try{
        const body = await req.json()
        console.log(body)
        const {sender, receiver , response} = body;
        await db.friendReq.update({
            where:{
                senderId_receiverId: { senderId: sender, receiverId: receiver}
            },
            data:{
                status:response,
            }
        })
        await db.friendReq.delete({
            where:{
                senderId_receiverId: {senderId:sender, receiverId: receiver}
            }
        })
        if(response === "ACCEPTED"){

            const addfriend1 = await db.user.update({
                where:{
                    username: sender
                },
                data:{
                    Friends: {
                        connect:{
                            username:receiver
                        }
                    }
                }
            })
            const addfriend2 = await db.user.update({
                where:{
                    username: receiver
                },
                data:{
                    Friends: {
                        connect:{
                            username:sender
                        }
                    }
                }
            })
            const mirrorReq = await db.friendReq.findUnique({
                where:{
                    senderId_receiverId: {senderId:receiver, receiverId: sender}
                }
            })
            if(mirrorReq){
                await db.friendReq.delete({
                    where:{
                        senderId_receiverId: {senderId:receiver, receiverId: sender}
                    }
                })
            }
            
        }
        console.log("updated")
        return NextResponse.json({message:"success"})
    }
    catch(e){
        return NextResponse.json({error:e})
    }
}