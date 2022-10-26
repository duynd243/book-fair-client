import React from 'react';
import Link from 'next/link';

export type DropdownItemProps = {
    href?: string;
    text: string;
    isWarning?: boolean;
    icon?: JSX.Element;
    onClick?: () => void;
};

const DropdownItem: React.FC<DropdownItemProps> = (props) => {
    return (
        <Link href={props.href || ''}>
            <div
                onClick={props.onClick}
                className={`tw-block tw-flex tw-cursor-pointer tw-items-center tw-justify-between tw-rounded-lg tw-px-4 tw-py-3 tw-text-lg tw-text-base tw-font-medium ${
                    props.isWarning
                        ? 'tw-text-red-700 hover:tw-bg-red-50'
                        : 'tw-text-gray-500 hover:tw-bg-gray-100 hover:tw-text-gray-700'
                }`}
            >
                {props.text}
                <div className={'tw-scale-[1.2]'}>{props.icon}</div>
            </div>
        </Link>
    );
};

export default DropdownItem;
