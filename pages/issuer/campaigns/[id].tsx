import React from 'react';

import { NextPage } from 'next';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import LoadingProgress from '../../../components/Commons/LoadingProgress';
import { IssuerCampaignService } from '../../../services/Issuer/Issuer_CampaignService';
import MainContent from '../../../components/CampaignDetails/MainContent';
import Sidebar from '../../../components/CampaignDetails/Sidebar';
import { IUser } from '../../../types/user/IUser';

const IssuerCampaignDetailsPage: NextPage = () => {
    const { loginUser } = useAuth();
    const router = useRouter();
    const issuerCampaignService = new IssuerCampaignService(
        loginUser?.accessToken
    );
    const { id: campaignId } = router.query;

    const { data: campaign, isLoading } = useQuery(
        ['issuer_campaign', campaignId],
        () => issuerCampaignService.getCampaignById$Issuer(campaignId)
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

export default IssuerCampaignDetailsPage;
