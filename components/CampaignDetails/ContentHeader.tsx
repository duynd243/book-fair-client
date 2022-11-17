import React from 'react';

const ContentHeader: React.FC<{ text: string }> = ({ text }) => {
    return (
        <h2 className="text-slate-800 mb-22 text-xl font-bold leading-snug">
            {text}
        </h2>
    );
};
export default ContentHeader;
