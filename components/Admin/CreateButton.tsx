import React from 'react';
import { IoAdd } from 'react-icons/io5';

type Props = {
    label: string;
    onClick?: () => void;
};

const CreateButton: React.FC<Props> = ({ label, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={
                'm-btn tw-gap-1 tw-bg-indigo-500 tw-text-white hover:tw-bg-indigo-600'
            }
        >
            <IoAdd size={16} />
            <span>{label}</span>
        </button>
    );
};

export default CreateButton;
