import {withAuth} from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest,) {
  // Access cookies from the request
    const token = req.cookies.get('next-auth.session-token'); // Replace 'your_token_name' with the actual cookie name
    const url = req.nextUrl;
  if(url.pathname === ('/')){
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  else if (!token && (url.pathname.startsWith('/dashboard'))) {
    // If token is not found, you can redirect or return an error response
    return NextResponse.redirect(new URL('/login', req.url)); // Or any page you want to redirect to
  }
  else if(token && (url.pathname.startsWith('/login')|| url.pathname.startsWith('/signup'))){
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  else if(!token && (url.pathname.startsWith('/api/messages') || url.pathname.startsWith('/api/find')) ){
    return NextResponse.json({message: "login to kr pehle"})
  }
 
}
export const config={
    matcher:[
        "/dashboard/:path*",
        "/login",
        "/signup",
        "/api/messages/:path*",
        "/api/find", 
        
    ]
}