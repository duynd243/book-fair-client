import React from 'react';

const LoadingProgress: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex h-screen flex-col items-center justify-center bg-white">
            <progress className="progress progress-primary w-56"></progress>
            <div className="mt-4 font-medium">Loading...</div>
        </div>
    );
};

export default LoadingProgress;
