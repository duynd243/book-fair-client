import React from 'react';

type Props = {
    children: React.ReactNode;
    active: boolean;
};

const Chip: React.FC<Props> = ({ children, active }) => {
    return (
        <li>
            <button
                className={`${
                    active
                        ? 'border-transparent bg-indigo-500 text-white'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                } inline-flex items-center justify-center rounded-full border px-3 py-1 text-sm font-medium leading-5 shadow-sm duration-150 ease-in-out`}
            >
                {children}
            </button>
        </li>
    );
};

export default Chip;
