import { userModel } from "../model/user";
import { hashPassword } from "../helper/authHelper";
import Joi from 'joi';
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const signup = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    io.on('connection', (socket) => {
        socket.on('signup-client', async (data: { name: string; email: string; password: string; }) => {
            try {
                const schema = Joi.object({
                    name: Joi.string().required().messages({
                        'any.required': 'Name is required'
                    }),
                    email: Joi.string().email().required().messages({
                        'string.email': 'Invalid email format',
                        'any.required': 'Email is required'
                    }),
                    password: Joi.string().required().messages({
                        'any.required': 'Password is required'
                    }),
                    cpassword: Joi.string().valid(Joi.ref('password')).required().messages({
                        'any.only': 'Password does not match',
                        'any.required': 'Confirm password is required'
                    })
                });

                const validation = schema.validate(data);
                if (validation.error) {
                    const errorMessage = validation.error.details[0].message;
                    io.emit("error", errorMessage);
                    return;
                }

                const { name, email, password } = data;

                const userExist = await userModel.findOne({ email: email });

                if (userExist) {
                    io.emit("error", "User Already Exist");
                    return;
                }

                const hashPass = await hashPassword(password);

                if (hashPass) {
                    const user = new userModel({ name, email, password: hashPass });
                    const save = await user.save();

                    if (save) {
                        io.emit("signup-server", "User Registered Successfully");
                    }
                }
            } catch (error: any) {
                io.emit("error", error.message);
            }
        });
    });
};

export { signup };