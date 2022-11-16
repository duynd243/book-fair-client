import React from 'react';
import { IPostResponse } from '../../types/response/IPostResponse';
import Image from 'next/image';
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import { BsDot } from 'react-icons/bs';
import {
    IoBagCheck,
    IoCalendar,
    IoDocumentText,
    IoFileTray,
    IoLanguage,
    IoPerson,
    IoPricetag,
} from 'react-icons/io5';
import Link from 'next/link';
import { getFormattedPrice, getSlug } from '../../utils/helper';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const FeaturedItem: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <li className="tw-flex tw-items-center tw-gap-2 tw-font-medium tw-text-slate-600">
            {children}
        </li>
    );
};

type Props = {
    data: IPostResponse | undefined;
};

const PostCard: React.FC<Props> = ({ data }) => {
    const { handleAddToCart } = useAuth();
    const book = data?.campaignBooks[0]?.book;
    const postHref = {
        pathname: '/posts/[slug]/[id]',
        query: {
            slug: getSlug(data?.name),
            id: data?.id,
        },
    };

    const addToCart = () => {
        if (
            data?.id &&
            data?.campaignBooks[0].id &&
            data?.campaignBooks[0]?.bookId &&
            data?.campaignId
        ) {
            const result = handleAddToCart({
                campaignBookId: data?.campaignBooks[0].id,
                postId: data?.id,
                bookId: data?.campaignBooks[0]?.bookId,
                quantity: 1,
                campaignId: data?.campaignId,
            });
            if (result) {
                Swal.fire({
                    title: 'Đã thêm vào giỏ hàng!',
                    text: 'Sản phẩm đã được thêm vào giỏ hàng.',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1500,
                });
            }
        }
    };

    return (
        <article className="tw-group tw-col-span-full tw-overflow-hidden tw-rounded-lg tw-border tw-border-slate-200 tw-bg-white tw-shadow-sm tw-transition tw-duration-300 hover:tw-shadow-md sm:tw-col-span-6">
            <div className="tw-flex tw-h-full tw-flex-col">
                {/* Image */}
                <Link href={postHref} className={'tw-overflow-hidden'}>
                    <Image
                        className="tw-h-[220px] tw-w-full tw-object-cover tw-object-center tw-transition-transform tw-duration-300 group-hover:tw-scale-105"
                        width={500}
                        height={500}
                        src={
                            book?.imageUrl ||
                            `https://picsum.photos/1920/1080?random={${Math.random()}}`
                        }
                        alt="Application 01"
                    />
                </Link>
                {/* Card Content */}
                <div className="grow tw-flex tw-flex-col tw-py-5 tw-px-6">
                    {/* Card body */}
                    <div className="grow">
                        {/* Header */}
                        <header className="tw-mb-3 tw-flex tw-items-center">
                            <Image
                                className={
                                    'tw-mr-3 tw-h-[2.35rem] tw-w-[2.35rem] tw-rounded-full tw-object-cover tw-object-center'
                                }
                                width={100}
                                height={100}
                                src={
                                    data?.campaignBooks[0]?.participation
                                        ?.issuer?.imageUrl || DefaultAvatar.src
                                }
                                alt={''}
                            />
                            <div>
                                <Link
                                    href={postHref}
                                    className="tw-text-lg tw-font-semibold tw-leading-6 tw-text-slate-800"
                                >
                                    {data?.name}
                                </Link>
                                <div className="tw-flex tw-items-center tw-text-sm tw-text-slate-700">
                                    <span className="tw-font-semibold tw-text-blue-700">
                                        {
                                            data?.campaignBooks[0]
                                                ?.participation?.issuer?.name
                                        }
                                    </span>
                                    <BsDot />
                                    <span>
                                        {data?.createdDate
                                            ? formatDistance(
                                                  new Date(data?.createdDate),
                                                  new Date(),
                                                  {
                                                      addSuffix: true,
                                                      locale: vi,
                                                  }
                                              )
                                            : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </header>
                        {/* Rating and price */}
                        <div className="tw-mb-4 tw-flex tw-flex-wrap tw-items-center tw-justify-between">
                            {/* Rating */}
                            <div className="tw-mr-2 tw-flex tw-items-center tw-space-x-2">
                                {/* Stars */}
                                <div className="tw-flex tw-space-x-1">
                                    <button>
                                        <span className="tw-sr-only">
                                            1 star
                                        </span>
                                        <svg
                                            className="tw-h-4 tw-w-4 tw-fill-current tw-text-amber-500"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <span className="tw-sr-only">
                                            2 stars
                                        </span>
                                        <svg
                                            className="tw-h-4 tw-w-4 tw-fill-current tw-text-amber-500"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <span className="tw-sr-only">
                                            3 stars
                                        </span>
                                        <svg
                                            className="tw-h-4 tw-w-4 tw-fill-current tw-text-amber-500"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <span className="tw-sr-only">
                                            4 stars
                                        </span>
                                        <svg
                                            className="tw-h-4 tw-w-4 tw-fill-current tw-text-amber-500"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <span className="tw-sr-only">
                                            5 stars
                                        </span>
                                        <svg
                                            className="tw-h-4 tw-w-4 tw-fill-current tw-text-slate-300"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                        </svg>
                                    </button>
                                </div>
                                {/* Rate */}
                                <div className="tw-inline-flex tw-text-sm tw-font-medium tw-text-amber-600">
                                    4.2
                                </div>
                            </div>
                            {/* Price */}
                            <div>
                                <div className="tw-inline-flex tw-rounded-full tw-bg-emerald-100 tw-px-2.5 tw-py-0.5 tw-text-center tw-text-base tw-font-semibold tw-text-emerald-600">
                                    {data?.campaignBooks[0]?.coverPrice &&
                                    book?.price
                                        ? getFormattedPrice(
                                              data?.campaignBooks[0]
                                                  ?.coverPrice + book?.price
                                          )
                                        : 'N/A'}
                                </div>
                            </div>
                        </div>
                        {/* Features list */}
                        <ul className="tw-mb-5 tw-space-y-2 tw-text-sm">
                            <FeaturedItem>
                                <IoFileTray className={'tw-fill-gray-600'} />
                                <div>
                                    Xuất bản bởi{' '}
                                    {book?.publisher?.name || 'N/A'}
                                </div>
                            </FeaturedItem>
                            <FeaturedItem>
                                <IoPerson className={'tw-fill-gray-600'} />
                                <div>
                                    {book?.authorBooks
                                        ?.map((a) => a.author?.name)
                                        ?.join(', ') || 'N/A'}
                                </div>
                            </FeaturedItem>
                            <FeaturedItem>
                                <IoPricetag className={'tw-fill-gray-600'} />
                                <div>
                                    Thể loại: {book?.category?.name || 'N/A'}
                                </div>
                            </FeaturedItem>
                            <FeaturedItem>
                                <IoDocumentText
                                    className={'tw-fill-gray-600'}
                                />
                                <div>{book?.page} Trang</div>
                            </FeaturedItem>
                            <FeaturedItem>
                                <IoLanguage className={'tw-fill-gray-600'} />
                                <div>Ngôn ngữ: {book?.language || 'N/A'}</div>
                            </FeaturedItem>
                            <FeaturedItem>
                                <IoCalendar className={'tw-fill-gray-600'} />
                                <div>
                                    Xuất bản năm {book?.releasedYear || 'N/A'}
                                </div>
                            </FeaturedItem>
                        </ul>
                    </div>
                    {/* Card footer */}
                    <button
                        onClick={addToCart}
                        className="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-1.5 tw-rounded tw-bg-indigo-500 tw-py-1.5 tw-text-white hover:tw-bg-indigo-600"
                    >
                        <IoBagCheck size={15} />
                        <span>Thêm vào giỏ hàng</span>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default PostCard;
