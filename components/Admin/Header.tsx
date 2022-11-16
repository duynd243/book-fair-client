import React, { useState } from 'react';
import DropdownProfile from './DropdownProfile';

type Props = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
    const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
    return (
        <header className="tw-sticky tw-top-0 tw-z-10 tw-border-b tw-border-slate-200 tw-bg-white">
            <div className="tw-px-4 sm:tw-px-6 lg:tw-px-8">
                <div className="-tw-mb-px tw-flex tw-h-16 tw-items-center tw-justify-between">
                    {/* Header: Left side */}
                    <div className="tw-flex">
                        {/* Hamburger button */}
                        <button
                            className="tw-text-slate-500 hover:tw-text-slate-600 lg:tw-hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(!sidebarOpen);
                            }}
                        >
                            <span className="tw-sr-only">Open sidebar</span>
                            <svg
                                className="tw-h-6 tw-w-6 tw-fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x="4" y="5" width="16" height="2" />
                                <rect x="4" y="11" width="16" height="2" />
                                <rect x="4" y="17" width="16" height="2" />
                            </svg>
                        </button>
                    </div>

                    {/* Header: Right side */}
                    <div className="tw-flex tw-items-center tw-space-x-3">
                        <div>
                            <button
                                className={`tw-ml-3 tw-flex tw-h-8 tw-w-8 tw-items-center tw-justify-center tw-rounded-full tw-bg-slate-100 tw-transition tw-duration-150 hover:tw-bg-slate-200 ${
                                    searchModalOpen && 'tw-bg-slate-200'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchModalOpen(true);
                                }}
                                aria-controls="search-modal"
                            >
                                <span className="tw-sr-only">Search</span>
                                <svg
                                    className="tw-h-4 tw-w-4"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        className="tw-fill-current tw-text-slate-500"
                                        d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                                    />
                                    <path
                                        className="tw-fill-current tw-text-slate-400"
                                        d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                                    />
                                </svg>
                            </button>
                            {/*<SearchModal*/}
                            {/*    id="search-modal"*/}
                            {/*    searchId="search"*/}
                            {/*    modalOpen={searchModalOpen}*/}
                            {/*    setModalOpen={setSearchModalOpen}*/}
                            {/*/>*/}
                        </div>
                        {/*<Notifications align="right" />*/}
                        {/*<Help align="right" />*/}
                        {/*/!*  Divider *!/*/}
                        <hr className="tw-mx-3 tw-h-6 tw-w-px tw-bg-slate-200" />
                        <DropdownProfile align="right" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
