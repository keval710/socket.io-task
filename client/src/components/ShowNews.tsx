import { useEffect, useState } from "react"
import AddNewsForm from "./AddNewsForm"
import NewsCard from "./NewsCard"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { openAddNewsModel } from "../redux/features/newsSlice"
import { ToastContainer, toast } from 'react-toastify';

const ShowNews = ({ socket }: any) => {
    const [data, setData] = useState([])
    const isOpen = useAppSelector((state: any) => state.news.value);
    const dispatch = useAppDispatch();

    const successToast = () => {
        toast.success("News Added Successfully");
        console.log("in tost");
    }

    useEffect(() => {
        socket.emit('getnews-client', { token: localStorage.getItem('token') })
    }, [])

    socket.on('news', (data: any) => {
        setData(data)
    })

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <>
            <ToastContainer />
            <section className="text-gray-800 body-font bg-slate-200">
                <div className="container px-3 py-24 mx-auto max-w-7x1">
                    <div className="flex flex-wrap justify-between w-full mb-4 p-4">
                        <div className="mb-6 lg:mb-0 ">
                            <h1 className="sm:text-4xl text-5xl font-medium title-font mb-2 text-gray-900">News</h1>
                            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                        <div>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-xl inline-flex items-center" onClick={() => dispatch(openAddNewsModel())}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 14 14" height="14" width="14" id="Add-Layer-2--Streamline-Flex"><desc>Add Layer 2 Streamline Icon: https://streamlinehq.com</desc><g id="add-layer-2--layer-add-design-plus-layers-square-box"><path id="Intersect" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M0.672179 6.11739C0.784807 5.0803 1.61752 4.2477 2.65411 4.13058c0.85175 -0.09623 1.72763 -0.18163 2.62141 -0.18163 0.89379 0 1.76967 0.0854 2.62142 0.18163 1.03659 0.11712 1.8693 0.94972 1.98193 1.98681 0.092 0.84716 0.17213 1.71824 0.17213 2.60709 0 0.88885 -0.08013 1.75992 -0.17213 2.60712 -0.11263 1.0371 -0.94534 1.8696 -1.98193 1.9868 -0.85175 0.0962 -1.72763 0.1816 -2.62142 0.1816 -0.89378 0 -1.76966 -0.0854 -2.62141 -0.1816 -1.03659 -0.1171 -1.869303 -0.9497 -1.981931 -1.9868C0.580177 10.4844 0.5 9.61333 0.5 8.72448c0 -0.88885 0.080177 -1.75993 0.172179 -2.60709Z" strokeWidth="1"></path><path id="Subtract" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M4.58105 1.52235c0.3573 -0.45539 0.88915 -0.768904 1.4911 -0.837141C6.93367 0.587547 7.81998 0.50006 8.72465 0.50006c0.90466 0 1.79095 0.087487 2.65245 0.185147 1.0186 0.115461 1.8364 0.933163 1.9475 1.952183 0.0934 0.85694 0.1756 1.73846 0.1756 2.6382 0 0.89973 -0.0822 1.78125 -0.1756 2.63818 -0.0664 0.60884 -0.385 1.14581 -0.848 1.50408" strokeWidth="1"></path><path id="Vector" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="m5.27539 6.33666 0 4.77554" strokeWidth="1"></path><path id="Vector_2" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="m2.88756 8.72449 4.77553 0" strokeWidth="1"></path></g></svg>
                                Add News
                            </button>
                        </div>
                    </div>
                    {
                        data?.map((val: any) => {
                            return (
                                // <div key={val._id}>
                                <div className="flex flex-wrap -m-4">
                                    <div className="xl:w-1/3 md:w-1/2 p-4">
                                        <div className="bg-white p-6 rounded-lg">
                                            <NewsCard val={val} />
                                        </div>
                                    </div>
                                </div>
                                // </div>
                            )
                        })
                    }
                    {
                        isOpen && <AddNewsForm socket={socket} successToast={successToast} />
                    }
                </div>
            </section>
        </>

    )
}

export default ShowNews