import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useRef } from 'react';
import { isInViewPort } from 'utils/helper';
import SidebarMenu from './SidebarMenu';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Roles } from '../../constants/Roles';
import {
    ISSUER_SIDEBAR_ITEMS,
    SYSTEM_SIDEBAR_ITEMS,
} from '../../constants/SidebarItems';

export type ISidebarItem = {
    label: string;
    path?: string;
    icon?: ReactNode;
    onClick?: () => void;
    subItems?: ISidebarItem[];
};

export type ISidebarGroup = {
    groupLabel: string;
};

type Props = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const isSidebarGroup = (obj: ISidebarItem | ISidebarGroup) => {
    return (obj as ISidebarGroup).groupLabel !== undefined;
};

const Sidebar: React.FC<Props> = ({ sidebarOpen, setSidebarOpen }) => {
    const { loginUser } = useAuth();
    const [sidebarData, setSidebarData] = React.useState<
        (ISidebarItem | ISidebarGroup)[]
    >([]);

    useEffect(() => {
        switch (loginUser?.role) {
            case Roles.SYSTEM.id:
                setSidebarData(SYSTEM_SIDEBAR_ITEMS);
                break;
            case Roles.ISSUER.id:
                setSidebarData(ISSUER_SIDEBAR_ITEMS);
                break;
            default:
                setSidebarData([]);
        }
    }, [loginUser?.role]);

    // create ref for sidebar
    const sidebarRef = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);

    // scroll to selected item
    const router = useRouter();

    useEffect(() => {
        const sidebar = sidebarRef.current;
        if (sidebar) {
            const selected = sidebar.querySelector('.bg-blue-600');
            if (selected && !isInViewPort(selected)) {
                selected.scrollIntoView();
            }
        }
    }, [router.pathname]);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: { target: any }) => {
            if (!sidebarRef.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebarRef.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: { keyCode: number }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div>
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 z-40 bg-slate-900 bg-opacity-30 transition-opacity duration-200 lg:z-auto lg:hidden ${
                    sidebarOpen
                        ? 'opacity-100'
                        : 'pointer-events-none opacity-0'
                }`}
                aria-hidden="true"
            ></div>
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`no-scrollbar absolute left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-y-scroll bg-gray-800 p-4 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:!w-64 lg:translate-x-0 lg:overflow-y-auto 2xl:!w-64 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-64'
                }`}
            >
                {/*Sidebar header*/}
                <div className="mb-10 flex justify-between pr-3 sm:px-2">
                    {/* Close button */}
                    <button
                        ref={trigger}
                        className="text-slate-500 hover:text-slate-400 lg:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg
                            className="h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>
                    {/* Logo */}
                    <Link
                        href={`/${router.pathname.split('/')[1]}` || '/'}
                        className="block"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32">
                            <defs>
                                <linearGradient
                                    x1="28.538%"
                                    y1="20.229%"
                                    x2="100%"
                                    y2="108.156%"
                                    id="logo-a"
                                >
                                    <stop
                                        stopColor="#A5B4FC"
                                        stopOpacity="0"
                                        offset="0%"
                                    />
                                    <stop stopColor="#A5B4FC" offset="100%" />
                                </linearGradient>
                                <linearGradient
                                    x1="88.638%"
                                    y1="29.267%"
                                    x2="22.42%"
                                    y2="100%"
                                    id="logo-b"
                                >
                                    <stop
                                        stopColor="#38BDF8"
                                        stopOpacity="0"
                                        offset="0%"
                                    />
                                    <stop stopColor="#38BDF8" offset="100%" />
                                </linearGradient>
                            </defs>
                            <rect
                                fill="#6366F1"
                                width="32"
                                height="32"
                                rx="16"
                            />
                            <path
                                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                                fill="#4F46E5"
                            />
                            <path
                                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                                fill="url(#logo-a)"
                            />
                            <path
                                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                                fill="url(#logo-b)"
                            />
                        </svg>
                    </Link>
                </div>
                {/*Sidebar content*/}
                <ul>
                    {sidebarData.map((item, index) => {
                        return !isSidebarGroup(item) ? (
                            <SidebarMenu
                                key={index}
                                sidebarItem={item as ISidebarItem}
                                currentPathName={router.pathname}
                            />
                        ) : (
                            <h3
                                key={index}
                                className={
                                    'mt-4 mb-3 pl-3 text-xs font-bold uppercase text-slate-500 first:mt-0'
                                }
                            >
                                {(item as ISidebarGroup).groupLabel}
                            </h3>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
