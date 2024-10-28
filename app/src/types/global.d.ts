type ConversationType = {
    id: Number;
    username: string;
    profilepic?: string;
}

type MessageType = {
    id? : Number;
    body : string;
    senderId: string,
}