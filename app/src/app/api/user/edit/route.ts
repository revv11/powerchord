import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { writeFile } from "fs/promises";




export async function PUT(req:NextRequest){
    try{
        const session = await getServerSession();
        const email = session?.user.email;
    
        let path = "";
        const data = await req.formData();
        const file = data.get('file') as any;
        const name = data.get('name') as string;
        const bio = data.get('bio') as string;
        
        if(file){
            const byteData = await file.arrayBuffer();
        
            const buffer = Buffer.from(byteData);
           
            path = `./public/uploads/${email}${file.name}`
            await writeFile(path,buffer)
            const currentUser = await db.user.update({
                where:{
                    email
                },
                data: {
                    name: name,
                    bio: bio,
                    profilepic:`/uploads/${email}${file.name}`
                }
                }
                        
            )
            return NextResponse.json({user: currentUser})
         
            
            
        }
        const currentUser = await db.user.update({
            where:{
                email
            },
            data: {
                name: name,
                bio: bio,
            }
            }
                    
        )
        return NextResponse.json({user: currentUser})

        
      
    }
    catch(e){
        console.log(e)
    }

    
}