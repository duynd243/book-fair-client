import React from 'react';
import { IoAdd } from 'react-icons/io5';

type Props = {
    label: string;
};

const CreateButton: React.FC<Props> = ({ label }) => {
    return (
        <button
            className={
                'm-btn tw-gap-1 tw-bg-indigo-500 hover:tw-bg-indigo-600 tw-text-white'
            }
        >
            <IoAdd size={16} />
            <span>{label}</span>
        </button>
    );
};

export default CreateButton;
