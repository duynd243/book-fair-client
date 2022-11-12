import React from 'react';
import SidebarIssuersTable from './SidebarIssuersTable';
import { IUser } from '../../types/user/IUser';
import SidebarActionButtons from './SidebarActionButtons';
import { ICampaign } from '../../types/campaign/ICampaign';

type Props = {
    campaign: ICampaign | undefined;
    issuers: IUser[];
};

const Sidebar: React.FC<Props> = ({ campaign, issuers }) => {
    return (
        <div className="">
            <div className="tw-space-y-4 lg:tw-sticky lg:tw-top-20">
                {/* 1st tw-block */}
                <SidebarActionButtons campaign={campaign} issuers={issuers} />
                {/* 2nd tw-block */}
                <SidebarIssuersTable issuers={issuers} />
            </div>
        </div>
    );
};

export default Sidebar;
