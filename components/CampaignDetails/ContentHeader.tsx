import React from 'react';

const ContentHeader: React.FC<{ text: string }> = ({ text }) => {
    return (
        <h2 className="mb-22 text-xl font-bold leading-snug text-slate-800">
            {text}
        </h2>
    );
};
export default ContentHeader;
