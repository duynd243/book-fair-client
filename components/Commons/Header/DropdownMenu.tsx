import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../../context/AuthContext';
import DropdownItem, { DropdownItemProps } from './DropdownItem';
import DefaultAvatar from '../../../assets/images/default_avatar.png';
import Image from 'next/image';

type Props = {
    menuItems: DropdownItemProps[];
};

const DropdownMenu: React.FC<Props> = (props) => {
    const { user, loginUser, authLoading, logOut } = useAuth();
    return (
        <Menu as={'div'}>
            <Menu.Button
                className={'tw-flex tw-items-center tw-justify-center'}
            >
                <Image
                    width={35}
                    height={35}
                    className="tw-cursor-pointer tw-rounded-full"
                    src={
                        loginUser?.imageUrl ||
                        user?.photoURL ||
                        DefaultAvatar.src
                    }
                    alt={''}
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
                    as={'div'}
                    className={
                        'tw-absolute tw-top-full tw-left-2 -tw-mt-2 tw-w-52 tw-max-w-full tw-rounded-lg tw-border tw-border-gray-100 tw-bg-white tw-p-1.5 tw-shadow-lg tw-drop-shadow lg:tw-left-auto lg:tw-right-2'
                    }
                >
                    {props.menuItems.map((item, index) => (
                        <DropdownItem key={index} {...item} />
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DropdownMenu;
