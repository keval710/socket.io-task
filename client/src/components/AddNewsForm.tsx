import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { openAddNewsModel } from '../redux/features/newsSlice';
import { useForm } from 'react-hook-form';

type FormData = {
    title: string;
    subTitle: string;
    description: string;
    image: FileList;
};

const AddNewsForm = () => {
    const showForm = useAppSelector((state: any) => state.news.value);
    const dispatch = useAppDispatch();

    const toggleForm = () => {
        dispatch(openAddNewsModel());
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = handleSubmit((data) => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('subTitle', data.subTitle);
        formData.append('description', data.description);
        formData.append('image', data.image[0]);

        formData.forEach((value, key) => {
            console.log(key, value);
        });
    });


    return (
        <div className="relative">
            {showForm && (
                <section className="max-w-2xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20 relative">
                    <button onClick={toggleForm} className="absolute top-2 right-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold text-white capitalize dark:text-white">Add News</h1>

                    <form onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">
                            <div>
                                <label className="text-white dark:text-gray-200" htmlFor="username">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    {...register('title', {
                                        required: 'Title is required',
                                    })}
                                />
                                <p className="error-message">{errors.title?.message}</p>
                            </div>
                            <div>
                                <label className="text-white dark:text-gray-200" htmlFor="username">
                                    Sub Title
                                </label>
                                <input
                                    id="subTitle"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    {...register('subTitle', {
                                        required: 'Sub Title is required',
                                    })}
                                />
                                <p className="error-message">{errors.subTitle?.message}</p>
                            </div>
                            <div>
                                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    style={{ height: '180px' }}
                                    {...register('description', {
                                        required: 'Description is required',
                                    })}
                                />
                                <p className="error-message">{errors.description?.message}</p>
                            </div>
                            <div>

                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload multiple files</label>
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple
                                    {...register('image', {
                                        required: 'Image is required',
                                    })} />

                                <p className="error-message">{errors.image?.message}</p>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Add</button>
                        </div>
                    </form>
                </section>
            )}
        </div>
    );
};

export default AddNewsForm;