import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    news_id: {
        type: String
    },
    comment: {
        type: String
    }
})

const commentModel = mongoose.model("comment", commentSchema)

export { commentModel };