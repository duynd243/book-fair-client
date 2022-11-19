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
import { ICartItem } from '../../types/cart/ICartItem';
import { useRouter } from 'next/router';
import { PROTECTED_ROUTES } from '../../constants/ProtectedRoutes';

const FeaturedItem: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <li className="flex items-center gap-2 font-medium text-slate-600">
            {children}
        </li>
    );
};

type Props = {
    data: IPostResponse | undefined;
};

const PostCard: React.FC<Props> = ({ data }) => {
    const { handleAddToCart, checkValidCartAction } = useAuth();
    const router = useRouter();

    const isProtectedRoute = PROTECTED_ROUTES.find((route) =>
        router.pathname.startsWith(route.path)
    );
    const book = data?.campaignBooks[0]?.book;
    const postHref = {
        pathname: '/posts/[slug]/[id]',
        query: {
            slug: getSlug(data?.name),
            id: data?.id,
        },
    };

    const addToCart = () => {
        if (!checkValidCartAction()) {
            return;
        }
        if (
            data?.id &&
            data?.campaignBooks[0].id &&
            data?.campaignBooks[0]?.bookId &&
            data?.campaignId
        ) {
            const cartItem: ICartItem = {
                campaignBookId: data?.campaignBooks[0].id,
                postId: data?.id,
                bookId: data?.campaignBooks[0]?.bookId,
                quantity: 1,
                campaignId: data?.campaignId,
            };
            handleAddToCart(cartItem);
            Swal.fire({
                title: 'Đã thêm vào giỏ hàng!',
                text: 'Sản phẩm đã được thêm vào giỏ hàng.',
                icon: 'success',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <article className="group col-span-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-md sm:col-span-6">
            <div className="flex h-full flex-col">
                {/* Image */}
                <Link href={postHref} className={'overflow-hidden'}>
                    <Image
                        className="h-[220px] w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
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
                <div className="flex grow flex-col py-5 px-6">
                    {/* Card body */}
                    <div className="grow">
                        {/* Header */}
                        <header className="mb-3 flex items-center">
                            <Image
                                className={
                                    'mr-3 h-[2.35rem] w-[2.35rem] rounded-full object-cover object-center'
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
                                    className="text-lg font-semibold leading-6 text-slate-800"
                                >
                                    {data?.name}
                                </Link>
                                <div className="flex items-center text-sm text-slate-700">
                                    <span className="font-semibold text-blue-700">
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
                        <div className="mb-4 flex flex-wrap items-center justify-between">
                            {/* Rating */}
                            <div className="mr-2 flex items-center space-x-2">
                                {/* Stars */}
                                <div className="flex space-x-1">
                                    <button>
                                        <span className="sr-only">1 star</span>
                                        <svg
                                            className="h-4 w-4 fill-current text-amber-500"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <span className="sr-only">2 stars</span>
                                        <svg
                                            className="h-4 w-4 fill-current text-amber-500"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <span className="sr-only">3 stars</span>
                                        <svg
                                            className="h-4 w-4 fill-current text-amber-500"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <span className="sr-only">4 stars</span>
                                        <svg
                                            className="h-4 w-4 fill-current text-amber-500"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                        </svg>
                                    </button>
                                    <button>
                                        <span className="sr-only">5 stars</span>
                                        <svg
                                            className="h-4 w-4 fill-current text-slate-300"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                                        </svg>
                                    </button>
                                </div>
                                {/* Rate */}
                                <div className="inline-flex text-sm font-medium text-amber-600">
                                    4.2
                                </div>
                            </div>
                            {/* Price */}
                            <div>
                                <div className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-center text-base font-semibold text-emerald-600">
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
                        <ul className="mb-5 space-y-2 text-sm">
                            <FeaturedItem>
                                <IoFileTray className={'fill-gray-600'} />
                                <div>
                                    Xuất bản bởi{' '}
                                    {book?.publisher?.name || 'N/A'}
                                </div>
                            </FeaturedItem>
                            <FeaturedItem>
                                <IoPerson className={'fill-gray-600'} />
                                <div>
                                    {book?.authorBooks
                                        ?.map((a) => a.author?.name)
                                        ?.join(', ') || 'N/A'}
                                </div>
                            </FeaturedItem>
                            <FeaturedItem>
                                <IoPricetag className={'fill-gray-600'} />
                                <div>
                                    Thể loại: {book?.category?.name || 'N/A'}
                                </div>
                            </FeaturedItem>
                            <FeaturedItem>
                                <IoDocumentText className={'fill-gray-600'} />
                                <div>{book?.page} Trang</div>
                            </FeaturedItem>
                            <FeaturedItem>
                                <IoLanguage className={'fill-gray-600'} />
                                <div>Ngôn ngữ: {book?.language || 'N/A'}</div>
                            </FeaturedItem>
                            <FeaturedItem>
                                <IoCalendar className={'fill-gray-600'} />
                                <div>
                                    Xuất bản năm {book?.releasedYear || 'N/A'}
                                </div>
                            </FeaturedItem>
                        </ul>
                    </div>
                    {/* Card footer */}
                    {!isProtectedRoute && (
                        <button
                            onClick={addToCart}
                            className="flex w-full items-center justify-center gap-1.5 rounded bg-indigo-500 py-1.5 text-white hover:bg-indigo-600"
                        >
                            <IoBagCheck size={15} />
                            <span>Thêm vào giỏ hàng</span>
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
};

export default PostCard;
