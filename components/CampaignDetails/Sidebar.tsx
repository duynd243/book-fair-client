import React from 'react';
import SidebarIssuersTable from './SidebarIssuersTable';
import { IUser } from '../../types/user/IUser';
import SidebarActionButtons from './SidebarActionButtons';
import { ICampaign } from '../../types/campaign/ICampaign';
import { useAuth } from '../../context/AuthContext';
import { Roles } from '../../constants/Roles';

type Props = {
    campaign: ICampaign | undefined;
    issuers: IUser[];
};

const Sidebar: React.FC<Props> = ({ campaign, issuers }) => {
    const { loginUser } = useAuth();
    return (
        <div>
            <div className="space-y-4 lg:sticky lg:top-20">
                {/* 1st block */}
                {loginUser && loginUser?.role === Roles.ISSUER.id && (
                    <SidebarActionButtons
                        campaign={campaign}
                        issuers={issuers}
                    />
                )}
                {/* 2nd block */}
                <SidebarIssuersTable issuers={issuers} />
            </div>
        </div>
    );
};

export default Sidebar;
