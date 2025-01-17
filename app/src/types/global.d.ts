type ConversationType = {
    id: number;
    username: string;
    profilepic?: string;
}

type MessageType = {
    id : number,
    body : string,
    senderId: string,
    createdAt: Date,
}

type RequestType={
    sender: {
        profilepic: string,
        username:string,
    },
    senderId: string,
    createdAt: string,
    receiverId: string,

}

type User={
    username: string,
    profilepic?: string,
    id : number,
}