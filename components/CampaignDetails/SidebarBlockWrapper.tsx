import React from 'react';

type Props = {
    children: React.ReactNode;
};

const SidebarBlockWrapper: React.FC<Props> = ({ children }) => {
    return (
        <div className="tw-border-slate-200 tw-rounded-md tw-border tw-bg-white tw-p-5 tw-shadow lg:tw-w-72 xl:tw-w-80">
            {children}
        </div>
    );
};

export default SidebarBlockWrapper;
