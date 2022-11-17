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
            <Menu.Button className={'flex items-center justify-center'}>
                <Image
                    width={35}
                    height={35}
                    className="cursor-pointer rounded-full"
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
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    as={'div'}
                    className={
                        'absolute top-full left-2 -mt-2 w-52 max-w-full rounded-lg border border-gray-100 bg-white p-1.5 shadow-lg drop-shadow lg:left-auto lg:right-2'
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
