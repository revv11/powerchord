"use client"


interface childrenType{
    children: React.ReactNode
}


export default function RootLayout({
    children
}:childrenType){


    return(
        <div>
            {children}
        </div>
    )
}