import { userModel } from "../model/user";
import { comparePassword } from "../helper/authHelper";
import jwt from "jsonwebtoken";
import Joi from 'joi';

const signin = (io: any) => {
    io.on('connection', (socket: any) => {
        socket.on('signin-client', async (data: any) => {
            try {
                const schema = Joi.object({
                    email: Joi.string().email().required().messages({
                        'string.email': 'Invalid email format',
                        'any.required': 'Email is required'
                    }),
                    password: Joi.string().required().messages({
                        'any.required': 'Password is required'
                    })
                });

                const validation = schema.validate(data, { abortEarly: false });
                if (validation.error) {
                    const errorMessage = validation.error.details.map((error: any) => error.message).join('; ');
                    io.emit("error", errorMessage);
                    return;
                }

                const { email, password } = data;

                const userExist = await userModel.findOne({ email: email });

                if (!userExist) {
                    io.emit("error", "User has not Registered");
                    return;
                }

                const passsword2: any = userExist.password;
                const comparePass = await comparePassword(password, passsword2);

                if (!comparePass) {
                    io.emit("error", "Invalid Password");
                    return;
                }

                const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

                const payload = {
                    _id: userExist._id
                };

                const jwtoken = jwt.sign(payload, SECRET_KEY as string, { expiresIn: '1h' });

                io.emit('signin-server', { message: "User Signin Successfully", token: jwtoken });

            } catch (error: any) {
                io.emit("error", error.message);
            }
        });
    });
};

export { signin };