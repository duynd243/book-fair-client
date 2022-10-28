import React from 'react';
import { useAuth } from '../../../context/AuthContext';

const WelcomeBanner: React.FC = () => {
    const { loginUser, user } = useAuth();

    // greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Buổi sáng tốt lành';
        if (hour < 18) return 'Buổi chiều vui vẻ';
        return 'Buổi tối tuyệt vời';
    };

    return (
        <div className="tw-relative tw-mb-8 tw-overflow-hidden tw-rounded-sm tw-bg-indigo-200 tw-p-4 sm:tw-p-6">
            {/* Background illustration */}
            <div
                className="tw-pointer-events-none tw-absolute tw-right-0 tw-top-0 -tw-mt-4 tw-mr-16 tw-hidden xl:tw-block"
                aria-hidden="true"
            >
                <svg
                    width="319"
                    height="198"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <defs>
                        <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
                        <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
                        <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
                        <linearGradient
                            x1="50%"
                            y1="0%"
                            x2="50%"
                            y2="100%"
                            id="welcome-b"
                        >
                            <stop stopColor="#A5B4FC" offset="0%" />
                            <stop stopColor="#818CF8" offset="100%" />
                        </linearGradient>
                        <linearGradient
                            x1="50%"
                            y1="24.537%"
                            x2="50%"
                            y2="100%"
                            id="welcome-c"
                        >
                            <stop stopColor="#4338CA" offset="0%" />
                            <stop
                                stopColor="#6366F1"
                                stopOpacity="0"
                                offset="100%"
                            />
                        </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                        <g transform="rotate(64 36.592 105.604)">
                            <mask id="welcome-d" fill="#fff">
                                <use xlinkHref="#welcome-a" />
                            </mask>
                            <use
                                fill="url(#welcome-b)"
                                xlinkHref="#welcome-a"
                            />
                            <path
                                fill="url(#welcome-c)"
                                mask="url(#welcome-d)"
                                d="M64-24h80v152H64z"
                            />
                        </g>
                        <g transform="rotate(-51 91.324 -105.372)">
                            <mask id="welcome-f" fill="#fff">
                                <use xlinkHref="#welcome-e" />
                            </mask>
                            <use
                                fill="url(#welcome-b)"
                                xlinkHref="#welcome-e"
                            />
                            <path
                                fill="url(#welcome-c)"
                                mask="url(#welcome-f)"
                                d="M40.333-15.147h50v95h-50z"
                            />
                        </g>
                        <g transform="rotate(44 61.546 392.623)">
                            <mask id="welcome-h" fill="#fff">
                                <use xlinkHref="#welcome-g" />
                            </mask>
                            <use
                                fill="url(#welcome-b)"
                                xlinkHref="#welcome-g"
                            />
                            <path
                                fill="url(#welcome-c)"
                                mask="url(#welcome-h)"
                                d="M40.333-15.147h50v95h-50z"
                            />
                        </g>
                    </g>
                </svg>
            </div>

            {/* Content */}
            <div className="tw-relative">
                <h1 className="tw-mb-1 tw-text-2xl tw-font-bold tw-text-slate-800 md:tw-text-3xl">
                    {getGreeting()}, {loginUser?.name || user?.displayName} 👋
                </h1>
                <p>Here is what’s happening with your projects today:</p>
            </div>
        </div>
    );
};

export default WelcomeBanner;
