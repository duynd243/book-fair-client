import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {};

type SidebarItem = {
    name: string;
    path?: string;
    onClick?: () => void;
    subItems?: SidebarItem[];
};

const AdminSidebar: React.FC<Props> = () => {
    const sidebarItems: SidebarItem[] = [
        {
            name: 'Users',
            path: '/admin/users',
            subItems: [
                {
                    name: 'Create',
                    path: '/admin/users/create',
                },
                {
                    name: 'Edit',
                    path: '/admin/users/edit',
                },
            ],
        },
        {
            name: 'Books',
            path: '/admin/books',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns123',
            path: '/admin/campaigns123',
        },
        {
            name: 'Campaigns',
            path: '/admin/campaigns',
        },
    ];
    const router = useRouter();

    const activeMenu = sidebarItems.find(
        (item) => item?.path && router.pathname.includes(item.path)
    );

    return (
        <div className="tw-h-screen tw-w-3/12 tw-overflow-y-auto tw-bg-gray-50">
            {sidebarItems.map((item) => (
                <Link
                    className={`tw-block tw-cursor-pointer tw-p-4 ${
                        item.path == activeMenu?.path &&
                        'tw-bg-blue-600 tw-text-white'
                    }`}
                    key={item.path}
                    href={item?.path || ''}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
};

export default AdminSidebar;
