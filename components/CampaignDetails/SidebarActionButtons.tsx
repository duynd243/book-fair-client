import React, { useEffect } from 'react';
import { IUser } from '../../types/user/IUser';
import SidebarBlockWrapper from './SidebarBlockWrapper';
import {
    IoAdd,
    IoAddCircle,
    IoBan,
    IoCheckmarkDone,
    IoPersonAdd,
} from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { Roles } from '../../constants/Roles';
import { ICampaign } from '../../types/campaign/ICampaign';
import {
    CampaignStatuses,
    ParticipationStatuses,
} from '../../constants/Statuses';
import { IssuerParticipationService } from '../../services/Issuer/Issuer_ParticipationService';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Link from 'next/link';

type Props = {
    campaign: ICampaign | undefined;
    issuers: IUser[];
};

const getIssuerStatus = (campaign: ICampaign | undefined, userId: string) => {
    return (
        campaign?.participations
            ?.map((p) => p.issuer)
            ?.find((i) => i?.id === userId)?.status || undefined
    );
};

const IssuerActionButtons: React.FC<Props> = ({ campaign, issuers }) => {
    const { loginUser } = useAuth();
    const issuerParticipationService = new IssuerParticipationService(
        loginUser?.accessToken
    );
    const queryClient = new QueryClient();

    const acceptInvitationMutation = useMutation(
        (participationId: any) =>
            issuerParticipationService.acceptInvitation$Issuer(participationId),
        {
            onSuccess: () => {
                Swal.fire({
                    title: 'Thành công',
                    text: 'Bạn đã tham gia sự thành công',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                queryClient.invalidateQueries([
                    'issuer_campaign',
                    campaign?.id,
                ]);
            },
            onError: (error: any) => {
                toast.error(error?.message);
            },
            onSettled: () => {
                window.location.reload();
            },
        }
    );

    const declineInvitationMutation = useMutation(
        (participationId: any) =>
            issuerParticipationService.declineInvitation$Issuer(
                participationId
            ),
        {
            onSuccess: () => {
                Swal.fire({
                    title: 'Thành công',
                    text: 'Bạn đã từ chối tham gia sự thành công',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                queryClient.invalidateQueries([
                    'issuer_campaign',
                    campaign?.id,
                ]);
            },
            onError: (error: any) => {
                toast.error(error?.message);
            },
            onSettled: () => {
                window.location.reload();
            },
        }
    );

    const participationOfIssuer =
        loginUser?.role === Roles.ISSUER.id
            ? campaign?.participations?.find(
                  (p) => p?.issuerId === loginUser?.userId
              )
            : undefined;

    const handleAcceptInvitation = () => {
        participationOfIssuer &&
            acceptInvitationMutation.mutate(participationOfIssuer?.id);
    };

    const handleDeclineInvitation = () => {
        participationOfIssuer &&
            declineInvitationMutation.mutate(participationOfIssuer?.id);
    };

    if (
        ((participationOfIssuer &&
            participationOfIssuer?.status ===
                ParticipationStatuses.ISSUER_ACCEPTED.id) ||
            participationOfIssuer?.status ===
                ParticipationStatuses.SYSTEM_APPROVED.id) &&
        campaign?.status === CampaignStatuses.NOT_STARTED.id
    ) {
        return (
            <Link
                href={'/issuer/posts/create?campaignId=' + campaign?.id}
                className="flex w-full items-center justify-center gap-2 rounded bg-indigo-500 py-2 text-white hover:bg-indigo-600"
            >
                <IoAddCircle size={14} />
                <span>Tạo bài đăng</span>
            </Link>
        );
    }

    if (
        ((participationOfIssuer &&
            participationOfIssuer?.status ===
                ParticipationStatuses.ISSUER_ACCEPTED.id) ||
            participationOfIssuer?.status ===
                ParticipationStatuses.SYSTEM_APPROVED.id) &&
        campaign?.status === CampaignStatuses.STARTING.id
    ) {
        return (
            <Link
                href={`/issuer/posts/create?campaignId=${campaign?.id}`}
                className="flex w-full items-center justify-center gap-2 rounded bg-slate-500 py-2 text-white hover:bg-slate-600"
            >
                <IoAddCircle size={14} />
                <span>Tạo bài đăng</span>
            </Link>
        );
    }

    if (
        participationOfIssuer &&
        participationOfIssuer?.status ===
            ParticipationStatuses.WAITING_APPROVAL.id &&
        campaign?.status === CampaignStatuses.NOT_STARTED.id
    ) {
        return <button>Đang đợi duyệt</button>;
    }
    if (
        participationOfIssuer &&
        participationOfIssuer?.status ===
            ParticipationStatuses.WAITING_ISSUER_ACCEPT.id &&
        campaign?.status === CampaignStatuses.NOT_STARTED.id
    ) {
        return (
            <>
                <button
                    disabled={declineInvitationMutation.isLoading}
                    onClick={handleAcceptInvitation}
                    className="flex w-full items-center justify-center gap-2 rounded bg-indigo-500 py-2 text-white hover:bg-indigo-600"
                >
                    <IoCheckmarkDone size={14} />
                    <span>Đồng ý tham gia</span>
                </button>

                <button
                    disabled={declineInvitationMutation.isLoading}
                    onClick={handleDeclineInvitation}
                    className="flex w-full items-center justify-center gap-2 rounded bg-slate-800 py-2 text-white hover:bg-slate-600"
                >
                    <IoBan size={14} />
                    <span>Từ chối</span>
                </button>
            </>
        );
    }
    return <></>;
};

const RequestToJoinButton: React.FC<Props> = ({ campaign, issuers }) => {
    return (
        <button className="flex w-full items-center justify-center gap-2 rounded bg-indigo-500 py-2 text-white hover:bg-indigo-600">
            <IoPersonAdd size={14} />
            <span>Yêu cầu tham gia</span>
        </button>
    );
};

const AlreadyJoinedButton: React.FC<Props> = ({ campaign, issuers }) => {
    return (
        <button className="flex w-full items-center justify-center gap-2 rounded bg-green-500 py-2 text-white hover:bg-green-600">
            <IoCheckmarkDone size={14} />
            <span>Đã tham gia</span>
        </button>
    );
};

const SidebarActionButtons: React.FC<Props> = ({ campaign, issuers }) => {
    const { loginUser } = useAuth();

    return (
        <SidebarBlockWrapper>
            <div className="space-y-2">
                <IssuerActionButtons campaign={campaign} issuers={issuers} />
            </div>
        </SidebarBlockWrapper>
    );
};

export default SidebarActionButtons;
