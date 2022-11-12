import React from 'react';
import Link from 'next/link';
import { NAV_ROUTES } from '../../../constants/NavRoutes';
import { useAuth } from '../../../context/AuthContext';
import { BiLogIn, BiLogOut, BiSearch, BiUserPlus } from 'react-icons/bi';
import { FcAddressBook } from 'react-icons/fc';
import { DropdownItemProps } from './DropdownItem';
import DropdownMenu from './DropdownMenu';

type Props = {
    maxWidth: string;
};

const Header: React.FC<Props> = ({ maxWidth }) => {
    const { user, loginUser, authLoading, logOut } = useAuth();

    const guestMenuItems: DropdownItemProps[] = [
        {
            href: '/signup',
            icon: <BiUserPlus />,
            text: 'Đăng ký',
        },
        {
            href: '/login',
            icon: <BiLogIn />,
            text: 'Đăng nhập',
        },
    ];

    const userMenuItems: DropdownItemProps[] = [
        {
            href: '/profile',
            text: loginUser?.name || user?.displayName,
        },
        {
            onClick: logOut,
            text: 'Đăng xuất',
            isWarning: true,
            icon: <BiLogOut />,
        },
    ];

    return (
        <header className="tw-sticky tw-top-0 tw-left-0 tw-right-0 tw-z-30 tw-animate-fadeInDown tw-bg-white/70 tw-shadow-sm tw-backdrop-blur-lg tw-transition-transform">
            <div
                className={`${maxWidth} tw-relative tw-mx-auto tw-flex tw-h-16 tw-items-center tw-justify-between tw-px-4`}
            >
                {/*Profile dropdown*/}
                <DropdownMenu
                    wrapperClassName={'lg:tw-order-3'}
                    menuItems={loginUser ? userMenuItems : guestMenuItems}
                />
                {/*Logo*/}
                <div className="tw-flex tw-items-center tw-gap-4">
                    <Link href={'/'}>
                        <FcAddressBook className={'tw-scale-[2.2]'} />
                    </Link>
                    <form className="tw-mb-0 tw-hidden lg:tw-flex">
                        <div className="tw-relative">
                            <input
                                className="tw-h-10 tw-rounded-lg tw-border-gray-200 tw-pr-10 tw-text-sm tw-placeholder-gray-300 focus:tw-z-10"
                                placeholder="Tìm kiếm ..."
                                type="text"
                            />
                            <button
                                className="tw-absolute tw-inset-y-0 tw-right-0 tw-mr-px tw-rounded-r-lg tw-p-2 tw-text-gray-600"
                                type="submit"
                            >
                                <BiSearch />
                            </button>
                        </div>
                    </form>
                </div>
                <div className="tw-flex tw-justify-end lg:tw-hidden">
                    <button
                        className="tw-scale-[1.2] tw-rounded-full tw-bg-gray-100 tw-p-2 tw-text-gray-500"
                        type="button"
                    >
                        <BiSearch />
                    </button>
                </div>
                <div className="tw-hidden tw-items-center tw-justify-center tw-gap-8 tw-text-sm tw-font-medium lg:tw-flex lg:tw-w-0 lg:tw-flex-1">
                    {NAV_ROUTES.map((route, index) => (
                        <Link
                            className="tw-text-gray-900"
                            href={route.path}
                            key={index}
                        >
                            {route.name}
                        </Link>
                    ))}
                </div>
            </div>
            {/*Mobile navbar routes*/}
            <div className="tw-border-t tw-border-gray-100 lg:tw-hidden">
                <nav className="tw-flex tw-items-center tw-justify-center tw-overflow-x-auto tw-p-4 tw-text-sm tw-font-medium">
                    {NAV_ROUTES.map((route, index) => (
                        <Link
                            className="tw-flex-shrink-0 tw-px-4 tw-text-gray-900"
                            href={route.path}
                            key={index}
                        >
                            {route.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
