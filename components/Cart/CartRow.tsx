import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IPostResponse } from '../../types/response/IPostResponse';
import { getFormattedPrice, getSlug } from '../../utils/helper';
import { ICartItem } from '../../types/cart/ICartItem';
import { IoClose, IoFileTray, IoLibrary, IoPricetag } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import DefaultAvatar from '../../assets/images/default_avatar.png';

type Props = {
    data: IPostResponse | undefined;
    cartItem: ICartItem;
};

const CartRow: React.FC<Props> = ({ data, cartItem }) => {
    const { handleRemoveFromCart } = useAuth();
    const book = data?.campaignBooks[0]?.book;
    const postHref = {
        pathname: '/posts/[slug]/[id]',
        query: {
            slug: getSlug(data?.name),
            id: data?.id,
        },
    };

    const clearItem = () => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Sản phẩm này sẽ bị xóa khỏi giỏ hàng!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                handleRemoveFromCart(cartItem.campaignBookId);
                Swal.fire({
                    title: 'Đã xoá!',
                    text: 'Sản phẩm đã được xoá khỏi giỏ hàng.',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <li key={book?.id} className="flex py-6">
            <div className="flex-shrink-0">
                <Image
                    width={500}
                    height={500}
                    src={
                        book?.imageUrl ||
                        `https://picsum.photos/1920/1080?random={${Math.random()}}`
                    }
                    alt={book?.name || ''}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                    <div className="flex justify-between">
                        <h4 className="text-base">
                            <Link
                                href={postHref}
                                className="font-medium text-gray-700 hover:text-gray-800"
                            >
                                {book?.name}
                            </Link>
                        </h4>
                        <p className="ml-4 text-base font-semibold text-indigo-700">
                            {data?.campaignBooks[0]?.coverPrice && book?.price
                                ? getFormattedPrice(
                                      (data?.campaignBooks[0]?.coverPrice +
                                          book?.price) *
                                          cartItem.quantity
                                  )
                                : 'N/A'}
                        </p>
                    </div>
                    <div className="mt-2 space-y-1.5">
                        <p className="flex items-center gap-1 text-sm text-gray-500">
                            <IoPricetag />
                            Đơn giá:{' '}
                            <span className={'font-medium text-slate-600'}>
                                {data?.campaignBooks[0]?.coverPrice &&
                                book?.price
                                    ? getFormattedPrice(
                                          data?.campaignBooks[0]?.coverPrice +
                                              book?.price
                                      )
                                    : 'N/A'}
                            </span>
                        </p>
                        <p className="flex items-center gap-1 text-sm text-gray-500">
                            <IoFileTray />
                            Số lượng:{' '}
                            <span className={'font-medium text-slate-600'}>
                                {cartItem.quantity}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap justify-between gap-y-3">
                    <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
                        <Image
                            width={22}
                            height={22}
                            className="rounded-full"
                            src={
                                data?.campaignBooks[0]?.participation?.issuer
                                    ?.imageUrl || DefaultAvatar.src
                            }
                            alt={
                                data?.campaignBooks[0]?.participation?.issuer
                                    ?.name || ''
                            }
                        />
                        {data?.campaignBooks[0]?.participation?.issuer?.name ||
                            'N/A'}
                    </div>
                    <div>
                        <button
                            onClick={clearItem}
                            type="button"
                            className="flex items-center gap-1 rounded bg-slate-100 py-1 px-2 text-sm font-medium text-slate-600 hover:text-slate-500"
                        >
                            <IoClose />
                            <span>Xoá</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default CartRow;
