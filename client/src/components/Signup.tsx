import { useForm } from "react-hook-form"
import loginSVG from '../assets/login.svg';
import { Link } from "react-router-dom";

type FormData = {
    name: string
    email: string
    password: string
    cpassword: string
}

const Signup = () => {

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })
    return (
        <>
            {/* <!-- component -->/ */}
            <div className="flex h-screen">
                {/* <!-- Left Pane --> */}
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <div className="max-w-md text-center">
                        <img src={loginSVG} alt="Login" />
                    </div>
                </div>
                {/* <!-- Right Pane --> */}
                <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-md w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign Up</h1>
                        <form onSubmit={onSubmit} method="POST" className="space-y-4">
                            {/* <!-- Your form elements go here --> */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    {...register("name", {
                                        required: "Name is required"
                                    })}

                                />
                                <p className="error-message">{errors.name?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" id="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                                <p className="error-message">{errors.email?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" id="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long"
                                        },
                                        pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                                            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                        }
                                    })
                                    }
                                />
                                <p className="error-message">{errors.password?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    id="cpassword"
                                    className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                                    {...register("cpassword", {
                                        required: "Confirm Password is required",
                                        validate: (value) => value === getValues("password") || "Passwords do not match"
                                    })}
                                />
                                <p className="error-message">{errors.cpassword?.message}</p>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign Up</button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>Already have an account? <Link to="/" className="text-black hover:underline">Login here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup