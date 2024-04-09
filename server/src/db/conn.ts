import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/news-app")
    .then(() => {
        console.log("Database Successfully Connected");
    })
    .catch((err) => {
        console.log(`Error while connecting to Database : ${err}`);
    });