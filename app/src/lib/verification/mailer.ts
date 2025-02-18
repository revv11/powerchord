import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

// Looking to send emails in production? Check out our Email API/SMTP product!
const transporter = nodemailer.createTransport({
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
        const hashedToken = jwt.sign(userId, process.env.NEXTAUTH_SECRET || "test")
        await transporter.sendMail({
            from: '"POWERCHORD"<anand.utkarsh18@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "VERIFY", // Subject line
            // text: hashedToken, // plain text body
            html: `
              <h1>CLICK 
              <a href=${process.env.FRONTEND_URL}/verify/${hashedToken}>HERE</a>
              THE LINK TO VERIFY EMAIL</h1>
              `, // html body
          });

        console.log("mail sent")
    }
    catch(e:any){
        throw new Error(e.messages)
    }
}