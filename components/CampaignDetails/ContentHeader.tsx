import React from 'react';

const ContentHeader: React.FC<{ text: string }> = ({ text }) => {
    return (
        <h2 className="text-slate-800 tw-mb-22 tw-text-xl tw-font-bold tw-leading-snug">
            {text}
        </h2>
    );
};
export default ContentHeader;
