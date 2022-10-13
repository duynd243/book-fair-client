import React, { Fragment } from 'react';
import Link from 'next/link';
import { NAV_ROUTES } from '../../../constants/NavRoutes';
import { useAuth } from '../../../context/AuthContext';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import DefaultAvatar from '../../../assets/images/default_avatar.png';
import { BiLogIn, BiLogOut, BiSearch, BiUserPlus } from 'react-icons/bi';
import { FcAddressBook } from 'react-icons/fc';
import DropdownItem from './DropdownItem';

const Header = () => {
    const { user, authLoading, logOut } = useAuth();

    return (
        <header className="tw-shadow-sm">
            <div className="tw-relative tw-mx-auto tw-flex tw-h-16 tw-max-w-screen-xl tw-items-center tw-justify-between tw-px-4">
                <Menu>
                    <div className="tw-flex tw-items-center tw-w-0 tw-flex-1 lg:tw-hidden">
                        <Menu.Button
                            className={
                                'tw-flex tw-items-center tw-justify-center'
                            }
                        >
                            <Image
                                alt={user?.displayName}
                                src={user?.photoURL || DefaultAvatar.src}
                                width={35}
                                height={35}
                                className="tw-cursor-pointer tw-rounded-full"
                            />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="tw-transition tw-ease-out tw-duration-100"
                            enterFrom="tw-transform tw-opacity-0 tw-scale-95"
                            enterTo="tw-transform tw-opacity-100 tw-scale-100"
                            leave="tw-transition tw-ease-in tw-duration-75"
                            leaveFrom="tw-transform tw-opacity-100 tw-scale-100"
                            leaveTo="tw-transform tw-opacity-0 tw-scale-95"
                        >
                            <Menu.Items
                                className={
                                    'tw-absolute tw-p-1.5 tw-top-full tw-w-52 -tw-mt-2 tw-max-w-full tw-left-2 tw-rounded-lg tw-border tw-border-gray-100 tw-bg-white tw-drop-shadow tw-shadow-lg'
                                }
                            >
                                {!authLoading && !user && (
                                    <>
                                        <Menu.Item>
                                            <Link href={'/login'}>
                                                <DropdownItem
                                                    icon={<BiLogIn />}
                                                    text={'Đăng nhập'}
                                                />
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link href={'/signup'}>
                                                <DropdownItem
                                                    icon={<BiUserPlus />}
                                                    text={'Đăng ký'}
                                                />
                                            </Link>
                                        </Menu.Item>
                                    </>
                                )}
                                {!authLoading && user && (
                                    <>
                                        <Menu.Item>
                                            <DropdownItem
                                                text={user?.displayName}
                                            />
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownItem
                                                isWarning={true}
                                                icon={<BiLogOut />}
                                                text={'Đăng xuất'}
                                                onClick={logOut}
                                            />
                                        </Menu.Item>
                                    </>
                                )}
                            </Menu.Items>
                        </Transition>
                    </div>
                </Menu>
                <div className="tw-flex tw-items-center tw-gap-4">
                    <FcAddressBook className={'tw-scale-[2.2]'} />
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
                <div className="tw-flex tw-w-0 tw-flex-1 tw-justify-end lg:tw-hidden">
                    <button
                        className="tw-scale-[1.2] tw-rounded-full tw-bg-gray-100 tw-p-2 tw-text-gray-500"
                        type="button"
                    >
                        <BiSearch />
                    </button>
                </div>
                <nav className="tw-hidden tw-items-center tw-justify-center tw-gap-8 tw-text-sm tw-font-medium lg:tw-flex lg:tw-w-0 lg:tw-flex-1">
                    {NAV_ROUTES.map((route, index) => (
                        <Link href={route.path} key={index}>
                            <a className="tw-text-gray-900">{route.name}</a>
                        </Link>
                    ))}
                </nav>
                <div className="tw-hidden tw-items-center tw-gap-4 lg:tw-flex">
                    {!authLoading && !user ? (
                        <>
                            <Link href={'/login'}>
                                <a className="tw-rounded-lg tw-bg-gray-100 tw-px-5 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-600">
                                    Đăng nhập
                                </a>
                            </Link>
                            <Link href={'/signup'}>
                                <a className="tw-rounded-lg tw-bg-blue-600 tw-px-5 tw-py-2 tw-text-sm tw-font-medium tw-text-white">
                                    Đăng ký
                                </a>
                            </Link>
                        </>
                    ) : (
                        <>
                            <div onClick={logOut}>
                                <a className="tw-cursor-pointer tw-rounded-lg tw-bg-gray-100 tw-px-5 tw-py-2 tw-text-sm tw-font-medium tw-text-gray-600">
                                    Đăng xuất
                                </a>
                            </div>
                            <Image
                                alt={user?.displayName}
                                src={user?.photoURL || DefaultAvatar.src}
                                width={35}
                                height={35}
                                className="tw-cursor-pointer tw-rounded-full"
                            />
                        </>
                    )}
                </div>
            </div>
            <div className="tw-border-t tw-border-gray-100 lg:tw-hidden">
                <nav className="tw-flex tw-items-center tw-justify-center tw-overflow-x-auto tw-p-4 tw-text-sm tw-font-medium">
                    {NAV_ROUTES.map((route, index) => (
                        <Link href={route.path} key={index}>
                            <a className="tw-flex-shrink-0 tw-px-4 tw-text-gray-900">
                                {route.name}
                            </a>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
