import { Link } from 'react-router-dom';

const Container = ({ header, children, seeMore }) => {
    return (
        <div className="mt-20 w-full max-w-[90vw] relative z-0">
            <div className="flex flex-col gap-8 w-full items-center">
                {header && (
                    <div
                        className="relative xs:px-5 md:p-0 max-w-[1366px] mx-auto w-full before:content-[''] before:absolute xs:before:left-[20px] md:before:left-0 
                    before:top-full before:h-[5px] before:w-[150px] before:bg-pink flex items-center gap-8 ">
                        <h1 className="font-bold uppercase text-3xl font-roboto">
                            {header}
                        </h1>
                        {seeMore && (
                            <div className="border border-pink rounded-lg bg-gray-200  bg-opacity-50  py-1 px-2  hover:scale-105">
                                <Link to={seeMore}>See More...!</Link>
                            </div>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Container;
