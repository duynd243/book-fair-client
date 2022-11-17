import React, { FormEvent, useState } from 'react';
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
import { getFormattedPrice, isValidPhoneNumber } from '../../utils/helper';
import { IOrder } from '../../types/order/IOrder';
import { addDays } from 'date-fns';
import { toast } from 'react-toastify';
import { OrderService } from '../../services/OrderService';
import { useRouter } from 'next/router';

const CartPage: NextPage = () => {
    const { loginUser, cart, handleClearCart } = useAuth();
    const router = useRouter();
    const queryClient = useQueryClient();
    const postService = new PostService(loginUser?.accessToken);
    const orderService = new OrderService(loginUser?.accessToken);
    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'ship'>(
        'pickup'
    );

    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

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

    const handlePlaceOrder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (deliveryMethod === 'ship' && !address.trim()) {
            toast.error('Vui lòng nhập địa chỉ giao hàng');
            return;
        }
        if (deliveryMethod === 'ship' && !phone.trim()) {
            toast.error('Vui lòng nhập số điện thoại');
            return;
        }

        if (deliveryMethod === 'ship' && !isValidPhoneNumber(phone)) {
            toast.error('Số điện thoại không hợp lệ');
            return;
        }

        const payload: IOrder = {
            campaignId: cart[0].campaignId,
            customerId: loginUser?.userId,
            address,
            total: getTotalPrice(),
            freight: 0,
            payment: 'COD',
            orderDate: new Date().toJSON(),
            requiredDate: addDays(new Date(), 7).toJSON(),
            shippedDate: addDays(new Date(), 7).toJSON(),
            orderDetails: cart.map((item) => {
                const post = getPost(item.campaignBookId);
                const campaignBook = post?.campaignBooks[0];
                const book = campaignBook?.book;
                return {
                    campaignBookId: item.campaignBookId,
                    quantity: item.quantity,
                    price:
                        campaignBook?.coverPrice && book?.price
                            ? campaignBook?.coverPrice + book?.price
                            : 0,
                };
            }),
        };

        switch (deliveryMethod) {
            case 'pickup':
                orderService.createPickUpOrder(payload).then((res) => {
                    if (res) {
                        Swal.fire({
                            title: 'Đặt hàng thành công',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        }).then(() => {
                            handleClearCart();
                            router.push('/orders');
                        });
                    }
                });
                break;
            case 'ship':
                orderService.createShipOrder(payload).then((res) => {
                    if (res) {
                        Swal.fire({
                            title: 'Đặt hàng thành công',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        }).then(() => {
                            handleClearCart();
                            router.push('/orders');
                        });
                    }
                });
                break;
        }
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
        <MainLayout maxWidth={'max-w-6xl'}>
            {cart?.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="bg-white px-4 pt-8 pb-14 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
                        Giỏ hàng
                    </h1>

                    <form
                        onSubmit={(e) => handlePlaceOrder(e)}
                        className="mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
                    >
                        <section
                            aria-labelledby="cart-heading"
                            className="lg:col-span-7"
                        >
                            <button
                                onClick={clearCart}
                                type="button"
                                className="ml-auto flex items-center gap-1.5 rounded-tl-md bg-gray-50 px-2.5 py-1 font-medium text-slate-700"
                            >
                                <IoTrash />
                                <span>Xoá giỏ hàng</span>
                            </button>
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                            {getAllQueries.some((q) => q.isLoading) ? (
                                <div>Đang tải...</div>
                            ) : (
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-200 border-t border-b border-gray-200"
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
                            className="border mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:sticky lg:top-20 lg:col-span-5 lg:mt-0 lg:p-8"
                        >
                            <h2
                                id="summary-heading"
                                className="text-lg font-medium text-gray-900"
                            >
                                Tóm tắt đơn hàng
                            </h2>

                            <dl className="mt-6 space-y-4">
                                <div className="flex items-center justify-between ">
                                    <dt className="text-sm font-medium text-gray-700">
                                        Tạm tính
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        {getFormattedPrice(getTotalPrice())}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="flex text-sm font-medium text-gray-700">
                                        <span>Phí dịch vụ</span>
                                        <a
                                            href="#"
                                            className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                                        >
                                            <HiQuestionMarkCircle
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </dt>
                                    <dd className="text-sm font-medium text-gray-900">
                                        {getFormattedPrice(0)}
                                    </dd>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <dt className=" text-base font-medium text-gray-700">
                                        Hình thức nhận hàng
                                    </dt>
                                    <div className={'mt-3'}>
                                        <div className="flex items-center gap-2">
                                            <input
                                                onChange={() =>
                                                    setDeliveryMethod('pickup')
                                                }
                                                checked={
                                                    deliveryMethod === 'pickup'
                                                }
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                                type="radio"
                                                id={'pickup-order'}
                                            />
                                            <label
                                                className={'text-gray-700'}
                                                htmlFor={'pickup-order'}
                                            >
                                                Nhận tại sự kiện
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <input
                                                onChange={() =>
                                                    setDeliveryMethod('ship')
                                                }
                                                checked={
                                                    deliveryMethod === 'ship'
                                                }
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                                                type="radio"
                                                id={'ship-order'}
                                            />
                                            <label
                                                className={'text-gray-700'}
                                                htmlFor={'ship-order'}
                                            >
                                                Giao hàng
                                            </label>
                                        </div>

                                        {deliveryMethod === 'ship' && (
                                            <>
                                                <div className={'mt-2'}>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Địa chỉ
                                                    </label>
                                                    <input
                                                        disabled={
                                                            deliveryMethod !==
                                                            'ship'
                                                        }
                                                        value={address}
                                                        onChange={(e) =>
                                                            setAddress(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="disabled:bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        type="text"
                                                    />
                                                </div>
                                                <div className={'mt-2'}>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Số điện thoại
                                                    </label>
                                                    <input
                                                        disabled={
                                                            deliveryMethod !==
                                                            'ship'
                                                        }
                                                        value={phone}
                                                        onChange={(e) =>
                                                            setPhone(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="disabled:bg-gray-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        type="text"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-base font-medium text-gray-900">
                                        Tổng cộng
                                    </dt>
                                    <dd className="text-lg font-semibold text-gray-900">
                                        {getFormattedPrice(getTotalPrice())}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
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
