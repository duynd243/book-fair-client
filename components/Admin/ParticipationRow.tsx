import React, { useState } from 'react';
import { IParticipation } from '../../types/participation/IParticipation';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import TableData, { noDataLabel } from './TableData';
import {
    CampaignStatuses,
    getParticipationStatusById,
    ParticipationStatuses,
} from '../../constants/Statuses';
import { ICampaign } from '../../types/campaign/ICampaign';
import AdminParticipationActionModal from './AdminParticipationActionModal';

type Props = {
    campaign: ICampaign | undefined;
    participation: IParticipation | undefined;
};

const StatusLabel = ({ statusId }: { statusId: number | undefined }) => {
    let color = 'bg-slate-200 text-slate-800';

    switch (statusId) {
        case ParticipationStatuses.WAITING_ISSUER_ACCEPT.id:
        case ParticipationStatuses.WAITING_APPROVAL.id:
            color =
                'bg-amber-100 hover:bg-amber-100 text-amber-700 shadow-amber-200';
            break;
        case ParticipationStatuses.ISSUER_ACCEPTED.id:
        case ParticipationStatuses.SYSTEM_APPROVED.id:
            color =
                'bg-emerald-100 hover:bg-emerald-100 text-emerald-700 shadow-emerald-200';
            break;

        case ParticipationStatuses.SYSTEM_REJECTED.id:
        case ParticipationStatuses.ISSUER_REJECTED.id:
        case ParticipationStatuses.INVITATION_CANCELLED.id:
        case ParticipationStatuses.TIMEOUT_INVITATION.id:
            color = 'bg-red-100 hover:bg-red-100 text-red-700 shadow-red-200';
            break;
    }
    return (
        <TableData alignClass={'text-center'}>
            <span className={`${color} rounded py-2 px-3.5 font-medium`}>
                {(statusId || statusId === 0) &&
                    getParticipationStatusById(statusId)?.displayName}
            </span>
        </TableData>
    );
};

const DynamicMenuItems: React.FC<Props> = ({ campaign, participation }) => {
    return <></>;
};
const ParticipationRow: React.FC<Props> = ({ campaign, participation }) => {
    const issuer = participation?.issuer;

    const [isActionModalOpen, setIsActionModalOpen] = useState<boolean>(false);
    return (
        <tr className={'relative'}>
            <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="text-left">{issuer?.code}</div>
            </td>
            <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <div className="flex items-center">
                    <div className="mr-2 h-10 w-10 shrink-0 sm:mr-3">
                        <Image
                            className="rounded-full"
                            src={issuer?.imageUrl || DefaultAvatar.src}
                            width="40"
                            height="40"
                            alt={issuer?.name || ''}
                        />
                    </div>
                    <div className="font-medium text-slate-800">
                        {issuer?.name}
                    </div>
                </div>
            </td>

            <TableData>{issuer?.email}</TableData>
            <TableData alignClass={'text-center'}>
                {issuer?.phoneNumber || noDataLabel}
            </TableData>
            <TableData alignClass={'text-center'}>
                {issuer?.address || noDataLabel}
            </TableData>
            <StatusLabel statusId={participation?.status} />
            <TableData>{participation?.note}</TableData>
            <td className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                <button
                    disabled={
                        campaign?.status === CampaignStatuses.FINISHED.id ||
                        campaign?.status === CampaignStatuses.STARTING.id
                    }
                    onClick={() => setIsActionModalOpen(true)}
                    className="rounded-full text-slate-400 hover:text-slate-500"
                >
                    <span className="sr-only">Menu</span>
                    <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32">
                        <circle cx="16" cy="16" r="2" />
                        <circle cx="10" cy="16" r="2" />
                        <circle cx="22" cy="16" r="2" />
                    </svg>
                </button>
            </td>

            <AdminParticipationActionModal
                campaign={campaign}
                participation={participation}
                isOpen={isActionModalOpen}
                onClose={() => setIsActionModalOpen(false)}
            />
        </tr>
    );
};

export default ParticipationRow;
