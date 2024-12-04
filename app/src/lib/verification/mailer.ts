import nodemailer from "nodemailer"
import { db } from "../db"
import bcryptjs from "bcryptjs"



export const sendEmail = async ({email, emailType, userId}:any)=>{
    try{
        const hashedToken = await bcryptjs.hash(userId,10)
    }
    catch(e:any){
        throw new Error(e.messages)
    }
}