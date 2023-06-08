import { useEffect, useRef } from 'react';
import { SwiperSlide } from 'swiper/react';
import NavigationSwiper from './NavigationSwiper';

const MediaVideo = ({ video }) => {
    const iFrameRef = useRef();

    useEffect(() => {
        const height = (iFrameRef.current.offsetWidth * 9) / 16 + 'px';
        iFrameRef.current.setAttribute('height', height);
    }, []);

    return (
        <div className="max-h-max">
            <iframe
                key={video.id}
                src={`https://youtube.com/embed/${video.id}?autoplay=0`}
                ref={iFrameRef}
                width="100%"
                title={video.name}
                style={{ border: 0 }}></iframe>
        </div>
    );
};

const TutorialsSlide = () => {
    const videos = [
        {
            name: 'Tutorial 3x3',
            id: '7Ron6MN45LY',
        },
        {
            name: 'Tutorial 2x2',
            id: 'GANnG5a19kg',
        },
        {
            name: 'Tutorial 4x4',
            id: 'KWOZHbDdOeo',
        },
        {
            name: 'Tutorial piraminx',
            id: 'v0huoqKcAZw',
        },
        {
            name: 'Tutorial megaminx',
            id: 'oVRooYDvRqg',
        },
    ];

    return (
        <div className="container mx-auto">
            <NavigationSwiper>
                {videos.map((video, index) => (
                    <SwiperSlide
                        key={index}
                        className="swipper-slide px-10 pt-4 pb-10">
                        <MediaVideo video={video} />
                    </SwiperSlide>
                ))}
            </NavigationSwiper>
        </div>
    );
};

export default TutorialsSlide;
