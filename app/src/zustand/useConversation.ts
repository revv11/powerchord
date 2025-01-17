import {create } from 'zustand'





interface ConversationState{
    selectedConversation: ConversationType | null;
    messages: MessageType[];
    newmessages: MessageType[];
    requests : RequestType[];
    setSelectedConversation : (conversation: ConversationType | null)=> void;
    setMessages: (messages: MessageType[]) =>void;
    setRequests: (requests: RequestType[]) =>void;
    setnewMessages: (messages: MessageType[]) =>void;
    count : number;
    setCount: (count: number)=>void
    friends: User[];
    setFriends: (friends: User[])=>void
}


const useConversation = create<ConversationState>((set)=>({
    selectedConversation : null,
    setSelectedConversation: (conversation) =>set({selectedConversation: conversation}),
    messages : [],
    requests: [],
    newmessages : [],
    friends:[],
    setFriends : (friends)=>set({friends:friends}),
    setRequests: (requests)=> set({requests:requests}),
    setMessages: (messages)=>set({messages: messages}),
    setnewMessages: (messages)=>set({messages: messages}),
    count: 0,
    setCount: (count)=>set({count: count +2}),
}))


export default useConversation;