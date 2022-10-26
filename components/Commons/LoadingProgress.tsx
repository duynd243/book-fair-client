import React from 'react';

const LoadingProgress: React.FC = () => {
    return (
        <div className="tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-50 tw-flex tw-h-screen tw-flex-col tw-items-center tw-justify-center tw-bg-white">
            <progress className="tw-progress tw-progress-primary tw-w-56"></progress>
            <div className="tw-mt-4 tw-font-medium">Loading...</div>
        </div>
    );
};

export default LoadingProgress;
