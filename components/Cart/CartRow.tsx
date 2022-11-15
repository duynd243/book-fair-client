import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IPostResponse } from '../../types/response/IPostResponse';
import { getFormattedPrice, getSlug } from '../../utils/helper';
import { ICartItem } from '../../types/cart/ICartItem';
import { IoClose, IoFileTray, IoPricetag } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

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
        <li key={book?.id} className="tw-flex tw-py-6">
            <div className="tw-flex-shrink-0">
                <Image
                    width={500}
                    height={500}
                    src={
                        book?.imageUrl ||
                        `https://picsum.photos/1920/1080?random={${Math.random()}}`
                    }
                    alt={book?.name || ''}
                    className="tw-h-24 tw-w-24 tw-rounded-md tw-object-cover tw-object-center sm:tw-h-32 sm:tw-w-32"
                />
            </div>

            <div className="tw-ml-4 tw-flex tw-flex-1 tw-flex-col sm:tw-ml-6">
                <div>
                    <div className="tw-flex tw-justify-between">
                        <h4 className="tw-text-base">
                            <Link
                                href={postHref}
                                className="tw-font-medium tw-text-gray-700 hover:tw-text-gray-800"
                            >
                                {book?.name}
                            </Link>
                        </h4>
                        <p className="tw-ml-4 tw-text-base tw-font-semibold tw-text-indigo-700">
                            {data?.campaignBooks[0]?.coverPrice && book?.price
                                ? getFormattedPrice(
                                      (data?.campaignBooks[0]?.coverPrice +
                                          book?.price) *
                                          cartItem.quantity
                                  )
                                : 'N/A'}
                        </p>
                    </div>
                    <p className="tw-mt-2 tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-gray-500">
                        <IoPricetag />
                        Đơn giá:{' '}
                        <span className={'tw-font-medium tw-text-slate-600'}>
                            {data?.campaignBooks[0]?.coverPrice && book?.price
                                ? getFormattedPrice(
                                      data?.campaignBooks[0]?.coverPrice +
                                          book?.price
                                  )
                                : 'N/A'}
                        </span>
                    </p>
                    <p className="tw-mt-1 tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-gray-500">
                        <IoFileTray />
                        Số lượng:{' '}
                        <span className={'tw-font-medium tw-text-slate-600'}>
                            {cartItem.quantity}
                        </span>
                    </p>
                </div>

                <div className="tw-mt-4 tw-flex tw-flex-1 tw-items-end tw-justify-between">
                    <p className="tw-flex tw-items-center tw-rounded-md tw-bg-slate-50 tw-px-2.5 tw-py-1 tw-text-sm tw-font-medium tw-text-slate-600">
                        <span>Từ sự kiện: {data?.campaign?.name}</span>
                    </p>
                    <div className="tw-ml-4">
                        <button
                            onClick={clearItem}
                            type="button"
                            className="tw-flex tw-items-center tw-gap-1 tw-rounded tw-bg-slate-100 tw-py-1 tw-px-2 tw-text-sm tw-font-medium tw-text-slate-600 hover:tw-text-slate-500"
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
