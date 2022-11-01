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
            className={`tw-mb-0.5 tw-select-none tw-rounded tw-px-3.5 tw-py-1.5 last:tw-mb-0 ${
                isActive && 'tw-bg-gray-900'
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
        <span
            className={`${
                isActive ? 'tw-text-indigo-500' : 'tw-text-indigo-300'
            }`}
        >
            {icon}
        </span>
    );
};

const SidebarMenu: React.FC<Props> = ({ sidebarItem, currentPathName }) => {
    const isPathActive = currentPathName === sidebarItem?.path;

    console.log('isPathActive', isPathActive);
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
                    className={`tw-block tw-cursor-pointer tw-truncate tw-text-slate-200 tw-transition tw-duration-150 hover:tw-text-white ${
                        activeSubItem && 'hover:tw-text-slate-200'
                    }`}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsExpanded(!isExpanded);
                    }}
                >
                    <div className=" tw-flex tw-items-center tw-justify-between tw-py-2">
                        <div className="tw-flex tw-items-center">
                            {sidebarItem?.icon && (
                                <SidebarMenuIcon
                                    icon={sidebarItem.icon}
                                    isActive={activeSubItem !== undefined}
                                />
                            )}
                            <span className="tw-ml-3 tw-text-sm tw-font-medium tw-duration-200">
                                {sidebarItem.label}
                            </span>
                        </div>
                        {/* Expand / Collapse Icon */}
                        <div className="tw-ml-2 tw-flex tw-shrink-0">
                            <svg
                                className={`tw-ml-1 tw-h-3 tw-w-3 tw-shrink-0 tw-fill-current tw-text-slate-400 tw-transition-all ${
                                    isExpanded && 'tw-rotate-180'
                                }`}
                                viewBox="0 0 12 12"
                            >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                        </div>
                    </div>
                </a>
                {/*Sub Items*/}
                <div className="tw-block">
                    <ul
                        className={`tw-mt-1 tw-animate-floatUp tw-pl-9 tw-transition ${
                            !isExpanded && 'tw-hidden'
                        }`}
                    >
                        {sidebarItem.subItems.map((subItem) => (
                            <li
                                key={subItem?.path || subItem?.label}
                                className="tw-mb-1 last:tw-mb-0"
                            >
                                <Link
                                    onClick={subItem.onClick}
                                    href={subItem.path || ''}
                                    className={`tw-block tw-truncate tw-py-2 tw-text-slate-400 tw-transition tw-duration-150 hover:tw-text-slate-200 ${
                                        activeSubItem?.path === subItem?.path &&
                                        '!tw-text-indigo-500'
                                    }`}
                                >
                                    <span className="tw-text-sm tw-font-medium tw-duration-200">
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
                className={`tw-block tw-truncate tw-text-slate-200 tw-transition tw-duration-150 hover:tw-text-white
                ${isPathActive && 'hover:tw-text-slate-200'}`}
                href={sidebarItem?.path || ''}
            >
                <div className="tw-flex tw-items-center tw-py-2">
                    {sidebarItem?.icon && (
                        <SidebarMenuIcon
                            icon={sidebarItem.icon}
                            isActive={isPathActive}
                        />
                    )}
                    <span className="tw-ml-3 tw-text-sm tw-font-medium tw-duration-200">
                        {sidebarItem.label}
                    </span>
                </div>
            </Link>
        </SidebarMenuWrapper>
    );
};

export default SidebarMenu;
