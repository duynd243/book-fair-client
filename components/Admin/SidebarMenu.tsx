import React, { useState } from 'react';
import Link from 'next/link';
import { ISidebarItem } from './Sidebar';

type Props = {
    sidebarItem: ISidebarItem;
    currentPathName: string;
};

const SidebarMenuWrapper: React.FC<{
    isActive: boolean;
    children: React.ReactNode;
}> = ({ isActive, children }) => {
    return (
        <li
            className={`mb-0.5 select-none rounded px-3.5 py-1.5 last:mb-0 ${
                isActive && 'bg-gray-900'
            }`}
        >
            {children}
        </li>
    );
};

const SidebarMenuIcon: React.FC<{
    icon: React.ReactNode;
    isActive: boolean;
}> = ({ icon, isActive }) => {
    return (
        <span className={`${isActive ? 'text-indigo-500' : 'text-indigo-300'}`}>
            {icon}
        </span>
    );
};

const SidebarMenu: React.FC<Props> = ({ sidebarItem, currentPathName }) => {
    const isPathActive = currentPathName === sidebarItem?.path;
    const activeSubItem = sidebarItem.subItems?.find(
        (subItem) => subItem.path === currentPathName
    );

    const [isExpanded, setIsExpanded] = useState<boolean>(
        activeSubItem !== undefined
    ); // for sub items

    if (sidebarItem.subItems && sidebarItem.subItems.length > 0) {
        return (
            <SidebarMenuWrapper isActive={activeSubItem !== undefined}>
                {/*Parent*/}
                <a
                    className={`block cursor-pointer truncate text-slate-200 transition duration-150 hover:text-white ${
                        activeSubItem && 'hover:text-slate-200'
                    }`}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsExpanded(!isExpanded);
                    }}
                >
                    <div className=" flex items-center justify-between py-2">
                        <div className="flex items-center">
                            {sidebarItem?.icon && (
                                <SidebarMenuIcon
                                    icon={sidebarItem.icon}
                                    isActive={activeSubItem !== undefined}
                                />
                            )}
                            <span className="ml-3 text-sm font-medium duration-200">
                                {sidebarItem.label}
                            </span>
                        </div>
                        {/* Expand / Collapse Icon */}
                        <div className="ml-2 flex shrink-0">
                            <svg
                                className={`ml-1 h-3 w-3 shrink-0 fill-current text-slate-400 transition-all ${
                                    isExpanded && 'rotate-180'
                                }`}
                                viewBox="0 0 12 12"
                            >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                        </div>
                    </div>
                </a>
                {/*Sub Items*/}
                <div className="block">
                    <ul
                        className={`mt-1 animate-floatUp pl-9 transition ${
                            !isExpanded && 'hidden'
                        }`}
                    >
                        {sidebarItem.subItems.map((subItem) => (
                            <li
                                key={subItem?.path || subItem?.label}
                                className="mb-1 last:mb-0"
                            >
                                <Link
                                    onClick={subItem.onClick}
                                    href={subItem.path || ''}
                                    className={`block truncate py-2 text-slate-400 transition duration-150 hover:text-slate-200 ${
                                        activeSubItem?.path === subItem?.path &&
                                        '!text-indigo-500'
                                    }`}
                                >
                                    <span className="text-sm font-medium duration-200">
                                        {subItem.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </SidebarMenuWrapper>
        );
    }
    return (
        <SidebarMenuWrapper isActive={isPathActive}>
            <Link
                className={`block truncate text-slate-200 transition duration-150 hover:text-white
                ${isPathActive && 'hover:text-slate-200'}`}
                href={sidebarItem?.path || ''}
            >
                <div className="flex items-center py-2">
                    {sidebarItem?.icon && (
                        <SidebarMenuIcon
                            icon={sidebarItem.icon}
                            isActive={isPathActive}
                        />
                    )}
                    <span className="ml-3 text-sm font-medium duration-200">
                        {sidebarItem.label}
                    </span>
                </div>
            </Link>
        </SidebarMenuWrapper>
    );
};

export default SidebarMenu;
