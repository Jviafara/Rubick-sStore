import { Link } from 'react-router-dom';

const Container = ({ header, children, seeMore }) => {
    return (
        <div className="mt-20 mx-auto max-w-[90vw]">
            <div className="flex flex-col gap-4">
                {header && (
                    <div
                        className="relative xs:px-5 md:p-0 max-w-[1366px] mx-auto w-full before:content-[''] before:absolute xs:before:left-[20px] md:before:left-0 
                    before:top-full before:h-[5px] before:w-[150px] before:bg-pink flex items-center gap-8 ">
                        <h1 className="font-bold uppercase text-3xl font-roboto">
                            {header}
                        </h1>
                        {seeMore && (
                            <Link
                                to={seeMore}
                                className="border-2 border-pink rounded-lg border-opacity-30 py-1 px-2 hover:font-bold hover:bg-pink hover:bg-opacity-30 hover:scale-105">
                                See More...!
                            </Link>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Container;
