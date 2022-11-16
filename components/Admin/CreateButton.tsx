import React from 'react';
import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';

type Props = {
    label: string;
    onClick?: () => void;
    href?: string;
};

const CreateButton: React.FC<Props> = ({ label, onClick, href }) => {
    return (
        <Link
            href={href || '#'}
            onClick={onClick}
            className={
                'm-btn tw-gap-1 tw-bg-indigo-500 tw-text-white hover:tw-bg-indigo-600'
            }
        >
            <IoAdd size={16} />
            <span>{label}</span>
        </Link>
    );
};

export default CreateButton;
