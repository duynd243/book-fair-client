import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { CampaignService } from '../../../services/CampaignService';
import { useAuth } from '../../../context/AuthContext';
import LoadingProgress from '../../../components/Commons/LoadingProgress';
import MainLayout from '../../../components/Layouts/MainLayout';
import { IUser } from '../../../types/user/IUser';
import Sidebar from '../../../components/CampaignDetails/Sidebar';
import MainContent from '../../../components/CampaignDetails/MainContent';

const CampaignDetailsPage: NextPage = () => {
    const { loginUser } = useAuth();
    const campaignService = new CampaignService(loginUser?.accessToken);
    const router = useRouter();
    const { id: campaignId } = router.query;
    const { data: campaign, isLoading } = useQuery(
        ['campaign', campaignId],
        () => campaignService.getCampaignById(campaignId),
        {
            retry: false,
            onError: (error) => {
                router.push('/404');
            },
        }
    );
    if (isLoading) {
        return <LoadingProgress />;
    }

    const issuers = campaign?.participations
        ?.filter((p) => p.issuer)
        .map((p) => p.issuer) as IUser[];

    return (
        <MainLayout maxWidth={'max-w-6xl'}>
            <div className="mx-auto flex flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
                {campaign && (
                    <>
                        {/* Content */}
                        <MainContent campaign={campaign} />

                        {/* Sidebar */}
                        <Sidebar campaign={campaign} issuers={issuers} />
                    </>
                )}
            </div>
        </MainLayout>
    );
};

export default CampaignDetailsPage;
