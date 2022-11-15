import React from 'react';
import { NextPage } from 'next';
import MainLayout from '../../components/Layouts/MainLayout';
import { useAuth } from '../../context/AuthContext';
import EmptyCart from '../../components/Cart/EmptyCart';
import { HiQuestionMarkCircle } from 'react-icons/hi2';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { PostService } from '../../services/PostService';
import { IPostResponse } from '../../types/response/IPostResponse';
import CartRow from '../../components/Cart/CartRow';
import { IoTrash } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { getFormattedPrice } from '../../utils/helper';

const CartPage: NextPage = () => {
    const { loginUser, cart, handleClearCart } = useAuth();
    const queryClient = useQueryClient();
    const postService = new PostService(loginUser?.accessToken);

    const getAllQueries = useQueries({
        queries: cart.map((item) => ({
            queryKey: ['cart_item', item.campaignBookId],
            queryFn: () => postService.getPostById(item.postId),
        })),
    });

    const getPost = (campaignBookId: number) => {
        return queryClient.getQueryData<IPostResponse>([
            'cart_item',
            campaignBookId,
        ]);
    };

    const getTotalPrice = () => {
        let total = 0;
        cart.forEach((item) => {
            const post = getPost(item.campaignBookId);
            const campaignBook = post?.campaignBooks[0];
            const book = campaignBook?.book;
            if (campaignBook?.coverPrice && book?.price) {
                total +=
                    item.quantity * (campaignBook?.coverPrice + book?.price);
            }
        });
        return total;
    };

    const clearCart = () => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Tất cả các sản phẩm trong giỏ hàng sẽ bị xóa!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        }).then((result) => {
            if (result.isConfirmed) {
                handleClearCart();
                Swal.fire({
                    title: 'Đã xoá!',
                    text: 'Giỏ hàng của bạn đã được xoá.',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <MainLayout maxWidth={'tw-max-w-6xl'}>
            {cart?.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="tw-bg-white tw-px-4 tw-pt-8 tw-pb-14 sm:tw-px-6 lg:tw-px-8">
                    <h1 className="tw-text-3xl tw-font-extrabold tw-tracking-tight tw-text-gray-900 sm:tw-text-4xl">
                        Giỏ hàng
                    </h1>

                    <form className="tw-mt-10 lg:tw-grid lg:tw-grid-cols-12 lg:tw-items-start lg:tw-gap-x-12 xl:tw-gap-x-16">
                        <section
                            aria-labelledby="cart-heading"
                            className="lg:tw-col-span-7"
                        >
                            <button
                                onClick={clearCart}
                                type="button"
                                className="tw-ml-auto tw-flex tw-items-center tw-gap-1.5 tw-rounded-tl-md tw-bg-gray-50 tw-px-2.5 tw-py-1 tw-font-medium tw-text-slate-700"
                            >
                                <IoTrash />
                                <span>Xoá giỏ hàng</span>
                            </button>
                            <h2 id="cart-heading" className="tw-sr-only">
                                Items in your shopping cart
                            </h2>
                            {getAllQueries.some((q) => q.isLoading) ? (
                                <div>Đang tải...</div>
                            ) : (
                                <ul
                                    role="list"
                                    className="tw-divide-y tw-divide-gray-200 tw-border-t tw-border-b tw-border-gray-200"
                                >
                                    {cart.map((cartItem) => (
                                        <CartRow
                                            key={cartItem.campaignBookId}
                                            cartItem={cartItem}
                                            data={getPost(
                                                cartItem.campaignBookId
                                            )}
                                        />
                                    ))}
                                </ul>
                            )}
                        </section>

                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="tw-mt-16 tw-rounded-lg tw-bg-gray-50 tw-px-4 tw-py-6 sm:tw-p-6 lg:tw-sticky lg:tw-top-20 lg:tw-col-span-5 lg:tw-mt-0 lg:tw-p-8"
                        >
                            <h2
                                id="summary-heading"
                                className="tw-text-lg tw-font-medium tw-text-gray-900"
                            >
                                Tóm tắt đơn hàng
                            </h2>

                            <dl className="tw-mt-6 tw-space-y-4">
                                <div className="tw-flex tw-items-center tw-justify-between">
                                    <dt className="tw-text-sm tw-text-gray-600">
                                        Tạm tính
                                    </dt>
                                    <dd className="tw-text-sm tw-font-medium tw-text-gray-900">
                                        {getFormattedPrice(getTotalPrice())}
                                    </dd>
                                </div>
                                <div className="tw-flex tw-items-center tw-justify-between tw-border-t tw-border-gray-200 tw-pt-4">
                                    <dt className="tw-flex tw-text-sm tw-text-gray-600">
                                        <span>Phí dịch vụ</span>
                                        <a
                                            href="#"
                                            className="tw-ml-2 tw-flex-shrink-0 tw-text-gray-400 hover:tw-text-gray-500"
                                        >
                                            <span className="tw-sr-only">
                                                Learn more about how tax is
                                                calculated
                                            </span>
                                            <HiQuestionMarkCircle
                                                className="tw-h-5 tw-w-5"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </dt>
                                    <dd className="tw-text-sm tw-font-medium tw-text-gray-900">
                                        {getFormattedPrice(0)}
                                    </dd>
                                </div>
                                <div className="tw-flex tw-items-center tw-justify-between tw-border-t tw-border-gray-200 tw-pt-4">
                                    <dt className="tw-text-base tw-font-medium tw-text-gray-900">
                                        Tổng cộng
                                    </dt>
                                    <dd className="tw-text-base tw-font-medium tw-text-gray-900">
                                        {getFormattedPrice(getTotalPrice())}
                                    </dd>
                                </div>
                            </dl>

                            <div className="tw-mt-6">
                                <button
                                    type="submit"
                                    className="tw-w-full tw-rounded-md tw-border tw-border-transparent tw-bg-indigo-600 tw-py-3 tw-px-4 tw-text-base tw-font-medium tw-text-white tw-shadow-sm hover:tw-bg-indigo-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-50"
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </section>
                    </form>
                </div>
            )}
        </MainLayout>
    );
};

export default CartPage;
