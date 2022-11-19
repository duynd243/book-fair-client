import React, { useState } from 'react';
import { NextPage } from 'next';
import MainLayout from '../../components/Layouts/MainLayout';
import { useAuth } from '../../context/AuthContext';
import { OrderService } from '../../services/OrderService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import { getFormattedPrice } from '../../utils/helper';
import { Tab } from '@headlessui/react';
import Link from 'next/link';
import { OrderStatuses } from '../../constants/Statuses';
import { FiLoader } from 'react-icons/fi';
import { GiBoxUnpacking } from 'react-icons/gi';
import { FaTruck } from 'react-icons/fa';
import { MdDoneAll, MdBlock } from 'react-icons/md';

const OrderStatusTabs = [
    {
        id: 0,
        displayName: 'Đang xử lý',
        icon: <FiLoader />,
    },
    {
        id: 1,
        displayName: 'Đợi nhận hàng',
        icon: <GiBoxUnpacking />,
    },
    {
        id: 2,
        displayName: 'Đang vận chuyển',
        icon: <FaTruck />,
    },
    {
        id: 3,
        displayName: 'Đã giao',
        icon: <MdDoneAll />,
    },
    // Đã nhận hàng tại campaign (đơn dạng pickup)
    {
        id: 4,
        displayName: 'Đã nhận hàng',
        icon: <MdDoneAll />,
    },
    {
        id: 5,
        displayName: 'Đã bị hủy',
        icon: <MdBlock />,
    },
];
const OrderStatusLabel = ({ statusId }: { statusId: number | undefined }) => {
    let color = 'bg-gray-100 text-gray-800';
    switch (statusId) {
        case OrderStatuses.PROCESSING.id:
            color =
                'bg-amber-100 hover:bg-amber-100 text-amber-700 shadow-amber-200';
            break;
        case OrderStatuses.RECEIVED.id:
            color =
                'bg-emerald-100 hover:bg-emerald-100 text-emerald-700 shadow-emerald-200';
            break;
        case OrderStatuses.SHIPPED.id:
            color =
                'bg-emerald-100 hover:bg-emerald-100 text-emerald-700 shadow-emerald-200';
            break;
        case OrderStatuses.WAITING_RECEIVE.id:
            color =
                'bg-blue-100 hover:bg-blue-100 text-blue-700 shadow-blue-200';
            break;
        case OrderStatuses.SHIPPING.id:
            color =
                'bg-blue-100 hover:bg-blue-100 text-blue-700 shadow-blue-200';
            break;
        case OrderStatuses.CANCELLED.id:
            color = 'bg-red-100 hover:bg-red-100 text-red-700 shadow-red-200';
            break;
        default:
            break;
    }
    return (
        <div
            className={`flex w-full items-center justify-center gap-2 rounded-md py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto ${color}`}
        >
            <span>
                {OrderStatusTabs?.find((s) => s.id === statusId)?.displayName}
            </span>
            {OrderStatusTabs?.find((s) => s.id === statusId)?.icon}
        </div>
    );
};

const ViewOrdersPage: NextPage = () => {
    const { loginUser } = useAuth();
    const orderService = new OrderService(loginUser?.accessToken);
    const [selectedStatus, setSelectedStatus] = useState<number>(0);

    const [pageSize] = useState(5);

    const {
        data: orders,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isInitialLoading,
        isLoading,
    } = useInfiniteQuery(
        ['orders', selectedStatus],
        ({ pageParam = 1 }) =>
            orderService.getOrders({
                status: selectedStatus,
                page: pageParam,
                size: pageSize,
                sort: 'OrderDate desc',
            }),
        {
            getNextPageParam: (lastPage) => {
                const currentPage = lastPage?.metadata?.page;
                const totalPages = Math.ceil(
                    lastPage?.metadata?.total / pageSize
                );
                return currentPage < totalPages ? currentPage + 1 : undefined;
            },
        }
    );
    console.log(orders?.pages);
    return (
        <MainLayout maxWidth={'max-w-6xl'}>
            <div className="bg-white px-4 pt-8 pb-14 sm:px-6 lg:px-8">
                <div className="mb-6 px-4 sm:px-0">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 sm:text-4xl">
                        Lịch sử đơn hàng
                    </h1>
                </div>
                <Tab.Group
                    onChange={(index) => {
                        setSelectedStatus(OrderStatusTabs[index].id);
                    }}
                >
                    <div className="border-b border-gray-200">
                        <nav
                            className="-mb-px flex space-x-8"
                            aria-label="Tabs"
                        >
                            {OrderStatusTabs?.map((status) => (
                                <Tab
                                    key={status.id}
                                    className={({ selected }) => {
                                        return `${
                                            selected
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700'
                                        } flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium focus:outline-none`;
                                    }}
                                >
                                    {({ selected }) => {
                                        return (
                                            <>
                                                <span>
                                                    {status.displayName}
                                                </span>
                                                {selected && (
                                                    <span className="ml-3 hidden rounded-full bg-indigo-100 py-0.5 px-2.5 text-xs font-medium text-indigo-600 md:inline-block">
                                                        {orders?.pages?.[0]
                                                            ?.metadata?.total ||
                                                            0}
                                                    </span>
                                                )}
                                            </>
                                        );
                                    }}
                                </Tab>
                            ))}
                        </nav>
                    </div>
                </Tab.Group>

                <div className="mt-16">
                    <div className="sm:space-y-18 space-y-16">
                        {isLoading ? (
                            <div>Đang tải ...</div>
                        ) : (
                            orders?.pages?.map((value) =>
                                value?.data?.map((order) => (
                                    <div key={order?.id}>
                                        <div className="bg-gray-50 px-4 py-6 sm:rounded-t-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                                            <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                                <div className="flex justify-between md:block">
                                                    <dt className="font-medium text-gray-900">
                                                        Order number
                                                    </dt>
                                                    <dd className="uppercase md:mt-1">
                                                        {order?.id}
                                                    </dd>
                                                </div>
                                                <div className="flex justify-between pt-4 md:block md:pt-0">
                                                    <dt className="font-medium text-gray-900">
                                                        Ngày đặt hàng
                                                    </dt>
                                                    <dd className="md:mt-1">
                                                        <time
                                                            dateTime={
                                                                order?.orderDate
                                                            }
                                                        >
                                                            {order?.orderDate
                                                                ? format(
                                                                      new Date(
                                                                          order?.orderDate
                                                                      ),
                                                                      'HH:mm dd/MM/yyyy',
                                                                      {
                                                                          locale: vi,
                                                                      }
                                                                  )
                                                                : ''}
                                                        </time>
                                                    </dd>
                                                </div>
                                                <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                                                    <dt>Tổng tiền</dt>
                                                    <dd className="text-lg font-medium text-indigo-700 md:mt-1">
                                                        {order?.total
                                                            ? getFormattedPrice(
                                                                  order?.total
                                                              )
                                                            : 'N/A'}
                                                    </dd>
                                                </div>
                                            </dl>
                                            <div className="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                                                <OrderStatusLabel
                                                    statusId={order?.status}
                                                />
                                                <Link
                                                    href={{
                                                        pathname:
                                                            '/campaigns/[slug]/[id]',
                                                        query: {
                                                            slug: 'campaign',
                                                            id: order
                                                                ?.orderDetails?.[0]
                                                                ?.campaignBook
                                                                ?.participation
                                                                ?.campaignId,
                                                        },
                                                    }}
                                                    className="flex w-full items-center justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                                                >
                                                    Đến sự kiện
                                                </Link>
                                            </div>
                                        </div>

                                        <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                            <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                                                    >
                                                        Sản phẩm
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                                                    >
                                                        Nhà phát hành
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden py-3 pr-8 font-normal sm:table-cell"
                                                    >
                                                        Giá
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden py-3 pr-8 font-normal sm:table-cell"
                                                    >
                                                        Số lượng
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="hidden py-3 pr-8 font-normal sm:table-cell"
                                                    >
                                                        Tạm tính
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                                                {order?.orderDetails?.map(
                                                    (orderDetail) => (
                                                        <tr
                                                            className={'px-2'}
                                                            key={
                                                                orderDetail?.id
                                                            }
                                                        >
                                                            <td className="py-6 pr-8">
                                                                <div className="flex items-center gap-6">
                                                                    <Image
                                                                        width={
                                                                            250
                                                                        }
                                                                        height={
                                                                            250
                                                                        }
                                                                        src={
                                                                            orderDetail
                                                                                ?.campaignBook
                                                                                ?.book
                                                                                ?.imageUrl ||
                                                                            `https://via.placeholder.com/150`
                                                                        }
                                                                        alt={
                                                                            orderDetail
                                                                                ?.campaignBook
                                                                                ?.book
                                                                                ?.name ||
                                                                            ''
                                                                        }
                                                                        className="h-24 w-20 rounded object-cover object-center"
                                                                    />
                                                                    <div>
                                                                        <div className="font-medium text-gray-900">
                                                                            {
                                                                                orderDetail
                                                                                    ?.campaignBook
                                                                                    ?.book
                                                                                    ?.name
                                                                            }
                                                                        </div>
                                                                        <div className="mt-1 sm:hidden">
                                                                            {
                                                                                orderDetail
                                                                                    ?.campaignBook
                                                                                    ?.book
                                                                                    ?.price
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="hidden py-6 pr-8 sm:table-cell">
                                                                <div className="flex items-center gap-1.5">
                                                                    <Image
                                                                        className={
                                                                            'h-6 w-6 rounded-full'
                                                                        }
                                                                        src={
                                                                            orderDetail
                                                                                ?.campaignBook
                                                                                ?.participation
                                                                                ?.issuer
                                                                                ?.imageUrl ||
                                                                            DefaultAvatar.src
                                                                        }
                                                                        alt={
                                                                            orderDetail
                                                                                ?.campaignBook
                                                                                ?.participation
                                                                                ?.issuer
                                                                                ?.name ||
                                                                            ''
                                                                        }
                                                                        width={
                                                                            100
                                                                        }
                                                                        height={
                                                                            100
                                                                        }
                                                                    />
                                                                    <div>
                                                                        {
                                                                            orderDetail
                                                                                ?.campaignBook
                                                                                ?.participation
                                                                                ?.issuer
                                                                                ?.name
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="hidden py-6 pr-8 sm:table-cell">
                                                                {orderDetail
                                                                    ?.campaignBook
                                                                    ?.coverPrice &&
                                                                orderDetail
                                                                    ?.campaignBook
                                                                    ?.book
                                                                    ?.price
                                                                    ? getFormattedPrice(
                                                                          orderDetail
                                                                              ?.campaignBook
                                                                              ?.coverPrice +
                                                                              orderDetail
                                                                                  ?.campaignBook
                                                                                  ?.book
                                                                                  ?.price
                                                                      )
                                                                    : 'N/A'}
                                                            </td>
                                                            <td className="hidden py-6 pr-8 sm:table-cell">
                                                                {
                                                                    orderDetail?.quantity
                                                                }
                                                            </td>
                                                            <td className="hidden py-6 pr-8 font-medium text-indigo-500 sm:table-cell">
                                                                {orderDetail
                                                                    ?.campaignBook
                                                                    ?.coverPrice &&
                                                                orderDetail
                                                                    ?.campaignBook
                                                                    ?.book
                                                                    ?.price &&
                                                                orderDetail?.quantity
                                                                    ? getFormattedPrice(
                                                                          (orderDetail
                                                                              ?.campaignBook
                                                                              ?.coverPrice +
                                                                              orderDetail
                                                                                  ?.campaignBook
                                                                                  ?.book
                                                                                  ?.price) *
                                                                              orderDetail?.quantity
                                                                      )
                                                                    : 'N/A'}
                                                            </td>
                                                            {/*<td className="py-6 font-medium text-right whitespace-nowrap">*/}
                                                            {/*    <a*/}
                                                            {/*        href={''}*/}
                                                            {/*        className="text-indigo-600"*/}
                                                            {/*    >*/}
                                                            {/*        View*/}
                                                            {/*        <span className="hidden lg:inline">*/}
                                                            {/*            {' '}*/}
                                                            {/*            Product*/}
                                                            {/*        </span>*/}
                                                            {/*        <span className="sr-only">*/}
                                                            {/*            , {''}*/}
                                                            {/*        </span>*/}
                                                            {/*    </a>*/}
                                                            {/*</td>*/}
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                </div>
                {hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="mx-auto mt-4 block rounded bg-indigo-50 px-4 py-2 text-base font-medium text-indigo-500 transition disabled:bg-gray-50 disabled:text-gray-500"
                    >
                        {isFetchingNextPage
                            ? 'Đang tải...'
                            : 'Xem thêm đơn hàng'}
                    </button>
                )}
            </div>
        </MainLayout>
    );
};

export default ViewOrdersPage;
