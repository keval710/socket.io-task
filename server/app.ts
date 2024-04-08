import express, { Express } from "express";
import "./db/conn";
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import cookieParser from 'cookie-parser';
import * as dotenv from "dotenv";

import { signup } from "./socketEvents/signup";
import { signin } from "./socketEvents/signin";
import { addnews } from "./socketEvents/addnews";
import { getnews } from "./socketEvents/getnews";
import { editnews } from "./socketEvents/editnews";
import { deletenews } from "./socketEvents/deletenews";
import { addcomment } from "./socketEvents/addcomments";
import { getcomment } from "./socketEvents/getcomments";

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
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

signup(io)
signin(io)
getnews(io)
addnews(io)
editnews(io)
deletenews(io)
addcomment(io)
getcomment(io)

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
