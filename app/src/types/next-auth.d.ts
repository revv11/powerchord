import 'next-auth'
import { DefaultSession } from 'next-auth';


declare module 'next-auth' {
    interface User{
        id?: string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        username?: string;
    }
    interface Session extends DefaultSession{
        user:{
            id?: string;
            username?: string
            email?:string,
        }
    }
}