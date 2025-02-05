
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthContext from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";
import { UserContextProvider } from "./context/UserContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "POWERCHORD",
  description: "CONNECT WITH PEOPLE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#0E0D1D] w-full" suppressHydrationWarning>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased font-overpass`}
      >
        <AuthContext>
          <SocketContextProvider>
            <UserContextProvider>
              {children}
            </UserContextProvider>

          </SocketContextProvider>
        
        </AuthContext>
      </body>
    </html>
  );
}
