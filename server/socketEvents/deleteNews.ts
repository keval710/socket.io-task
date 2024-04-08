import { newsModel } from "../model/news";
import { userModel } from "../model/user";
import jwt from "jsonwebtoken";
import Joi from 'joi';

const deleteNews = (io: any) => {
    io.on('connection', (socket: any) => {
        socket.on('deletenews-client', async (data: any) => {
            try {
                console.log(data);
                const schema = Joi.object({
                    token: Joi.string().required().messages({
                        'any.required': 'Token is required.',
                        'string.empty': 'Token cannot be empty.'
                    }),
                    id: Joi.string().required().messages({
                        'any.required': 'ID is required.',
                        'string.empty': 'ID cannot be empty.'
                    })
                });

                const { error } = schema.validate(data);
                if (error) {
                    io.emit("error", error.details[0].message);
                    return;
                }

                const { token, id } = data;

                const SECRET_KEY: string = process.env.SECRET_KEY as string

                const userData = jwt.verify(token, SECRET_KEY) as { _id: string }

                if (userData) {
                    const user = await userModel.findById(userData._id)
                    if (user) {
                        const newsdel = await newsModel.findByIdAndDelete(id)
                        if (newsdel) {
                            io.emit("deletenews-server", "News Deleted Successfully")
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
    });
};

export { deleteNews };
