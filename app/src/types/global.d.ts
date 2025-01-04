type ConversationType = {
    id: number;
    username: string;
    profilepic?: string;
}

type MessageType = {
    id? : number;
    body : string;
    senderId: string,
}