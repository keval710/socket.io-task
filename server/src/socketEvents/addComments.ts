import { commentModel } from "../model/comment";
import jwt from "jsonwebtoken";
import Joi from 'joi';

const addComment = (io: any) => {
    io.on('connection', (socket: any) => {
        socket.on('addcomment-client', async (data: any) => {
            try {
                const schema = Joi.object({
                    token: Joi.string().required().messages({
                        'any.required': 'Token is required.',
                        'string.empty': 'Token cannot be empty.'
                    }),
                    user_id: Joi.string().required().messages({
                        'any.required': 'User ID is required.',
                        'string.empty': 'User ID cannot be empty.'
                    }),
                    news_id: Joi.string().required().messages({
                        'any.required': 'News ID is required.',
                        'string.empty': 'News ID cannot be empty.'
                    }),
                    comment: Joi.string().required().messages({
                        'any.required': 'Comment is required.',
                        'string.empty': 'Comment cannot be empty.'
                    })
                });

                const { error } = schema.validate(data);
                if (error) {
                    io.emit("error", error.details[0].message);
                    return;
                }

                const { token, user_id, news_id, comment } = data;


                const SECRET_KEY: string = process.env.SECRET_KEY as string


                const userData = jwt.verify(token, SECRET_KEY) as { _id: string }

                if (userData) {
                    const Comment = new commentModel({ user_id, news_id, comment })
                    const save = await Comment.save()

                    if (save) {
                        io.emit('addcomments-server', "Comment Added Successfully")
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

export { addComment };
