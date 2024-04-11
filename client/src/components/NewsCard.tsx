

const NewsCard = ({ val }) => {
    return (
        <div>


            <img className="lg:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72  rounded w-full object-cover object-center mb-6" src="https://kuyou.id/content/images/ctc_2020021605150668915.jpg" alt="Image Size 720x400" />
            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">{val.title}</h3>
            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{val.title}</h2>
            <p className="leading-relaxed text-base">{val.description}</p>
        </div>
    )
}

export default NewsCard