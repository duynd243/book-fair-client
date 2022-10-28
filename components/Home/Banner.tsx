import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Keyboard, Navigation, Pagination } from 'swiper';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

const Slider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div
            className={
                'tw-min-h-[300px] tw-rounded-xl tw-bg-slate-500 tw-text-white'
            }
        >
            {children}
        </div>
    );
};

enum NavigationDirection {
    NEXT = 'next',
    PREV = 'prev',
}

const NavigationButton: React.FC<{
    direction: NavigationDirection;
    onClick: () => void;
}> = ({ direction, onClick }) => {
    return (
        <button
            className={`tw-absolute tw-top-1/2 tw-z-[100] tw-hidden tw-h-7 tw-w-7 -tw-translate-y-1/2 tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-transition-all hover:tw-bg-gray-100 group-hover:tw-flex ${
                direction === NavigationDirection.PREV
                    ? 'tw-left-2.5'
                    : 'tw-right-2.5'
            } `}
            onClick={onClick}
        >
            {direction === NavigationDirection.PREV ? (
                <MdOutlineNavigateBefore />
            ) : (
                <MdOutlineNavigateNext />
            )}
        </button>
    );
};

const Banner: React.FC = () => {
    const swiperRef = useRef<SwiperCore>();
    const slides = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    return (
        <>
            <Swiper
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                keyboard={{
                    enabled: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Keyboard, Pagination, Navigation]}
                className="tw-group"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide}>
                        <Slider>{slide}</Slider>
                    </SwiperSlide>
                ))}
                <NavigationButton
                    direction={NavigationDirection.PREV}
                    onClick={() => swiperRef.current?.slidePrev()}
                />
                <NavigationButton
                    direction={NavigationDirection.NEXT}
                    onClick={() => swiperRef.current?.slideNext()}
                />
            </Swiper>
        </>
    );
};

export default Banner;
