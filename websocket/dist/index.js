"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket/socket");
const cors_1 = __importDefault(require("cors"));
socket_1.server.listen(4000, () => {
    console.log("listening on 4000");
});
const allowedOrigin = process.env.FRONTEND_URL; // Replace with the server's IP address or domain
// CORS options
const corsOptions = {
    origin: allowedOrigin, // Allow requests only from this IP address or domain
    methods: ['GET', 'POST'], // Restrict allowed HTTP methods if necessary
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};
// Use CORS middleware
socket_1.app.use((0, cors_1.default)(corsOptions));
socket_1.app.get("/", (req, res) => {
    console.log("hello");
    res.json({ hello: "hello" });
});
socket_1.app.post("/send/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reciever = req.params.id;
        // console.log(sender , message )
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(reciever);
        console.log({ receiverSocketId });
        socket_1.io.to(receiverSocketId).emit("newMessage", req.body);
        res.json(req.body);
    }
    catch (e) {
        console.log(e);
        res.json({ error: e });
    }
}));
// receiverId: 'sebastian',
//   createdAt: 2025-01-14T18:04:47.682Z,
//   sender: { username: 'revv11', profilepic: '' }
socket_1.app.post("/request/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reciever = req.params.id;
        console.log(req.body);
        // console.log(sender , message )
        const receiverSocketId = (0, socket_1.getReceiverSocketId)(reciever);
        console.log({ receiverSocketId });
        socket_1.io.to(receiverSocketId).emit("newRequest", req.body);
        res.json(req.body);
    }
    catch (e) {
        console.log(e);
        res.json({ error: e });
    }
}));
