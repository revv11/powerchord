import {create } from 'zustand'





interface ConversationState{
    selectedConversation: ConversationType | null;
    messages: MessageType[];
    newmessages: MessageType[];
    setSelectedConversation : (conversation: ConversationType | null)=> void;
    setMessages: (messages: MessageType[]) =>void;
    setnewMessages: (messages: MessageType[]) =>void;
    count : number;
    setCount: (count: number)=>void
}


const useConversation = create<ConversationState>((set)=>({
    selectedConversation : null,
    setSelectedConversation: (conversation) =>set({selectedConversation: conversation}),
    messages : [],
    newmessages : [],
    setMessages: (messages)=>set({messages: messages}),
    setnewMessages: (messages)=>set({messages: messages}),
    count: 0,
    setCount: (count)=>set({count: count +2}),
}))


export default useConversation;