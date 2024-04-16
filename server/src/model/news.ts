import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    subTitle: {
        type: String
    },
    description: {
        type: String
    },
    author_id: {
        type: String
    },
    author_name: {
        type: String
    },
    image: {
        type: String
    }
})

const newsModel = mongoose.model("news", newsSchema)

export { newsModel };