import React from 'react';

const LoadingProgress: React.FC = () => {
    return (
        <div className="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50 tw-bg-white tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-screen">
            <progress className="tw-progress tw-progress-primary tw-w-56"></progress>
            <div className="tw-mt-4 tw-font-medium">Loading...</div>
        </div>
    );
};

export default LoadingProgress;
