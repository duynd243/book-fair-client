import {
    BsFillBarChartFill,
    BsFillCalendarWeekFill,
    BsFillFileEarmarkMedicalFill,
    BsFillPeopleFill,
    BsFillTagsFill,
    BsPersonBadgeFill,
} from 'react-icons/bs';
import React from 'react';
import { ISidebarGroup, ISidebarItem } from '../components/Admin/Sidebar';
import { ImBook } from 'react-icons/im';

const SYSTEM_BASE_PATH = '/admin';
const ISSUER_BASE_PATH = '/issuer';

export const SYSTEM_SIDEBAR_ITEMS: (ISidebarItem | ISidebarGroup)[] = [
    // {
    //     groupLabel: 'Chung',
    // },
    {
        label: 'Dashboard',
        path: SYSTEM_BASE_PATH,
        icon: <BsFillBarChartFill />,
    },
    {
        label: 'Sự kiện',
        path: `${SYSTEM_BASE_PATH}/campaigns`,
        icon: <BsFillCalendarWeekFill />,
        // subItems: [
        //     {
        //         label: 'Danh sách',
        //         path: `${SYSTEM_BASE_PATH}/campaigns`,
        //     },
        //     {
        //         label: 'Tạo mới',
        //         path: `${SYSTEM_BASE_PATH}/campaigns/create`,
        //     },
        // ],
    },
    {
        label: 'Nhà phát hành',
        path: `${SYSTEM_BASE_PATH}/issuers`,
        icon: <BsPersonBadgeFill />,
    },
    {
        label: 'Khách hàng',
        path: `${SYSTEM_BASE_PATH}/customers`,
        icon: <BsFillPeopleFill />,
    },
    {
        label: 'Đơn hàng',
        path: `${SYSTEM_BASE_PATH}/orders`,
        icon: <BsFillFileEarmarkMedicalFill />,
    },
    {
        label: 'Thể loại sách',
        path: `${SYSTEM_BASE_PATH}/book-categories`,
        icon: <BsFillTagsFill />,
    },
    // {
    //     label: 'Nested',
    //     subItems: [
    //         {
    //             label: 'Nested 1',
    //             path: `${SYSTEM_BASE_PATH}/nested/nested1`,
    //         },
    //         {
    //             label: 'Nested 2',
    //             path: `${SYSTEM_BASE_PATH}/nested/nested2`,
    //         },
    //     ],
    // },
    // {
    //     groupLabel: 'Another Group',
    // },
    // {
    //     label: 'Another Nested',
    //     subItems: [
    //         {
    //             label: 'Nested 3',
    //             path: `${SYSTEM_BASE_PATH}/nested/nested3`,
    //         },
    //         {
    //             label: 'Nested 4',
    //             path: `${SYSTEM_BASE_PATH}/nested/nested4`,
    //         },
    //     ],
    // },
];
export const ISSUER_SIDEBAR_ITEMS: (ISidebarItem | ISidebarGroup)[] = [
    // {
    //     groupLabel: 'General',
    // },
    {
        label: 'Dashboard',
        path: ISSUER_BASE_PATH,
        icon: <BsFillBarChartFill />,
    },

    {
        label: 'Sự kiện',
        path: `${ISSUER_BASE_PATH}/campaigns`,
        icon: <BsFillCalendarWeekFill />,
    },
    {
        label: 'Kho sách',
        path: `${ISSUER_BASE_PATH}/books`,
        icon: <ImBook />,
    },
    // {
    //     label: 'Đơn hàng',
    //     path: `${ISSUER_BASE_PATH}/orders`,
    //     icon: <BsFillFileEarmarkMedicalFill />,
    // },
];
