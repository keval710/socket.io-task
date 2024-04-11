import express, { Express } from "express";
import "./db/conn";
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import cookieParser from 'cookie-parser';
import * as dotenv from "dotenv";

import { signup } from "./socketEvents/signup";
import { signIn } from "./socketEvents/signIn";
import { addNews } from "./socketEvents/addNews";
import { getNews } from "./socketEvents/getNews";
import { editNews } from "./socketEvents/editNews";
import { deleteNews } from "./socketEvents/deleteNews";
import { addComment } from "./socketEvents/addComments";
import { getComment } from "./socketEvents/getComments";

const app: Express = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/index.html");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

signup(io)
signIn(io)
getNews(io)
addNews(io)
editNews(io)
deleteNews(io)
addComment(io)
getComment(io)

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
