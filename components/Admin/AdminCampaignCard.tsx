import React from 'react';
import { ICampaign } from '../../types/campaign/ICampaign';
import AvatarGroup from '../Commons/AvatarGroup/AvatarGroup';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import { IUser } from '../../types/user/IUser';
import StatusLabel from '../CampaignDetails/StatusLabel';
import { getFormattedDate } from '../../utils/helper';
import {
    IoBusiness,
    IoCheckmark,
    IoCodeWorking,
    IoLocation,
    IoPerson,
    IoPersonAdd,
    IoRemove,
} from 'react-icons/io5';
import {
    CampaignStatuses,
    ParticipationStatuses,
} from '../../constants/Statuses';
import { useAuth } from '../../context/AuthContext';
import { Roles } from '../../constants/Roles';
import { IParticipation } from '../../types/participation/IParticipation';

const FeaturedItem: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <li className="tw-flex tw-gap-2 tw-items-center tw-font-medium tw-text-slate-600">
            {children}
        </li>
    );
};

const IssuerActions: React.FC<{
    campaign: ICampaign;
    participationOfIssuer: IParticipation | undefined;
}> = ({ campaign, participationOfIssuer }) => {
    const participationStatus = participationOfIssuer?.status;
    const campaignStatus = campaign?.status;

    console.log('participationStatus', participationStatus);

    const infoButtonClasses =
        'tw-flex tw-items-center tw-gap-1.5 tw-text-slate-600 tw-font-medium tw-text-base tw-px-2.5 tw-py-1 tw-rounded-md tw-bg-slate-100 hover:tw-bg-slate-200';

    return (
        <div className="tw-flex tw-gap-4 tw-justify-end tw-items-center tw-mt-3">
            {(participationStatus ===
                ParticipationStatuses.ISSUER_ACCEPTED.id ||
                participationStatus ===
                    ParticipationStatuses.ISSUER_REJECTED.id) &&
                campaignStatus === CampaignStatuses.STARTING.id && (
                    <button className={infoButtonClasses}>
                        <IoCheckmark />
                        <span>Đang tham gia</span>
                    </button>
                )}
            {(participationStatus ===
                ParticipationStatuses.ISSUER_ACCEPTED.id ||
                participationStatus ===
                    ParticipationStatuses.ISSUER_REJECTED.id) &&
                campaignStatus === CampaignStatuses.FINISHED.id && (
                    <button className={infoButtonClasses}>
                        <IoCheckmark />
                        <span>Đã tham gia</span>
                    </button>
                )}

            {participationStatus ===
                ParticipationStatuses.WAITING_APPROVAL.id &&
                campaignStatus === CampaignStatuses.NOT_STARTED.id && (
                    <button className={infoButtonClasses}>
                        <IoCodeWorking />
                        <span>Đang đợi duyệt</span>
                    </button>
                )}
            {participationStatus ===
                ParticipationStatuses.WAITING_ISSUER_ACCEPT.id &&
                campaignStatus === CampaignStatuses.NOT_STARTED.id && (
                    <>
                        <button
                            className={
                                'm-btn-lg tw-uppercase tw-text-base tw-gap-1.5 tw-bg-indigo-500 hover:tw-bg-indigo-600 tw-text-white'
                            }
                        >
                            <IoCheckmark />
                            <span>Đồng ý</span>
                        </button>
                        <button
                            className={
                                'm-btn-lg tw-uppercase tw-text-base tw-gap-1.5 tw-bg-slate-500 hover:tw-bg-slate-600 tw-text-white'
                            }
                        >
                            <IoRemove />
                            <span>Từ chối</span>
                        </button>
                    </>
                )}
            {!participationStatus &&
                campaignStatus === CampaignStatuses.NOT_STARTED.id && (
                    <button
                        className={
                            'm-btn-lg tw-uppercase tw-text-base tw-gap-1.5 tw-bg-indigo-500 hover:tw-bg-indigo-600 tw-text-white'
                        }
                    >
                        <IoPersonAdd />
                        <span>Yêu cầu tham gia</span>
                    </button>
                )}
        </div>
    );
};

const SystemActions: React.FC<{ campaign: ICampaign }> = ({ campaign }) => {
    return (
        <div className="tw-flex tw-gap-4 tw-justify-end tw-items-center">
            {/*<button className="tw-text-white tw-bg-red-500 tw-rounded tw-py-2 tw-px-4 hover:tw-bg-red-600 tw-transition tw-duration-300 tw-ease-in-out tw-font-medium">*/}
            {/*    Xóa*/}
            {/*</button>*/}
        </div>
    );
};

type Props = {
    campaign: ICampaign;
};
const AdminCampaignCard: React.FC<Props> = ({ campaign }) => {
    const { loginUser } = useAuth();
    const issuers = campaign.participations
        ?.filter((p) => p.issuer)
        .map((p) => p.issuer) as IUser[];
    const participationOfIssuer =
        loginUser?.role === Roles.ISSUER.id
            ? campaign.participations?.find(
                  (p) => p.issuerId === loginUser?.userId
              )
            : undefined;
    console.log('participationOfIssuer', participationOfIssuer);
    return (
        <div className="tw-p-5 tw-flex tw-flex-col  tw-h-full tw-bg-white tw-border tw-shadow-sm tw-rounded">
            {/*Header*/}
            <header className="tw-flex tw-items-center tw-justify-between">
                <StatusLabel statusId={campaign?.status} />
                {issuers && issuers.length > 0 && (
                    <div className="tw-scale-105">
                        <AvatarGroup
                            max={3}
                            avatars={issuers.map((i) => {
                                return {
                                    src: i.imageUrl || DefaultAvatar.src,
                                    title: i?.name,
                                };
                            })}
                        />
                    </div>
                )}
            </header>
            <div className="tw-grow tw-mt-3.5">
                <div className="tw-inline-flex tw-text-slate-800 hover:tw-text-slate-900 tw-mb-1">
                    <h2 className="tw-text-xl tw-leading-snug tw-font-semibold">
                        {campaign?.name}
                    </h2>
                </div>
                <div className="tw-text-sm tw-line-clamp-4">
                    {campaign?.description}
                </div>
            </div>
            <footer className="tw-mt-5">
                <div className="tw-text-sm tw-font-semibold tw-text-indigo-600 tw-mb-2">
                    {getFormattedDate(campaign?.startDate).fullDate}{' '}
                    <span className="text-slate-400">-&gt;</span>{' '}
                    {getFormattedDate(campaign?.endDate).fullDate}
                </div>
                <ul className="tw-mt-4 tw-space-y-2">
                    <FeaturedItem>
                        <IoPerson />
                        <span>
                            NPH đã được duyệt / đồng ý tham gia:{' '}
                            {
                                campaign?.participations?.filter(
                                    (p) =>
                                        p.status ===
                                            ParticipationStatuses
                                                .ISSUER_ACCEPTED.id ||
                                        p.status ===
                                            ParticipationStatuses
                                                .SYSTEM_APPROVED.id
                                )?.length
                            }
                        </span>
                    </FeaturedItem>
                    <FeaturedItem>
                        <IoBusiness />
                        <span>
                            Tổ chức:{' '}
                            {campaign?.organizationCampaigns &&
                            campaign?.organizationCampaigns?.length > 0
                                ? campaign?.organizationCampaigns
                                      ?.map((o) => o?.organization?.name)
                                      .join(', ')
                                : 'Chưa có'}
                        </span>
                    </FeaturedItem>
                    <FeaturedItem>
                        <IoLocation />
                        <span>{campaign?.address}</span>
                    </FeaturedItem>
                </ul>
                {loginUser?.role === Roles.SYSTEM.id && (
                    <SystemActions campaign={campaign} />
                )}
                {loginUser?.role === Roles.ISSUER.id && (
                    <IssuerActions
                        participationOfIssuer={participationOfIssuer}
                        campaign={campaign}
                    />
                )}
            </footer>
        </div>
    );
};

export default AdminCampaignCard;
