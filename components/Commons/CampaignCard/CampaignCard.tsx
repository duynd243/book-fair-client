import { format, differenceInCalendarDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import DefaultAvatar from '../../../assets/images/default_avatar.png';
import React from 'react';
import { ICampaign } from 'types/campaign/ICampaign';
import { IoLocation, IoBusiness, IoCalendar } from 'react-icons/io5';
import { IOrganizationCampaign } from 'types/joins/IOrganizationCampaign';
import AvatarGroup from '../AvatarGroup/AvatarGroup';
import { IUser } from 'types/user/IUser';
type Props = {
    wrapperClassName?: string;
    isSlider?: boolean;
    campaign: ICampaign;
    // Slider will have fixed width
};

const CampaignCard: React.FC<Props> = ({
    isSlider,
    wrapperClassName,
    campaign,
}) => {
    const localeFormat = { locale: vi };
    const issuers = campaign.participations
        ?.filter((p) => p.issuer)
        .map((p) => p.issuer) as IUser[];

    const getFormattedDate = (dateStr: string | undefined) => {
        const date = dateStr ? new Date(dateStr) : undefined;
        return {
            dayOfWeek: date ? format(date, 'eeee', localeFormat) : 'N/A',
            day: date ? format(date, 'dd', localeFormat) : 'N/A',
            month: date ? format(date, 'MM', localeFormat) : 'N/A',
            year: date ? format(date, 'yyyy', localeFormat) : 'N/A',
            fullDate: date
                ? format(date, 'eeee, dd/MM/yyyy', localeFormat)
                : 'N/A',
        };
    };

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

    const getIssuersLabel = (issuers: IUser[]): string => {
        if (!issuers || issuers.length === 0) {
            return 'Chưa có người tham gia';
        }
        const all = issuers.map((i) => i.name).join(', ');
        if (issuers.length <= 2) {
            return all;
        }
        return `${issuers[0].name} và ${issuers.length - 1} nhà phát hành khác`;
    };

    const IssuersLabel = ({ issuers }: { issuers: IUser[] }) => {
        let children;
        if (!issuers || issuers.length === 0) {
            children = <span>Chưa có NPH tham gia</span>;
        } else if (issuers.length <= 2) {
            children = <span>{issuers.map((i) => i.name).join(', ')}</span>;
        } else {
            children = (
                <>
                    <span className="tw-font-semibold">{issuers[0].name}</span>{' '}
                    và{' '}
                    <span className="tw-font-semibold">
                        {issuers.length - 1}
                    </span>{' '}
                    nhà phát hành khác
                </>
            );
        }
        return (
            <div className="tw-text-sm tw-text-right tw-text-slate-600">
                {children}
            </div>
        );
    };

    return (
        <article
            className={`${wrapperClassName} tw-flex tw-flex-col tw-h-full tw-overflow-hidden tw-rounded-lg tw-border tw-bg-white tw-transition-all hover:tw-shadow-md`}
        >
            {/* Cover Image */}
            <Link
                title="Click để xem chi tiết"
                href={`/campaigns/${campaign?.id}`}
            >
                <Image
                    className="tw-h-[220px] tw-w-full tw-object-cover tw-object-center"
                    width={1000}
                    height={1000}
                    alt=""
                    src={`https://picsum.photos/1920/1080?random={${Math.random()}}`}
                />
            </Link>
            <div className="tw-flex tw-flex-col tw-flex-1">
                {/* Content */}
                <div className="tw-flex-1 tw-space-x-4 tw-flex tw-px-4 md:tw-px-5 tw-py-4 tw-rounded-lg">
                    {/* Left - Date */}
                    <div
                        title={
                            campaign?.startDate
                                ? `Bắt đầu từ ${
                                      getFormattedDate(campaign?.startDate)
                                          .fullDate
                                  }`
                                : ''
                        }
                        className="tw-flex tw-select-none tw-h-fit tw-min-w-[65px] tw-flex-col tw-items-center  tw-justify-center tw-overflow-hidden tw-rounded tw-bg-slate-50 tw-text-center  tw-text-sm tw-text-slate-600"
                    >
                        {/* Thứ */}
                        <div className="tw-w-full tw-bg-indigo-600 tw-py-1 tw-text-xs tw-font-medium tw-text-white">
                            {getFormattedDate(campaign?.startDate).dayOfWeek}
                        </div>
                        <div>
                            {/* Ngày */}
                            <div className="tw-text-lg tw-font-semibold tw-text-slate-800">
                                {getFormattedDate(campaign?.startDate).day}
                            </div>
                            {/* Tháng */}
                            <div className="tw-mb-2 tw-text-xs tw-uppercase">
                                Thg.{' '}
                                {getFormattedDate(campaign?.startDate).month}
                            </div>
                        </div>
                    </div>
                    {/* Right - Information */}
                    <div className="tw-flex-1 tw-min-w-0">
                        {/* Title */}
                        <div>
                            <Link
                                title={campaign?.name}
                                href={`/campaign/${campaign?.id}`}
                                className="tw-line-clamp-2 tw-text-lg tw-font-medium tw-leading-6 tw-text-slate-800 hover:tw-text-indigo-600"
                            >
                                {campaign?.name}
                            </Link>
                        </div>

                        {/* Description */}
                        <div>
                            <Link
                                title={'Click để xem chi tiết'}
                                href={`/campaign/${campaign?.id}`}
                                className="tw-mt-2.5 tw-line-clamp-3 tw-text-sm tw-text-slate-600"
                            >
                                {campaign?.description}
                            </Link>
                        </div>
                        {/* Metadata */}
                        <div className="tw-mt-4 tw-space-y-3">
                            {/* Location */}
                            <div className="tw-flex tw-gap-1 tw-items-center tw-text-sm tw-text-slate-600">
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
                                className="tw-flex tw-gap-1 tw-items-center tw-text-sm tw-text-slate-600"
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
                                title={`Kéo dài ${differenceInCalendarDays(
                                    new Date(campaign?.endDate || ''),
                                    new Date(campaign?.startDate || '')
                                )} ngày`}
                                className="tw-flex tw-gap-1 tw-items-center tw-text-sm tw-text-slate-600"
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
                <div className="tw-flex tw-items-start tw-justify-between tw-px-3.5 tw-py-3 tw-bg-zinc-50 tw-border-t tw-border-slate-100">
                    {/* Status */}
                    <div className="tw-flex tw-gap-2 tw-items-center">
                        <div className="tw-flex tw-items-center tw-text-sm tw-text-slate-600">
                            {/* Icon */}
                            <span className="tw-flex tw-relative tw-items-center tw-justify-center tw-h-3 tw-w-3 tw-mr-2">
                                <span className="tw-animate-ping tw-absolute tw-inline-flex tw-h-full tw-w-full tw-rounded-full tw-bg-green-400 tw-opacity-75"></span>
                                <span className="tw-relative tw-inline-flex tw-rounded-full tw-h-3 tw-w-3 tw-bg-green-500"></span>
                            </span>

                            {/* Text */}
                            <span>{'Đang diễn ra'}</span>
                        </div>
                    </div>

                    {/* Issuers */}
                    <div className="tw-flex tw-gap-2.5 tw-flex-col tw-items-end">
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
