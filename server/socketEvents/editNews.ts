import { newsModel } from "../model/news";
import { userModel } from "../model/user";
import jwt from "jsonwebtoken";
import Joi from 'joi';

const editNews = (io: any) => {
    io.on('connection', (socket: any) => {

        socket.on('edit1news-client', async (data: any) => {
            try {
                const schema = Joi.object({
                    token: Joi.string().required().messages({
                        'any.required': 'Token is required.',
                        'string.empty': 'Token cannot be empty.'
                    }),
                    id: Joi.string().required().messages({
                        'any.required': 'ID is required.',
                        'string.empty': 'ID cannot be empty.'
                    }),
                    title: Joi.string().required().messages({
                        'any.required': 'Title is required.',
                        'string.empty': 'Title cannot be empty.'
                    }),
                    subtitle: Joi.string().required().messages({
                        'any.required': 'Subtitle is required.',
                        'string.empty': 'Subtitle cannot be empty.'
                    }),
                    description: Joi.string().required().messages({
                        'any.required': 'Description is required.',
                        'string.empty': 'Description cannot be empty.'
                    })
                });

                const validation = schema.validate(data);

                if (validation.error) {
                    const errorMessage = validation.error.details[0].message;
                    io.emit("error", errorMessage);
                    return;
                }

                const { token, id, title, subtitle, description } = data

                const SECRET_KEY: string = process.env.SECRET_KEY as string


                const userData = jwt.verify(token, SECRET_KEY) as { _id: string }

                if (userData) {
                    const user = await userModel.findById(userData._id)
                    if (user) {
                        const news = await newsModel.findByIdAndUpdate(id, { title, subtitle, description })
                        if (news) {
                            io.emit("edit1news-server", "News Updated Successfully")
                        }
                    }
                }
                else {
                    io.emit("error", "Verification Failed");
                }

            } catch (error: any) {
                io.emit("error", error.message);
            }
        });

        socket.on('editnews-client', async (data: any) => {
            try {
                const editNewsSchema = Joi.object({
                    token: Joi.string().required().messages({
                        'any.required': 'User Must Need To be Signin',
                        'string.empty': 'Token cannot be empty'
                    })
                })

                const validation = editNewsSchema.validate(data);

                if (validation.error) {
                    const errorMessage = validation.error.details[0].message;
                    io.emit("error", errorMessage);
                    return;
                }

                const { token } = data
                const SECRET_KEY: string = process.env.SECRET_KEY as string
                const userData = jwt.verify(token, SECRET_KEY) as { _id: string }

                if (userData) {
                    const user = await userModel.findById(userData._id)
                    if (user) {
                        const newsByUser = await newsModel.find({ author_id: userData._id })
                        io.emit("editnews-server", newsByUser);
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

export { editNews };