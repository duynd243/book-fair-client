import React from 'react';
import Link from 'next/link';
import { NAV_ROUTES } from '../../../constants/NavRoutes';
import { useAuth } from '../../../context/AuthContext';
import { BiLogIn, BiLogOut, BiSearch, BiUserPlus } from 'react-icons/bi';
import { FcAddressBook } from 'react-icons/fc';
import { DropdownItemProps } from './DropdownItem';
import DropdownMenu from './DropdownMenu';
import { Roles } from '../../../constants/Roles';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { TbFileInvoice } from 'react-icons/tb';

type Props = {
    maxWidth: string;
};

const Header: React.FC<Props> = ({ maxWidth }) => {
    const { user, loginUser, logOut, cart } = useAuth();

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
            href: '/orders',
            icon: <TbFileInvoice />,
            text: 'Đơn hàng',
        },
        {
            onClick: logOut,
            text: 'Đăng xuất',
            isWarning: true,
            icon: <BiLogOut />,
        },
    ];

    return (
        <header className="sticky top-0 left-0 right-0 z-30 animate-fadeInDown bg-white/70 shadow-sm backdrop-blur-lg transition-transform">
            <div
                className={`${maxWidth} relative mx-auto flex h-16 items-center justify-between px-4`}
            >
                {/*Profile dropdown*/}
                <div className={'flex items-center gap-4 lg:order-3'}>
                    <div className={'lg:order-2'}>
                        <DropdownMenu
                            menuItems={
                                loginUser ? userMenuItems : guestMenuItems
                            }
                        />
                    </div>
                    {loginUser && loginUser?.role === Roles.CUSTOMER.id && (
                        <Link href={'/cart'} className={'group relative'}>
                            <HiOutlineShoppingBag
                                className={'text-slate-500'}
                                size={28}
                            />
                            <div className="absolute top-0 -right-2 h-5 w-5 rounded-full bg-indigo-500 text-center text-xs leading-relaxed text-white transition duration-300 group-hover:bg-indigo-600">
                                {cart?.length || 0}
                            </div>
                        </Link>
                    )}
                </div>
                {/*Logo*/}
                <div className="flex items-center gap-4">
                    <Link href={'/'}>
                        <FcAddressBook className={'scale-[2.2]'} />
                    </Link>
                    <form className="mb-0 hidden lg:flex">
                        <div className="relative">
                            <input
                                className="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10"
                                placeholder="Tìm kiếm ..."
                                type="text"
                            />
                            <button
                                className="absolute inset-y-0 right-0 mr-px rounded-r-lg p-2 text-gray-600"
                                type="submit"
                            >
                                <BiSearch />
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end lg:hidden">
                    <button
                        className="scale-[1.2] rounded-full bg-gray-100 p-2 text-gray-500"
                        type="button"
                    >
                        <BiSearch />
                    </button>
                </div>
                <div className="hidden items-center justify-center gap-8 text-sm font-medium lg:flex lg:w-0 lg:flex-1">
                    {NAV_ROUTES.map((route, index) => (
                        <Link
                            className="text-gray-900"
                            href={route.path}
                            key={index}
                        >
                            {route.name}
                        </Link>
                    ))}
                </div>
            </div>
            {/*Mobile navbar routes*/}
            <div className="border-t border-gray-100 lg:hidden">
                <nav className="flex items-center justify-center overflow-x-auto p-4 text-sm font-medium">
                    {NAV_ROUTES.map((route, index) => (
                        <Link
                            className="flex-shrink-0 px-4 text-gray-900"
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
