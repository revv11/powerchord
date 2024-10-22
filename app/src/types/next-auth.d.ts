import 'next-auth'


declare module 'next-auth' {
    interface User{
        id?: string;
        isVerified?:boolean;
        isAcceptingMessages?:boolean;
        username?: string;
    }
    interface Session{
        user:{
            id?: string;
            username?: string
        }
    }
}