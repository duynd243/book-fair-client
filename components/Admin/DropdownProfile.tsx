import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { getRoleById } from '../../constants/Roles';
import Image from 'next/image';

const DropdownProfile: React.FC<{ align: string }> = ({ align }) => {
    const { loginUser, user, logOut } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const trigger = useRef<HTMLButtonElement>(null);
    const dropdown = useRef<HTMLDivElement>(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: { target: any }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger?.current?.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    return (
        <div className="tw-relative tw-inline-flex">
            <button
                ref={trigger}
                className="tw-group tw-inline-flex tw-items-center tw-justify-center"
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
            >
                <Image
                    className="tw-h-8 tw-w-8 tw-rounded-full"
                    src={
                        loginUser?.imageUrl ||
                        user?.photoURL ||
                        DefaultAvatar.src
                    }
                    width="32"
                    height="32"
                    alt={loginUser?.name}
                />
                <div className="tw-flex tw-items-center tw-truncate">
                    <span className="tw-ml-2 tw-hidden tw-truncate tw-text-sm tw-font-medium group-hover:tw-text-slate-800 lg:tw-block">
                        {loginUser?.name || user?.displayName}
                    </span>
                    <svg
                        className="tw-ml-1 tw-h-3 tw-w-3 tw-shrink-0 tw-fill-current tw-text-slate-400"
                        viewBox="0 0 12 12"
                    >
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                </div>
            </button>

            <Transition
                className={`tw-absolute tw-top-full tw-z-10 tw-mt-3 tw-min-w-44 tw-origin-top-right tw-overflow-hidden tw-rounded tw-border tw-border-slate-200 tw-bg-white tw-py-1.5 tw-shadow-lg ${
                    align === 'right' ? 'tw-right-0' : 'tw-left-0'
                }`}
                show={dropdownOpen}
                enter="tw-transition tw-ease-out tw-duration-200 tw-transform"
                enterFrom="tw-opacity-0 -tw-translate-y-2"
                enterTo="tw-opacity-100 tw-translate-y-0"
                leave="tw-transition tw-ease-out tw-duration-200"
                leaveFrom="tw-opacity-100"
                leaveTo="tw-opacity-0"
            >
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                >
                    <div className="tw-mb-1 tw-border-b tw-border-slate-200 tw-px-3 tw-pt-0.5 tw-pb-2">
                        <div className="tw-font-medium tw-text-slate-800">
                            {loginUser?.name || user?.displayName}
                        </div>
                        <div className="tw-text-xs tw-italic tw-text-slate-500">
                            {getRoleById(loginUser?.role)?.displayName}
                        </div>
                    </div>
                    <ul>
                        <li>
                            <Link
                                className="tw-flex tw-items-center tw-py-1 tw-px-3 tw-text-sm tw-font-medium tw-text-indigo-500 hover:tw-text-indigo-600"
                                href="/settings"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                Settings
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="tw-flex tw-items-center tw-py-1 tw-px-3 tw-text-sm tw-font-medium tw-text-indigo-500 hover:tw-text-indigo-600"
                                href=""
                                onClick={() => {
                                    setDropdownOpen(!dropdownOpen);
                                    logOut();
                                }}
                            >
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    );
};

export default DropdownProfile;
