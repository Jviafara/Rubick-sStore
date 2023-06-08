import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper } from 'swiper/react';

const NavigationSwiper = ({ children }) => {
    return (
        <div className="w-full h-full">
            <Swiper
                spaceBetween={10}
                grabCursor={true}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Navigation, Pagination, Autoplay]}
                className="w-full max-h-max p-0">
                {children}
            </Swiper>
        </div>
    );
};

export default NavigationSwiper;
