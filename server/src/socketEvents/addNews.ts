import { newsModel } from "../model/news";
import { userModel } from "../model/user";
import jwt from "jsonwebtoken";
import Joi from 'joi';
import path from 'path'
import fs from 'fs'

const addNews = (io: any) => {

    io.on('connection', (socket: any) => {
        socket.on('addnews-client', async (data: any) => {
            try {
                const newsSchema = Joi.object({
                    title: Joi.string().required().messages({
                        'any.required': 'Title is required',
                        'string.empty': 'Title cannot be empty'
                    }),
                    subTitle: Joi.string().required().messages({
                        'any.required': 'Subtitle is required',
                        'string.empty': 'Subtitle cannot be empty'
                    }),
                    description: Joi.string().required().messages({
                        'any.required': 'Description is required',
                        'string.empty': 'Description cannot be empty'
                    }),
                    token: Joi.string().required().messages({
                        'any.required': 'User Must Need To be Signin',
                        'string.empty': 'Token cannot be empty'
                    }),
                    image: Joi.any().required().messages({
                        'any.required': 'Image is required',
                        'string.empty': 'Image cannot be empty'
                    })
                })

                const validation = newsSchema.validate(data);

                if (validation.error) {
                    const errorMessage = validation.error.details[0].message;
                    io.emit("error", errorMessage);
                    return;
                }

                const SECRET_KEY: string = process.env.SECRET_KEY as string

                const { title, subTitle, description, token, image } = data;

                const userData = jwt.verify(token, SECRET_KEY) as { _id: string }

                if (userData) {
                    const author_id = userData._id
                    const user = await userModel.findOne({ _id: author_id }, { _id: 0, name: 1 })
                    const author_name = user?.name

                    const imageFileName = `news_${Date.now()}.jpg`;
                    const uploadPath = path.join(__dirname, '../uploads/', imageFileName);
                    fs.writeFileSync(uploadPath, image[0]);

                    const news = new newsModel({ title, subTitle, description, author_id, author_name, image: imageFileName })
                    const save = await news.save()

                    if (save) {
                        io.emit('addnews-server', "News Added Successfully")

                        const news = await newsModel.find()
                        io.emit("news", news);
                    }
                }
                else {
                    io.emit("error", "Verification Failed");
                }



            } catch (error: any) {
                io.emit("error", error.message);
            }
        });
    });
};

export { addNews };
