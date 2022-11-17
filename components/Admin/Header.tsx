import React, { useState } from 'react';
import DropdownProfile from './DropdownProfile';

type Props = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
    const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
    return (
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="-mb-px flex h-16 items-center justify-between">
                    {/* Header: Left side */}
                    <div className="flex">
                        {/* Hamburger button */}
                        <button
                            className="text-slate-500 hover:text-slate-600 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen(!sidebarOpen);
                            }}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="h-6 w-6 fill-current"
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
                    <div className="flex items-center space-x-3">
                        <div>
                            <button
                                className={`ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition duration-150 hover:bg-slate-200 ${
                                    searchModalOpen && 'bg-slate-200'
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchModalOpen(true);
                                }}
                                aria-controls="search-modal"
                            >
                                <span className="sr-only">Search</span>
                                <svg
                                    className="h-4 w-4"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        className="fill-current text-slate-500"
                                        d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                                    />
                                    <path
                                        className="fill-current text-slate-400"
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
                        <hr className="mx-3 h-6 w-px bg-slate-200" />
                        <DropdownProfile align="right" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
