import React from 'react';

type Props = {
    text: string;
    isWarning?: boolean;
    icon?: JSX.Element;
    onClick?: () => void;
};

const DropdownItem: React.FC<Props> = (props) => {
    return (
        <a
            onClick={props.onClick}
            className={`tw-cursor-pointer tw-flex tw-items-center tw-justify-between tw-text-lg tw-block tw-rounded-lg tw-px-4 tw-py-3 tw-text-base tw-font-medium ${
                props.isWarning
                    ? 'tw-text-red-700 hover:tw-bg-red-50'
                    : 'tw-text-gray-500 hover:tw-text-gray-700 hover:tw-bg-gray-100'
            }`}
        >
            {props.text}
            <div className={'tw-scale-[1.2]'}>{props.icon}</div>
        </a>
    );
};

export default DropdownItem;
