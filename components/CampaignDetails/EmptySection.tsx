import React from 'react';

const EmptySection: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="py-6 text-center">
            <p className="text-slate-600">{text}</p>
        </div>
    );
};

export default EmptySection;
