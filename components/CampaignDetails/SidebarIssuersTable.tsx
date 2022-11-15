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
            <div className="tw-mb-5 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-1">
                <div className="text-slate-800 tw-text-base tw-font-semibold">
                    Nhà phát hành tham gia ({issuers?.length})
                </div>
                {issuers?.length > 0 && issuers?.length > maxRows && (
                    <button className="tw-text-base tw-font-medium tw-text-indigo-500 hover:tw-text-indigo-600 disabled:tw-text-gray-500">
                        Xem tất cả
                    </button>
                )}
            </div>
            {issuers?.length === 0 ? (
                <div className="tw-text-sm tw-text-slate-500">
                    Sự kiện này hiện chưa có nhà phát hành nào tham gia.
                </div>
            ) : (
                <ul className="tw-space-y-3.5">
                    {issuers?.slice(0, maxRows).map((issuer) => (
                        <li key={issuer.id}>
                            <div className="tw-flex tw-justify-between">
                                <div className="grow tw-flex tw-items-center">
                                    <div className="tw-relative tw-mr-3">
                                        <Image
                                            className="tw-h-8 tw-w-8 tw-rounded-full"
                                            src={
                                                issuer?.imageUrl ||
                                                DefaultAvatar.src
                                            }
                                            width="32"
                                            height="32"
                                            alt="User 08"
                                        />
                                    </div>
                                    <div className="tw-truncate">
                                        <span className="text-slate-800 tw-text-sm tw-font-medium">
                                            {issuer?.name}
                                        </span>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-500 tw-rounded-full">
                                    <span className="tw-sr-only">Menu</span>
                                    <svg
                                        className="tw-h-8 tw-w-8 tw-fill-current"
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
