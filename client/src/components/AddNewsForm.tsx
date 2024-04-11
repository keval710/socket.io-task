import { useAppDispatch } from "../redux/hooks"
import { openAddNewsModel } from "../redux/features/newsSlice"
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

type FormData = {
    token: string | null;
    title: string;
    subTitle: string;
    description: string;
    image: FileList;
};

const AddNewsForm: React.FC = ({ socket, successToast }: any) => {

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    // const isOpen = useAppSelector((state: any) => state.news.value);
    const dispatch = useAppDispatch();

    const errorToast = (data: any) => toast.error(data);

    const [socketEvent, setSocketEvent] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        reset,
        setValue
    } = useForm<FormData>({
        mode: "onChange"
    })


    const token = localStorage.getItem('token')
    setValue("token", token);


    useEffect(() => {
        const handleAddNewsServer = () => {
            reset()
            dispatch(openAddNewsModel())
            // setNewsAdded(true)
            successToast()
        }

        const handleError = (data: any) => {
            errorToast(data)
        }

        socket.on("addnews-server", handleAddNewsServer);
        socket.on("error", handleError);

        return () => {
            socket.off("addnews-server", handleAddNewsServer);
            socket.off("error", handleError);
        }
    }, [socketEvent])


    const onSubmit = handleSubmit((data) => {
        const emit = socket.emit("addnews-client", data)
        if (emit) {
            setSocketEvent(true)
        }

    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center overflow-y-scroll overflow-x-hidden fixed top-0 right-0 left-0 z-50  w-full md:inset-0 h-screen max-h-full bg-gray-900 bg-opacity-60 overflow-hidden">
                <div className="relative p-4 w-full max-w-lg max-h-screen">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add News
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal"
                                onClick={() => dispatch(openAddNewsModel())}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={onSubmit}>
                            <div className="grid gap-2 mb-2 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">News Title</label>
                                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type news title"
                                        {...register('title', {
                                            onBlur: () => {
                                                trigger("title");
                                            },
                                            required: 'Title is required',
                                        })} />
                                    {errors.title && <p className="error-message">{errors.title?.message}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">News Subtitle</label>
                                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type news subtitle"
                                        {...register('subTitle', {
                                            onBlur: () => {
                                                trigger("subTitle");
                                            },
                                            required: 'Sub Title is required',
                                        })} />
                                    {errors.subTitle && <p className="error-message">{errors.subTitle?.message}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">News Description</label>
                                    <textarea id="description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write news description here"
                                        {...register('description', {
                                            onBlur: () => {
                                                trigger("description");
                                            },
                                            required: 'Description is required',
                                        })}></textarea>
                                    {errors.description && <p className="error-message">{errors.description?.message}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Upload Image</label>
                                    <input className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " aria-describedby="file_input_help" id="file_input" type="file" accept=".jpg, .jpeg, .png"
                                        {...register('image', {
                                            onBlur: () => {
                                                trigger("image");
                                            },
                                            onChange: handleImageChange,
                                            required: 'Image is required',
                                            validate: (files: FileList) => {
                                                const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
                                                if (files.length === 0) return 'Image is required';
                                                const file = files[0];
                                                if (!allowedFormats.includes(file.type)) {
                                                    return 'Only JPG and PNG formats are allowed';
                                                }
                                                return true; // Validation passed
                                            }
                                        })}
                                    />
                                    {errors.image ? <p className="error-message">{errors.image?.message}</p> : <p className="mt-1 text-sm text-gray-500 " id="file_input_help"> PNG, JPG Allowed .</p>}

                                </div>
                                {imageUrl && (
                                    <div>
                                        <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add News
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AddNewsForm