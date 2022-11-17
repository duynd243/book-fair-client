import React, { Fragment } from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';

export type DropdownItemProps = {
    href?: string;
    text: string;
    isWarning?: boolean;
    icon?: JSX.Element;
    onClick?: () => void;
};

const DropdownItem: React.FC<DropdownItemProps> = (props) => {
    return (
        <Menu.Item as={Fragment}>
            <Link href={props.href || ''}>
                <div
                    onClick={props.onClick}
                    className={`block flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-base text-base font-medium ${
                        props.isWarning
                            ? 'text-red-700 hover:bg-red-50'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                >
                    {props.text}
                    <div className={'scale-[1.2]'}>{props.icon}</div>
                </div>
            </Link>
        </Menu.Item>
    );
};

export default DropdownItem;
