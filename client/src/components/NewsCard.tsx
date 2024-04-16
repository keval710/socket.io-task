import { useState } from 'react';

const NewsCard = ({ data }: any) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="flex flex-wrap -m-4">
            {data?.map((val: any) => {
                const contentHeight = expanded ? 'auto' : '200px'; // Adjust the height threshold as needed

                return (
                    <div className="xl:w-1/3 md:w-1/2 p-4" key={val._id}>
                        <div className="bg-white p-6 rounded-lg">
                            <img className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6" src={`http://localhost:8000/${val.image}`} alt="Image Size 720x400" />
                            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{val.title}</h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{val.subTitle}</h2>
                            <div style={{ maxHeight: contentHeight, overflow: 'hidden' }}>
                                <p className="leading-relaxed text-base">{val.description}</p>
                            </div>
                            {val.description.length > 200 && (
                                <button className="text-indigo-500 mt-2" onClick={toggleExpanded}>
                                    {expanded ? 'Read Less' : 'Read More'}
                                </button>
                            )}
                            <p className="text-sm text-gray-500">Author: {val.author_name}</p>
                        </div>
                    </div>
                );

            })}
        </div>
    );
}

export default NewsCard;
