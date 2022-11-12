import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CampaignService } from '../../../services/CampaignService';
import { useAuth } from '../../../context/AuthContext';
import LoadingProgress from '../../../components/Commons/LoadingProgress';
import MainLayout from '../../../components/Layouts/MainLayout';
import { IUser } from '../../../types/user/IUser';
import Sidebar from '../../../components/CampaignDetails/Sidebar';
import MainContent from '../../../components/CampaignDetails/MainContent';
import { PostService } from '../../../services/PostService';

const CampaignDetailsPage: NextPage = () => {
    const { loginUser } = useAuth();
    const queryClient = useQueryClient();
    const campaignService = new CampaignService(loginUser?.accessToken);
    const postService = new PostService(loginUser?.accessToken);
    const router = useRouter();
    const { id: campaignId } = router.query;
    const { data: campaign, isLoading } = useQuery(
        ['campaign', campaignId],
        () => campaignService.getCampaignById(campaignId),
        {
            onError: (error) => {
                console.log(error);
                router.push('/404');
            },
        }
    );
    const { data: campaignPost } = useQuery(['campaignPost', campaignId], () =>
        campaignService.getCampaignPostById(campaignId)
    );
    if (isLoading) {
        return <LoadingProgress />;
    }

    const issuers = campaign?.participations
        ?.filter((p) => p.issuer)
        .map((p) => p.issuer) as IUser[];

    return (
        <MainLayout maxWidth={'tw-max-w-6xl'}>
            <div className="tw-mx-auto tw-flex tw-flex-col lg:tw-flex-row lg:tw-space-x-8 xl:tw-space-x-16">
                {/* Content */}
                <MainContent campaign={campaign} campaignPost={campaignPost} />

                {/* Sidebar */}
                <Sidebar campaign={campaign} issuers={issuers} />
            </div>
        </MainLayout>
    );
};

export default CampaignDetailsPage;
