import React from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import { SystemCampaignService } from '../../../services/System/System_CapaignService';
import { useQuery } from '@tanstack/react-query';
import LoadingProgress from '../../../components/Commons/LoadingProgress';
import MainContent from '../../../components/CampaignDetails/MainContent';
import Sidebar from '../../../components/CampaignDetails/Sidebar';
import { IUser } from '../../../types/user/IUser';

const AdminCampaignDetailsPage: NextPage = () => {
    const { loginUser } = useAuth();
    const systemCampaignService = new SystemCampaignService(
        loginUser?.accessToken
    );
    const router = useRouter();
    const { id: campaignId } = router.query;

    const { data: campaign, isLoading } = useQuery(
        ['admin_campaign', campaignId],
        () => systemCampaignService.getCampaignById$System(campaignId)
    );
    if (isLoading) {
        return <LoadingProgress />;
    }
    const issuers = campaign?.participations
        ?.filter((p) => p.issuer)
        .map((p) => p.issuer) as IUser[];

    return (
        <AdminLayout>
            <div className="mx-auto flex max-w-5xl flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
                {campaign && (
                    <>
                        {/* Content */}
                        <MainContent campaign={campaign} />

                        {/* Sidebar */}
                        <Sidebar campaign={campaign} issuers={issuers} />
                    </>
                )}
            </div>
        </AdminLayout>
    );
};
1;
export default AdminCampaignDetailsPage;
