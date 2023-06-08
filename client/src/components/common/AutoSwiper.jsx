import React from 'react';
import { Pagination } from 'swiper';
import { Swiper } from 'swiper/react';

const AutoSwiper = ({ children }) => {
    return (
        <div className="flex container max-w-[80vw] mx-auto">
            <Swiper
                slidesPerView={1}
                loop={true}
                spaceBetween={15}
                pagination={{
                    dynamicBullets: true,
                }}
                breakpoints={{
                    375: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 35,
                    },
                    1536: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="pt-5 pb-10">
                {children}
            </Swiper>
        </div>
    );
};

export default AutoSwiper;
