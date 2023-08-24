import React from 'react';
import { SwiperSlide } from 'swiper/react';
import NavigationSwiper from './NavigationSwiper';

const ImagesSlide = ({ images }) => {
    return (
        <div className="flex flex-col justify-center">
            <div className="flex gap-2 justify-center">
                {images?.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={'Images'}
                        className="w-[5vw] bg-cover rounded-lg"
                    />
                ))}
            </div>
            <NavigationSwiper>
                {images?.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className="swipper-slide px-10 pt-4 pb-10">
                        <img
                            src={image}
                            alt={'Images'}
                            className="w-full bg-cover rounded-lg"
                        />
                    </SwiperSlide>
                ))}
            </NavigationSwiper>
        </div>
    );
};

export default ImagesSlide;
