import React from 'react';
import { IOrganizationCampaign } from '../../types/joins/IOrganizationCampaign';
import { FaBuilding } from 'react-icons/fa';

type Props = {
    organization: IOrganizationCampaign;
};
const OrganizationCard: React.FC<Props> = ({ organization }) => {
    return (
        <div className="tw-w-full tw-transition tw-duration-300 tw-space-x-4 tw-flex tw-items-center tw-p-4 tw-rounded-lg tw-border tw-shadow-sm hover:tw-shadow-md tw-bg-white">
            <div className="tw-p-3.5 tw-rounded-full tw-bg-blue-50 tw-flex tw-items-center tw-justify-center">
                <FaBuilding size={32} className={'tw-fill-blue-500'} />
            </div>
            {/*Org Info*/}
            <div>
                <div
                    className={
                        'tw-text-base tw-text-slate-700 tw-font-bold tw-mb-1'
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
