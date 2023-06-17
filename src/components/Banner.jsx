

const Banner = ({ heading }) => {
    return (
        <div className="h-52 bg-gray-200 mt-[84px] flex justify-center items-center">
            <p className=" font-bold text-3xl">{heading}</p>
        </div>
    );
};

export default Banner;