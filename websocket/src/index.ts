
import { app, getReceiverSocketId, server, io } from "./socket/socket";
import cors from "cors";




server.listen(4000, ()=>{
    console.log("listening on 4000")
})


const allowedOrigin = process.env.FRONTEND_URL; // Replace with the server's IP address or domain

// CORS options
const corsOptions = {
    origin: allowedOrigin, // Allow requests only from this IP address or domain
    methods: ['GET', 'POST'], // Restrict allowed HTTP methods if necessary
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

// Use CORS middleware
app.use(cors(corsOptions));

app.get("/", (req,res)=>{
    console.log("hello")
    res.json({hello: "hello"})
})

app.post("/send/:id", async (req,res)=>{
    try{
        const reciever = req.params.id;
        console.log(req.body);
        const {message, sender, id} = req.body;

        // console.log(sender , message )
        const receiverSocketId = getReceiverSocketId(reciever)
        console.log({receiverSocketId})
        io.to(receiverSocketId).emit("newMessage", {senderId: sender, body: message, id })
        res.json({id})

    }
    catch(e){
        console.log(e)
        res.json({error: e})
    }


})