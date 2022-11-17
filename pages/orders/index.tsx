import React from 'react';
import { NextPage } from 'next';
import MainLayout from '../../components/Layouts/MainLayout';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IoAddOutline } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { OrderService } from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { getFormattedDate, getFormattedPrice } from '../../utils/helper';

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

const ViewOrdersPage: NextPage = () => {
    const { loginUser } = useAuth();
    const orderService = new OrderService(loginUser?.accessToken);
    const { data: orders } = useQuery(['orders'], () =>
        orderService.getOrders()
    );
    return (
        <MainLayout maxWidth={'max-w-6xl'}>
            <div className="bg-white">
                <div className="py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
                        <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
                            {orders?.data.map((order) => (
                                <div
                                    key={order?.id}
                                    className="mb-8 bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
                                >
                                    <h3 className="sr-only">
                                        Order placed on{' '}
                                        <time dateTime={order?.orderDate}>
                                            {order?.orderDate}
                                        </time>
                                    </h3>

                                    <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6">
                                        <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                                            <div>
                                                <dt className="font-medium text-gray-900">
                                                    Mã đơn hàng
                                                </dt>
                                                <dd className="mt-1 text-gray-500">
                                                    {order?.id}
                                                </dd>
                                            </div>
                                            <div className="hidden sm:block">
                                                <dt className="font-medium text-gray-900">
                                                    Ngày đặt hàng
                                                </dt>
                                                <dd className="mt-1 text-gray-500">
                                                    <time
                                                        dateTime={
                                                            order?.orderDate
                                                        }
                                                    >
                                                        {order?.orderDate
                                                            ? getFormattedDate(
                                                                  order?.orderDate
                                                              ).withoutDayOfWeek
                                                            : 'N/A'}
                                                    </time>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium text-gray-900">
                                                    Tổng tiền
                                                </dt>
                                                <dd className="mt-1 font-medium text-gray-900">
                                                    {order?.total
                                                        ? getFormattedPrice(
                                                              order?.total
                                                          )
                                                        : 'N/A'}
                                                </dd>
                                            </div>
                                        </dl>

                                        <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                                            <a
                                                href={'#'}
                                                className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                <span>View Order</span>
                                                <span className="sr-only">
                                                    {'#'}
                                                </span>
                                            </a>
                                            <a
                                                href={'#'}
                                                className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                <span>View Invoice</span>
                                                <span className="sr-only">
                                                    for order {order?.id}
                                                </span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Products */}
                                    <h4 className="sr-only">Items</h4>
                                    <ul
                                        role="list"
                                        className="divide-y divide-gray-200"
                                    >
                                        {order?.orderDetails?.map(
                                            (orderDetail) => (
                                                <li
                                                    key={orderDetail?.id}
                                                    className="p-4 sm:p-6"
                                                >
                                                    <div className="flex items-center sm:items-start">
                                                        <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                                                            <img
                                                                src={
                                                                    orderDetail
                                                                        ?.campaignBook
                                                                        ?.book
                                                                        ?.imageUrl
                                                                }
                                                                alt={''}
                                                                className="full h-full object-center object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 ml-6 text-sm">
                                                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                                                <h5>
                                                                    {
                                                                        orderDetail
                                                                            ?.campaignBook
                                                                            ?.book
                                                                            ?.name
                                                                    }
                                                                </h5>
                                                                <p className="mt-2 sm:mt-0">
                                                                    {
                                                                        orderDetail?.price
                                                                    }
                                                                </p>
                                                            </div>
                                                            <p className="hidden text-gray-500 sm:block sm:mt-2">
                                                                {
                                                                    orderDetail
                                                                        ?.campaignBook
                                                                        ?.book
                                                                        ?.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 sm:flex sm:justify-between">
                                                        <div className="flex items-center">
                                                            <IoAddOutline
                                                                className="w-5 h-5 text-green-500"
                                                                aria-hidden="true"
                                                            />
                                                            <p className="ml-2 text-sm font-medium text-gray-500">
                                                                Delivered on{' '}
                                                                {/*<time*/}
                                                                {/*    dateTime={*/}
                                                                {/*        order.deliveredDatetime*/}
                                                                {/*    }*/}
                                                                {/*>*/}
                                                                {/*    {*/}
                                                                {/*        order.deliveredDate*/}
                                                                {/*    }*/}
                                                                {/*</time>*/}
                                                            </p>
                                                        </div>

                                                        <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                                                            <div className="flex-1 flex justify-center">
                                                                <a
                                                                    href={'#'}
                                                                    className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                                                >
                                                                    View product
                                                                </a>
                                                            </div>
                                                            <div className="flex-1 pl-4 flex justify-center">
                                                                <a
                                                                    href="#"
                                                                    className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                                                >
                                                                    Buy again
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ViewOrdersPage;
