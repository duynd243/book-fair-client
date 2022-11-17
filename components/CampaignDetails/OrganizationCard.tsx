import React from 'react';
import { IOrganizationCampaign } from '../../types/joins/IOrganizationCampaign';
import { FaBuilding } from 'react-icons/fa';

type Props = {
    organization: IOrganizationCampaign;
};
const OrganizationCard: React.FC<Props> = ({ organization }) => {
    return (
        <div className="flex w-full items-center space-x-4 rounded-lg border bg-white p-4 shadow-sm transition duration-300 hover:shadow-md">
            <div className="flex items-center justify-center rounded-full bg-blue-50 p-3.5">
                <FaBuilding size={32} className={'fill-blue-500'} />
            </div>
            {/*Org Info*/}
            <div>
                <div className={'mb-1 text-base font-bold text-slate-700'}>
                    {organization?.organization?.name}
                </div>
                <div className={'text-sm text-slate-500'}>
                    {organization?.organization?.address} -{' '}
                    {organization?.organization?.phoneNumber}
                </div>
            </div>
        </div>
    );
};

export default OrganizationCard;
