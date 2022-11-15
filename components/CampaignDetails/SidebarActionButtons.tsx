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
        <button className="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-indigo-500 tw-py-2 tw-text-white hover:tw-bg-indigo-600">
            <IoPersonAdd size={14} />
            <span>Yêu cầu tham gia</span>
        </button>
    );
};

const AlreadyJoinedButton: React.FC<Props> = ({ campaign, issuers }) => {
    return (
        <button className="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-green-500 tw-py-2 tw-text-white hover:tw-bg-green-600">
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
            <div className="tw-space-y-2">
                <button className="tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 tw-rounded tw-bg-indigo-500 tw-py-2 tw-text-white hover:tw-bg-indigo-600">
                    <IoPersonAdd size={14} />
                    <span>Yêu cầu tham gia</span>
                </button>
                {/*<button className="tw-flex tw-border tw-items-center tw-justify-center tw-rounded tw-py-2 tw-border-slate-200 hover:border-slate-300 text-slate-600 tw-w-full">*/}
                {/*    <IoHeartCircleOutline size={14} />*/}
                {/*    <span className="tw-ml-2">Favorite</span>*/}
                {/*</button>*/}
            </div>
        </SidebarBlockWrapper>
    );
};

export default SidebarActionButtons;
