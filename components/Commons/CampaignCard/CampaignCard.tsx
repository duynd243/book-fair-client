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

type Props = {
    wrapperClassName?: string;
    campaign: ICampaign;
};
const IssuersLabel = ({ issuers }: { issuers: IUser[] }) => {
    let children;
    if (!issuers || issuers.length === 0) {
        children = <span>Chưa có NPH tham gia</span>;
    } else if (issuers.length <= 2) {
        children = (
            <span className="tw-font-semibold">
                {issuers.map((i) => i.name).join(', ')}
            </span>
        );
    } else {
        children = (
            <>
                <span className="tw-font-semibold">{issuers[0].name}</span> và{' '}
                <span className="tw-font-semibold">{issuers.length - 1}</span>{' '}
                NPH khác
            </>
        );
    }
    return (
        <div className="tw-text-right tw-text-sm tw-text-slate-600">
            {children}
        </div>
    );
};

const StatusLabel = ({ statusId }: { statusId?: number }) => {
    let primaryColor = 'tw-bg-green-500';
    let secondaryColor = 'tw-bg-green-400';
    let textColor = 'tw-text-green-800';
    const status = getCampaignStatusById(statusId || 0);

    switch (status.id) {
        case CampaignStatuses.STARTING.id:
            primaryColor = 'tw-bg-green-500';
            secondaryColor = 'tw-bg-green-400';
            textColor = 'tw-text-green-800';
            break;
        case CampaignStatuses.NOT_STARTED.id:
            primaryColor = 'tw-bg-yellow-500';
            secondaryColor = 'tw-bg-yellow-400';
            textColor = 'tw-text-yellow-800';
            break;
        case CampaignStatuses.FINISHED.id:
            primaryColor = 'tw-bg-red-500';
            secondaryColor = 'tw-bg-red-400';
            textColor = 'tw-text-red-800';
            break;
    }

    return (
        <div className="tw-flex tw-items-center tw-gap-2">
            <div className="tw-flex tw-items-center tw-text-sm tw-text-slate-600">
                {/* Icon */}
                <span className="tw-relative tw-mr-2 tw-flex tw-h-3 tw-w-3 tw-items-center tw-justify-center">
                    <span
                        className={`tw-absolute tw-inline-flex tw-h-full tw-w-full tw-animate-ping tw-rounded-full ${secondaryColor} tw-opacity-75`}
                    ></span>
                    <span
                        className={`tw-relative tw-inline-flex tw-h-3 tw-w-3 tw-rounded-full ${primaryColor}`}
                    ></span>
                </span>

                {/* Text */}
                <span className={`tw-font-medium ${textColor}`}>
                    {statusId !== undefined
                        ? getCampaignStatusById(statusId).displayName
                        : 'N/A'}
                </span>
            </div>
        </div>
    );
};

const CampaignCard: React.FC<Props> = ({ wrapperClassName, campaign }) => {
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
        <article
            className={`${wrapperClassName} tw-duration-400 tw-group tw-flex tw-h-full tw-flex-col tw-overflow-hidden tw-rounded-lg tw-border tw-bg-white tw-transition-transform hover:tw-shadow-md`}
        >
            {/* Cover Image */}
            <Link
                className="tw-overflow-hidden"
                title="Click để xem chi tiết"
                href={{
                    pathname: '/campaigns/[slug]/[id]',
                    query: { slug: getSlug(campaign.name), id: campaign.id },
                }}
            >
                <Image
                    className="tw-h-[220px] tw-w-full tw-object-cover tw-object-center tw-transition-transform tw-duration-300 group-hover:tw-scale-105"
                    width={500}
                    height={500}
                    alt=""
                    src={`https://picsum.photos/1920/1080?random={${Math.random()}}`}
                />
            </Link>
            {/* Content */}
            <div className="tw-flex tw-flex-1 tw-flex-col">
                <div className="tw-flex tw-flex-1 tw-space-x-4 tw-rounded-lg tw-px-4 tw-py-4 md:tw-px-5">
                    {/* Left - Date */}
                    <CalendarCard
                        dateStr={campaign?.startDate}
                        title={`Bắt đầu từ ${
                            getFormattedDate(campaign?.startDate).fullDate
                        }`}
                    />
                    {/* Right - Information */}
                    <div className="tw-min-w-0 tw-flex-1">
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
                                className="tw-text-lg tw-font-semibold tw-leading-6 tw-text-slate-800 tw-line-clamp-2 hover:tw-text-indigo-600"
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
                                className="tw-mt-2.5 tw-text-sm tw-text-slate-600 tw-line-clamp-3"
                            >
                                {campaign?.description}
                            </Link>
                        </div>
                        {/* Metadata */}
                        <div className="tw-mt-4 tw-space-y-3">
                            {/* Location */}
                            <div className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-slate-600">
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
                                className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-slate-600"
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
                                className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-slate-600"
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
                <div className="tw-flex tw-items-start tw-justify-between tw-border-t tw-border-slate-100 tw-bg-zinc-50 tw-px-3.5 tw-py-3">
                    {/* Status */}
                    <StatusLabel statusId={campaign.status!} />

                    {/* Issuers */}
                    <div className="tw-flex tw-flex-col tw-items-end tw-gap-2.5">
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
