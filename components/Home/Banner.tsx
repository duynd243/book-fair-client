import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Keyboard, Navigation, Pagination } from 'swiper';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import Image from 'next/image';

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
            className={`absolute top-1/2 z-[100] hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white transition-all hover:bg-gray-100 group-hover:flex ${
                direction === NavigationDirection.PREV
                    ? 'left-2.5'
                    : 'right-2.5'
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
    const slides = ['1', '2', '3', '4'];
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
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Keyboard, Pagination, Navigation]}
                className="group !h-[300px]"
                style={{
                    height: '300px',
                }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide}>
                        <Slider>
                            <Image
                                src={`https://picsum.photos/1280/720?random={${Math.random()}}`}
                                alt="Picture of the author"
                                width={1000}
                                height={1000}
                                className="!h-[300px] w-full object-cover object-center"
                            />
                        </Slider>
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
const Slider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={'!h-full overflow-hidden rounded-lg bg-slate-500'}>
            {children}
        </div>
    );
};
export default Banner;
