import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.MAIL_PASS
    }
  });

export const sendEmail = async ({email, userId}:any)=>{
    try{
        const hashedToken = jwt.sign(userId, process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || "test")
        const info = await transporter.sendMail({
            from: '"verify👻" <anand.utkarsh18@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "VERIFY", // Subject line
            // text: hashedToken, // plain text body
            html: `
              <h1>CLICK 
              <a href=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/verify/${hashedToken}>HERE</a>
              THE LINK TO VERIFY EMAIL</h1>
              `, // html body
          });

        console.log("mail sent")
    }
    catch(e:any){
        throw new Error(e.messages)
    }
}