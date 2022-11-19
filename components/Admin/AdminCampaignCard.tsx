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
import Link from 'next/link';
import { useRouter } from 'next/router';

const FeaturedItem: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <li className="flex items-center gap-2 font-medium text-slate-600">
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
        'flex items-center gap-1.5 text-slate-600 font-medium text-base px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200';

    return (
        <div className="mt-3 flex items-center justify-end gap-4">
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
                                'm-btn-lg gap-1.5 bg-indigo-500 text-base uppercase text-white hover:bg-indigo-600'
                            }
                        >
                            <IoCheckmark />
                            <span>Đồng ý</span>
                        </button>
                        <button
                            className={
                                'm-btn-lg gap-1.5 bg-slate-500 text-base uppercase text-white hover:bg-slate-600'
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
                            'm-btn-lg gap-1.5 bg-indigo-500 text-base uppercase text-white hover:bg-indigo-600'
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
        <div className="flex items-center justify-end gap-4">
            {/*<button className="text-white bg-red-500 rounded py-2 px-4 hover:bg-red-600 transition duration-300 ease-in-out font-medium">*/}
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
    const router = useRouter();
    const issuers = campaign.participations
        ?.filter((p) => p.issuer)
        .map((p) => p.issuer) as IUser[];
    const participationOfIssuer =
        loginUser?.role === Roles.ISSUER.id
            ? campaign.participations?.find(
                  (p) => p.issuerId === loginUser?.userId
              )
            : undefined;
    return (
        <div className="flex h-full flex-col  rounded border bg-white p-5 shadow-sm">
            {/*Header*/}
            <header className="flex items-center justify-between">
                <StatusLabel statusId={campaign?.status} />
                {issuers && issuers.length > 0 && (
                    <div className="scale-105">
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
            <div className="mt-3.5 grow">
                <Link
                    href={{
                        pathname: `${router.pathname}/[campaignId]`,
                        query: { campaignId: campaign.id },
                    }}
                    className="mb-1 inline-flex text-slate-800 hover:text-slate-900"
                >
                    <h2 className="text-xl font-semibold leading-snug">
                        {campaign?.name}
                    </h2>
                </Link>
                <div className="text-sm line-clamp-4">
                    {campaign?.description}
                </div>
            </div>
            <footer className="mt-5">
                <div className="mb-2 text-sm font-semibold text-indigo-600">
                    {getFormattedDate(campaign?.startDate).fullDate}{' '}
                    <span className="text-slate-400">-&gt;</span>{' '}
                    {getFormattedDate(campaign?.endDate).fullDate}
                </div>
                <ul className="mt-4 space-y-2">
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
                {/*{loginUser?.role === Roles.SYSTEM.id && (*/}
                {/*    <SystemActions campaign={campaign} />*/}
                {/*)}*/}
                {/*{loginUser?.role === Roles.ISSUER.id && (*/}
                {/*    <IssuerActions*/}
                {/*        participationOfIssuer={participationOfIssuer}*/}
                {/*        campaign={campaign}*/}
                {/*    />*/}
                {/*)}*/}
            </footer>
        </div>
    );
};

export default AdminCampaignCard;
