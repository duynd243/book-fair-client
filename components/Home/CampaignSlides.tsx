import CampaignCard from 'components/Commons/CampaignCard/CampaignCard';
import Link from 'next/link';
import React from 'react';
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ICampaign } from 'types/campaign/ICampaign';

type Props = {
    label: string;
    href?: string;
    campaigns: ICampaign[];
};

const CampaignSlides: React.FC<Props> = ({ label, href, campaigns }) => {
    const nextRef = React.useRef<HTMLButtonElement>(null);
    return (
        <>
            <Link
                className="tw-mt-4 tw-flex tw-items-center tw-justify-between tw-text-2xl tw-font-semibold tw-text-gray-800"
                href={href || ''}
            >
                {label}
            </Link>

            <Swiper
                className="tw-py-3"
                spaceBetween={25}
                breakpoints={{
                    640: {
                        slidesPerView: 1.4,
                    },
                    768: {
                        slidesPerView: 1.68,
                    },
                    1024: {
                        slidesPerView: 2.4,
                    },
                    1280: {
                        slidesPerView: 3.2,
                    },
                }}
                navigation={{
                    enabled: true,
                    nextEl: nextRef.current,
                }}
                modules={[Autoplay, Keyboard, Pagination, Navigation]}
            >
                {campaigns.map((campaign) => (
                    <SwiperSlide className="tw-h-auto" key={campaign?.code}>
                        <CampaignCard campaign={campaign} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default CampaignSlides;
