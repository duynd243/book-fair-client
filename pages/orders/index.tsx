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
        <MainLayout maxWidth={'tw-max-w-6xl'}>
            <div className="tw-bg-white">
                <div className="tw-py-16 sm:tw-py-24">
                    <div className="tw-max-w-7xl tw-mx-auto sm:tw-px-2 lg:tw-px-8">
                        <div className="tw-max-w-2xl tw-mx-auto tw-px-4 lg:tw-max-w-4xl lg:tw-px-0">
                            {orders?.data.map((order) => (
                                <div
                                    key={order?.id}
                                    className="tw-mb-8 tw-bg-white tw-border-t tw-border-b tw-border-gray-200 tw-shadow-sm sm:tw-rounded-lg sm:tw-border"
                                >
                                    <h3 className="tw-sr-only">
                                        Order placed on{' '}
                                        <time dateTime={order?.orderDate}>
                                            {order?.orderDate}
                                        </time>
                                    </h3>

                                    <div className="tw-flex tw-items-center tw-p-4 tw-border-b tw-border-gray-200 sm:tw-p-6 sm:tw-grid sm:tw-grid-cols-4 sm:tw-gap-x-6">
                                        <dl className="tw-flex-1 tw-grid tw-grid-cols-2 tw-gap-x-6 tw-text-sm sm:tw-col-span-3 sm:tw-grid-cols-3 lg:tw-col-span-2">
                                            <div>
                                                <dt className="tw-font-medium tw-text-gray-900">
                                                    Mã đơn hàng
                                                </dt>
                                                <dd className="tw-mt-1 tw-text-gray-500">
                                                    {order?.id}
                                                </dd>
                                            </div>
                                            <div className="tw-hidden sm:tw-block">
                                                <dt className="tw-font-medium tw-text-gray-900">
                                                    Ngày đặt hàng
                                                </dt>
                                                <dd className="tw-mt-1 tw-text-gray-500">
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
                                                <dt className="tw-font-medium tw-text-gray-900">
                                                    Tổng tiền
                                                </dt>
                                                <dd className="tw-mt-1 tw-font-medium tw-text-gray-900">
                                                    {order?.total
                                                        ? getFormattedPrice(
                                                              order?.total
                                                          )
                                                        : 'N/A'}
                                                </dd>
                                            </div>
                                        </dl>

                                        <div className="tw-hidden lg:tw-col-span-2 lg:tw-flex lg:tw-items-center lg:tw-justify-end lg:tw-space-x-4">
                                            <a
                                                href={'#'}
                                                className="tw-flex tw-items-center tw-justify-center tw-bg-white tw-py-2 tw-px-2.5 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-indigo-500"
                                            >
                                                <span>View Order</span>
                                                <span className="tw-sr-only">
                                                    {'#'}
                                                </span>
                                            </a>
                                            <a
                                                href={'#'}
                                                className="tw-flex tw-items-center tw-justify-center tw-bg-white tw-py-2 tw-px-2.5 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-indigo-500"
                                            >
                                                <span>View Invoice</span>
                                                <span className="tw-sr-only">
                                                    for order {order?.id}
                                                </span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Products */}
                                    <h4 className="tw-sr-only">Items</h4>
                                    <ul
                                        role="list"
                                        className="tw-divide-y tw-divide-gray-200"
                                    >
                                        {order?.orderDetails?.map(
                                            (orderDetail) => (
                                                <li
                                                    key={orderDetail?.id}
                                                    className="tw-p-4 sm:tw-p-6"
                                                >
                                                    <div className="tw-flex tw-items-center sm:tw-items-start">
                                                        <div className="tw-flex-shrink-0 tw-w-20 tw-h-20 tw-bg-gray-200 tw-rounded-lg tw-overflow-hidden sm:tw-w-40 sm:tw-h-40">
                                                            <img
                                                                src={
                                                                    orderDetail
                                                                        ?.campaignBook
                                                                        ?.book
                                                                        ?.imageUrl
                                                                }
                                                                alt={''}
                                                                className="full tw-h-full tw-object-center tw-object-cover"
                                                            />
                                                        </div>
                                                        <div className="tw-flex-1 tw-ml-6 tw-text-sm">
                                                            <div className="tw-font-medium tw-text-gray-900 sm:tw-flex sm:tw-justify-between">
                                                                <h5>
                                                                    {
                                                                        orderDetail
                                                                            ?.campaignBook
                                                                            ?.book
                                                                            ?.name
                                                                    }
                                                                </h5>
                                                                <p className="tw-mt-2 sm:tw-mt-0">
                                                                    {
                                                                        orderDetail?.price
                                                                    }
                                                                </p>
                                                            </div>
                                                            <p className="tw-hidden tw-text-gray-500 sm:tw-block sm:tw-mt-2">
                                                                {
                                                                    orderDetail
                                                                        ?.campaignBook
                                                                        ?.book
                                                                        ?.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="tw-mt-6 sm:tw-flex sm:tw-justify-between">
                                                        <div className="tw-flex tw-items-center">
                                                            <IoAddOutline
                                                                className="tw-w-5 tw-h-5 tw-text-green-500"
                                                                aria-hidden="true"
                                                            />
                                                            <p className="tw-ml-2 tw-text-sm tw-font-medium tw-text-gray-500">
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

                                                        <div className="tw-mt-6 tw-border-t tw-border-gray-200 tw-pt-4 tw-flex tw-items-center tw-space-x-4 tw-divide-x tw-divide-gray-200 tw-text-sm tw-font-medium sm:tw-mt-0 sm:tw-ml-4 sm:tw-border-none sm:tw-pt-0">
                                                            <div className="tw-flex-1 tw-flex tw-justify-center">
                                                                <a
                                                                    href={'#'}
                                                                    className="tw-text-indigo-600 tw-whitespace-nowrap hover:tw-text-indigo-500"
                                                                >
                                                                    View product
                                                                </a>
                                                            </div>
                                                            <div className="tw-flex-1 tw-pl-4 tw-flex tw-justify-center">
                                                                <a
                                                                    href="#"
                                                                    className="tw-text-indigo-600 tw-whitespace-nowrap hover:tw-text-indigo-500"
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
