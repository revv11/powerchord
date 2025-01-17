import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import axios from "axios";



export async function PUT(req: NextRequest, {params}: {params: {id: string}}){
    try{
        const message = await req.json();
        
        const token = await getToken({req})
        const sender = String(token?.username);
        const receiver = params.id;
      
  
            let conversation = await db.conversation.findFirst({
                where: {
                    participantIds:{
                        hasEvery: [sender , receiver]
                    }
                }
            })
    
            if(!conversation){
                
                conversation = await db.conversation.create({
                    data:{
                        
                        participantIds: [sender, receiver],
                        participants:{
                            connect:[{
                                username:sender
                            },
                            {
                                username:receiver
                            }
                        ]
                        }
                    }
                })

              
            }

            const newMessage = await db.messages.create({
                data:{
                    senderId: sender,
                    body: message.message,
                    conversationId: conversation.id,


                }
            })

            if(newMessage){
                conversation = await db.conversation.update({
                    where : {
                        id: conversation.id
                    },
                    data:{
                        messages:{
                            connect: {
                                id: newMessage.id
                            }
                        }
                    }
                })
            }
          
            const msg = newMessage as MessageType;
            const response = await axios.post(`${process.env.BACKEND_URL}/send/${receiver}`, msg)
            
            console.log(response.data)

            return NextResponse.json(newMessage)
        
       

    }
    catch(e){
        return NextResponse.json({error: e})
    }
    


    
}