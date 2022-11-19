import React from 'react';
import { IUser } from '../../types/user/IUser';
import SidebarBlockWrapper from './SidebarBlockWrapper';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';

type Props = {
    issuers: IUser[];
    maxRows?: number;
};

const SidebarIssuersTable: React.FC<Props> = ({ issuers, maxRows = 10 }) => {
    return (
        <SidebarBlockWrapper>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-1">
                <div className="text-base font-semibold text-slate-800">
                    Nhà phát hành tham gia ({issuers?.length})
                </div>
                {issuers?.length > 0 && issuers?.length > maxRows && (
                    <button className="text-base font-medium text-indigo-500 hover:text-indigo-600 disabled:text-gray-500">
                        Xem tất cả
                    </button>
                )}
            </div>
            {issuers?.length === 0 ? (
                <div className="text-sm text-slate-500">
                    Sự kiện này hiện chưa có nhà phát hành nào tham gia.
                </div>
            ) : (
                <ul className="space-y-3.5">
                    {issuers?.slice(0, maxRows).map((issuer) => (
                        <li key={issuer.id}>
                            <div className="flex justify-between">
                                <div className="flex grow items-center">
                                    <div className="relative mr-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={
                                                issuer?.imageUrl ||
                                                DefaultAvatar.src
                                            }
                                            width="32"
                                            height="32"
                                            alt="User 08"
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            {issuer?.name}
                                        </span>
                                    </div>
                                </div>
                                <button className="rounded-full text-slate-400 hover:text-slate-500">
                                    <span className="sr-only">Menu</span>
                                    <svg
                                        className="h-8 w-8 fill-current"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle cx="16" cy="16" r="2" />
                                        <circle cx="10" cy="16" r="2" />
                                        <circle cx="22" cy="16" r="2" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </SidebarBlockWrapper>
    );
};

export default SidebarIssuersTable;
