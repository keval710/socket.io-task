import { newsModel } from "../model/news";
import { userModel } from "../model/user";
import jwt from "jsonwebtoken";
import Joi from 'joi';

const getNews = (io: any) => {
    io.on('connection', (socket: any) => {
        socket.on('getnews-client', async (data: any) => {
            try {

                const newsSchema = Joi.object({
                    token: Joi.string().required().messages({
                        'any.required': 'User Must Need To be Signin',
                        'string.empty': 'Token cannot be empty'
                    })
                })

                const validation = newsSchema.validate(data);

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

export { getNews };
