import { Server } from "socket.io";
import http from "http";
import express from "express"
import dotenv from "dotenv"



const app = express();
dotenv.config()
app.use(express.json())

const frontendurl = process.env.FRONTEND_URL

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: [`${frontendurl}`],
        methods: ["GET", "POST"],
    }
});


export const getReceiverSocketId = (receiverId: string) => {
    return userSocketMap[receiverId];
}

const userSocketMap: {[key:string]: string} = {};

io.on("connection", (socket)=>{
    console.log("a user connected", socket.id)
    const userId = socket.handshake.query.username as string;
    

    if (userId) userSocketMap[userId] = socket.id;
    console.log(userSocketMap)
    io.emit("getOnlineUsers", Object.keys(userSocketMap));


    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    } )
})


export { app, io, server}