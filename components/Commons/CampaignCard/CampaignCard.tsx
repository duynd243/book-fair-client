import { differenceInCalendarDays } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoBusiness, IoCalendar, IoLocation } from 'react-icons/io5';
import { ICampaign } from 'types/campaign/ICampaign';
import { IOrganizationCampaign } from 'types/joins/IOrganizationCampaign';
import { IUser } from 'types/user/IUser';
import { getFormattedDate, getSlug } from 'utils/helper';
import DefaultAvatar from '../../../assets/images/default_avatar.png';
import AvatarGroup from '../AvatarGroup/AvatarGroup';
import CalendarCard from '../CalendarCard/CalendarCard';
import {
    CampaignStatuses,
    getCampaignStatusById,
} from '../../../constants/Statuses';

const IssuersLabel = ({ issuers }: { issuers: IUser[] }) => {
    let children;
    if (!issuers || issuers.length === 0) {
        children = <span>Chưa có NPH tham gia</span>;
    } else if (issuers.length <= 2) {
        children = (
            <span className="font-semibold">
                {issuers.map((i) => i.name).join(', ')}
            </span>
        );
    } else {
        children = (
            <>
                <span className="font-semibold">{issuers[0].name}</span> và{' '}
                <span className="font-semibold">{issuers.length - 1}</span> NPH
                khác
            </>
        );
    }
    return <div className="text-right text-sm text-slate-600">{children}</div>;
};

const StatusLabel = ({ statusId }: { statusId?: number }) => {
    let primaryColor = 'bg-green-500';
    let secondaryColor = 'bg-green-400';
    let textColor = 'text-green-800';
    const status = getCampaignStatusById(statusId || 0);

    switch (status.id) {
        case CampaignStatuses.STARTING.id:
            primaryColor = 'bg-green-500';
            secondaryColor = 'bg-green-400';
            textColor = 'text-green-800';
            break;
        case CampaignStatuses.NOT_STARTED.id:
            primaryColor = 'bg-yellow-500';
            secondaryColor = 'bg-yellow-400';
            textColor = 'text-yellow-800';
            break;
        case CampaignStatuses.FINISHED.id:
            primaryColor = 'bg-red-500';
            secondaryColor = 'bg-red-400';
            textColor = 'text-red-800';
            break;
    }

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-slate-600">
                {/* Icon */}
                <span className="relative mr-2 flex h-3 w-3 items-center justify-center">
                    <span
                        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${secondaryColor} opacity-75`}
                    ></span>
                    <span
                        className={`relative inline-flex h-3 w-3 rounded-full ${primaryColor}`}
                    ></span>
                </span>

                {/* Text */}
                <span className={`font-medium ${textColor}`}>
                    {statusId !== undefined
                        ? getCampaignStatusById(statusId).displayName
                        : 'N/A'}
                </span>
            </div>
        </div>
    );
};

type Props = {
    campaign: ICampaign;
};
const CampaignCard: React.FC<Props> = ({ campaign }) => {
    const issuers = campaign.participations
        ?.filter((p) => p.issuer)
        .map((p) => p.issuer) as IUser[];

    const getOrganizationsLabel = (
        organizationCampaigns: IOrganizationCampaign[] | undefined
    ): { label: string; title: string } => {
        let result = {
            label: '',
            title: '',
        };

        if (!organizationCampaigns || organizationCampaigns.length === 0) {
            result.label = 'Chưa có tổ chức';
            result.title = result.label;
            return result;
        }

        const all = organizationCampaigns
            .map((org) => org.organization?.name)
            .join(', ');

        if (organizationCampaigns.length <= 3) {
            result.label = all;
            result.title = all;
            return result;
        }
        result.label = `${organizationCampaigns[0].organization?.name}, ${
            organizationCampaigns[1].organization?.name
        } và ${organizationCampaigns.length - 2} tổ chức khác`;
        result.title = all;
        return result;
    };

    return (
        <article className="duration-400 group flex !h-full flex-col overflow-hidden rounded-lg border bg-white transition-transform hover:shadow-md">
            {/* Cover Image */}
            <Link
                className="overflow-hidden"
                title="Click để xem chi tiết"
                href={{
                    pathname: '/campaigns/[slug]/[id]',
                    query: { slug: getSlug(campaign.name), id: campaign.id },
                }}
            >
                <Image
                    className="h-[220px] w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    width={500}
                    height={500}
                    alt=""
                    src={
                        campaign?.imageUrl ||
                        `https://picsum.photos/1920/1080?random={${Math.random()}}`
                    }
                />
            </Link>
            {/* Content */}
            <div className="flex flex-1 flex-col">
                <div className="flex flex-1 space-x-4 rounded-lg px-4 py-4 md:px-5">
                    {/* Left - Date */}
                    <CalendarCard
                        dateStr={campaign?.startDate}
                        title={`Bắt đầu từ ${
                            getFormattedDate(campaign?.startDate).fullDate
                        }`}
                    />
                    {/* Right - Information */}
                    <div className="min-w-0 flex-1">
                        {/* Title */}
                        <div>
                            <Link
                                title={campaign?.name}
                                href={{
                                    pathname: '/campaigns/[slug]/[id]',
                                    query: {
                                        slug: getSlug(campaign.name),
                                        id: campaign.id,
                                    },
                                }}
                                className="text-lg font-semibold leading-6 text-slate-800 line-clamp-2 hover:text-indigo-600"
                            >
                                {campaign?.name}
                            </Link>
                        </div>

                        {/* Description */}
                        <div>
                            <Link
                                title={'Click để xem chi tiết'}
                                href={{
                                    pathname: '/campaigns/[slug]/[id]',
                                    query: {
                                        slug: getSlug(campaign.name),
                                        id: campaign.id,
                                    },
                                }}
                                className="mt-2.5 text-sm text-slate-600 line-clamp-3"
                            >
                                {campaign?.description}
                            </Link>
                        </div>
                        {/* Metadata */}
                        <div className="mt-4 space-y-3">
                            {/* Location */}
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                                <IoLocation />
                                <span>{campaign?.address}</span>
                            </div>
                            {/* Organizations */}
                            <div
                                title={
                                    getOrganizationsLabel(
                                        campaign?.organizationCampaigns
                                    ).title
                                }
                                className="flex items-center gap-1 text-sm text-slate-600"
                            >
                                <IoBusiness />
                                <span>
                                    {
                                        getOrganizationsLabel(
                                            campaign?.organizationCampaigns
                                        ).label
                                    }
                                </span>
                            </div>
                            {/* End Time */}
                            <div
                                title={`Diễn ra trong ${differenceInCalendarDays(
                                    new Date(campaign?.endDate || ''),
                                    new Date(campaign?.startDate || '')
                                )} ngày`}
                                className="flex items-center gap-1 text-sm text-slate-600"
                            >
                                <IoCalendar />
                                <span>
                                    Kết thúc:{' '}
                                    {
                                        getFormattedDate(campaign?.endDate)
                                            .fullDate
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="flex items-start justify-between border-t border-slate-100 bg-zinc-50 px-3.5 py-3">
                    {/* Status */}
                    <StatusLabel statusId={campaign.status!} />

                    {/* Issuers */}
                    <div className="flex flex-col items-end gap-2.5">
                        {issuers && issuers.length > 0 && (
                            <AvatarGroup
                                max={3}
                                avatars={issuers.map((i) => {
                                    return {
                                        src: i.imageUrl || DefaultAvatar.src,
                                        title: i?.name,
                                    };
                                })}
                            />
                        )}
                        <IssuersLabel issuers={issuers} />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CampaignCard;
