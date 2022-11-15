import React from 'react';
import { IOrganizationCampaign } from '../../types/joins/IOrganizationCampaign';
import { FaBuilding } from 'react-icons/fa';

type Props = {
    organization: IOrganizationCampaign;
};
const OrganizationCard: React.FC<Props> = ({ organization }) => {
    return (
        <div className="tw-flex tw-w-full tw-items-center tw-space-x-4 tw-rounded-lg tw-border tw-bg-white tw-p-4 tw-shadow-sm tw-transition tw-duration-300 hover:tw-shadow-md">
            <div className="tw-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-blue-50 tw-p-3.5">
                <FaBuilding size={32} className={'tw-fill-blue-500'} />
            </div>
            {/*Org Info*/}
            <div>
                <div
                    className={
                        'tw-mb-1 tw-text-base tw-font-bold tw-text-slate-700'
                    }
                >
                    {organization?.organization?.name}
                </div>
                <div className={'tw-text-sm tw-text-slate-500'}>
                    {organization?.organization?.address} -{' '}
                    {organization?.organization?.phoneNumber}
                </div>
            </div>
        </div>
    );
};

export default OrganizationCard;
