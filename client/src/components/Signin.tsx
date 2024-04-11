import { useForm } from "react-hook-form";
import loginSVG from '../assets/login.svg';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";

type FormData = {
    email: string
    password: string
}

const Signin = ({ socket }: any) => {

    const errorToast = (data: any) => toast.error(data);

    const [socketEvent, setSocketEvent] = useState(false)

    const navigate = useNavigate()


    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        reset
    } = useForm<FormData>({
        mode: "onChange"
    });

    useEffect(() => {
        const handleSigninServer = (data: any) => {
            reset()
            localStorage.setItem('token', data.token);
            navigate("/home")
        }

        const handleError = (data: any) => {
            errorToast(data)
        }

        socket.on("signin-server", handleSigninServer);
        socket.on("error", handleError);

        return () => {
            socket.off("signup-server", handleSigninServer);
            socket.off("error", handleError);
        }
    }, [socketEvent])

    const onSubmit = handleSubmit((data) => {
        const emit = socket.emit("signin-client", data)
        if (emit) {
            setSocketEvent(true)
        }
    });

    return (
        <>
            {/* <!-- component -->/ */}
            <div className="flex h-screen">
                <ToastContainer />
                {/* <!-- Left Pane --> */}
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <div className="max-w-md text-center">
                        <img src={loginSVG} alt="Login" />
                    </div>
                </div>
                {/* <!-- Right Pane --> */}
                <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-md w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign In</h1>
                        <form onSubmit={onSubmit} method="POST" className="space-y-4">
                            {/* <!-- Your form elements go here --> */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" id="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    {...register("email", {
                                        onBlur: () => {
                                            trigger("email");
                                        },
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                {errors.email && <p className="error-message">{errors.email?.message}</p>}

                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" id="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    {...register("password", {
                                        onBlur: () => {
                                            trigger("password");
                                        },
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long"
                                        },
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                                            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                        }
                                    })}
                                />
                                <p className="error-message">{errors.password?.message}</p>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign In</button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>Dont have an account? <Link to="/signup" className="text-black hover:underline">Register here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;