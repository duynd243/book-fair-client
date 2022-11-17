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
        <div className="relative inline-flex">
            <button
                ref={trigger}
                className="group inline-flex items-center justify-center"
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
            >
                <Image
                    className="h-8 w-8 rounded-full"
                    src={
                        loginUser?.imageUrl ||
                        user?.photoURL ||
                        DefaultAvatar.src
                    }
                    width="32"
                    height="32"
                    alt={loginUser?.name}
                />
                <div className="flex items-center truncate">
                    <span className="ml-2 hidden truncate text-sm font-medium group-hover:text-slate-800 lg:block">
                        {loginUser?.name || user?.displayName}
                    </span>
                    <svg
                        className="ml-1 h-3 w-3 shrink-0 fill-current text-slate-400"
                        viewBox="0 0 12 12"
                    >
                        <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                </div>
            </button>

            <Transition
                className={`absolute top-full z-10 mt-3 min-w-44 origin-top-right overflow-hidden rounded border border-slate-200 bg-white py-1.5 shadow-lg ${
                    align === 'right' ? 'right-0' : 'left-0'
                }`}
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                >
                    <div className="mb-1 border-b border-slate-200 px-3 pt-0.5 pb-2">
                        <div className="font-medium text-slate-800">
                            {loginUser?.name || user?.displayName}
                        </div>
                        <div className="text-xs italic text-slate-500">
                            {getRoleById(loginUser?.role)?.displayName}
                        </div>
                    </div>
                    <ul>
                        <li>
                            <Link
                                className="flex items-center py-1 px-3 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                                href="/settings"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                Settings
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="flex items-center py-1 px-3 text-sm font-medium text-indigo-500 hover:text-indigo-600"
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
