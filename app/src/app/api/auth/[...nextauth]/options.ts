import { db } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";






export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {

            username: { label: "Username", type: "text", placeholder: "revv"},
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
                let existingUser;
              
                existingUser = await db.user.findFirst({
                    where: {
                        username: credentials.username
                    }
                });
    
                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            username: existingUser.username,
                            email: existingUser.email,
                            name: existingUser.name,
                            profilepic: existingUser.profilepic,
                            isVerified: existingUser.isVerified
                        }
                    }
                    return null
                }
    
                return null
                
          
           
            
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token , user}: {token: any, user:any}){
            if(user){
                token.id = user.id?.toString(),
                token.isVerified = user.isVerified;
                token.username = user.username;
                token.name = user.name;
                token.profilepic= user.profilepic;

            }
            return token;
        },
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            if(token){
                session.user.id = token.id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
                session.user.name = token.name;
                session.user.profilepic = token.profilepic;

            }

            return session
        }
    }
  }
  