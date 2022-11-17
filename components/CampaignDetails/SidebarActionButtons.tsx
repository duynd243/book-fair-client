import React, { useEffect } from 'react';
import { IUser } from '../../types/user/IUser';
import SidebarBlockWrapper from './SidebarBlockWrapper';
import { IoCheckmarkDone, IoPersonAdd } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { Roles } from '../../constants/Roles';
import { ICampaign } from '../../types/campaign/ICampaign';
import { CampaignStatuses } from '../../constants/Statuses';

type Props = {
    campaign: ICampaign | undefined;
    issuers: IUser[];
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

    useEffect(() => {
        if (
            campaign?.participations?.some(
                (p) => p?.issuer?.id === loginUser?.userId
            )
        ) {
            console.log('joined');
        } else if (
            loginUser?.role === Roles.ISSUER.id &&
            campaign?.status === CampaignStatuses.NOT_STARTED.id
        ) {
            console.log('join');
        }
    }, []);

    return (
        <SidebarBlockWrapper>
            <div className="space-y-2">
                <button className="flex w-full items-center justify-center gap-2 rounded bg-indigo-500 py-2 text-white hover:bg-indigo-600">
                    <IoPersonAdd size={14} />
                    <span>Yêu cầu tham gia</span>
                </button>
                {/*<button className="flex border items-center justify-center rounded py-2 border-slate-200 hover:border-slate-300 text-slate-600 w-full">*/}
                {/*    <IoHeartCircleOutline size={14} />*/}
                {/*    <span className="ml-2">Favorite</span>*/}
                {/*</button>*/}
            </div>
        </SidebarBlockWrapper>
    );
};

export default SidebarActionButtons;
