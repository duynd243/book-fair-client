import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import CampaignSlides from 'components/Home/CampaignSlides';
import { useAuth } from 'context/AuthContext';
import { NextPage } from 'next';
import { CampaignService } from 'services/CampaignService';
import Banner from '../components/Home/Banner';
import MainLayout from '../components/Layouts/MainLayout';
import { CampaignStatuses } from '../constants/Statuses';
import { useEffect, useState } from 'react';
import { Roles } from '../constants/Roles';
import { IOrganizationResponse } from '../types/response/IOrganizationResponse';
import { ICampaign } from '../types/campaign/ICampaign';

const IndexPage: NextPage = () => {
    const [userOrganizations, setUserOrganizations] = useState<number[]>([]);
    const queryClient = useQueryClient();
    const { loginUser } = useAuth();
    const size = 8;
    const campaignService = new CampaignService(loginUser?.accessToken);

    const { data: startingCampaigns } = useQuery(['starting'], () =>
        campaignService.getCampaigns({
            size,
            status: CampaignStatuses.STARTING.id,
        })
    );
    const { data: notStartedCampaigns } = useQuery(['not_started'], () =>
        campaignService.getCampaigns({
            size,
            status: CampaignStatuses.NOT_STARTED.id,
        })
    );

    useEffect(() => {
        if (
            loginUser?.role === Roles.CUSTOMER.id &&
            loginUser?.organizations &&
            loginUser?.organizations.length > 0
        ) {
            setUserOrganizations(loginUser?.organizations);
        } else {
            setUserOrganizations([]);
        }
    }, [loginUser?.role, loginUser?.organizations]);

    useQueries({
        queries: userOrganizations.map((orgId) => ({
            queryKey: ['campaign_org', orgId],
            queryFn: () => campaignService.getCampaignsByOrganizationId(orgId),
        })),
    });
    const getOrgCampaigns = (organizationId: number) => {
        return queryClient.getQueryData<IOrganizationResponse>([
            'campaign_org',
            organizationId,
        ]);
    };

    return (
        <MainLayout>
            <Banner />
            {startingCampaigns && startingCampaigns?.data?.length > 0 && (
                <CampaignSlides
                    label="Sự kiện đang diễn ra"
                    campaigns={startingCampaigns?.data}
                />
            )}

            {notStartedCampaigns && notStartedCampaigns?.data?.length > 0 && (
                <CampaignSlides
                    label="Sự kiện sắp diễn ra"
                    campaigns={notStartedCampaigns?.data}
                />
            )}
            {userOrganizations?.length > 0 &&
                userOrganizations?.map((organizationId) => (
                    <div key={organizationId}>
                        {getOrgCampaigns(organizationId)?.campaigns && (
                            <CampaignSlides
                                label={`Vì bạn thuộc tổ chức ${
                                    getOrgCampaigns(organizationId)?.name
                                }`}
                                campaigns={
                                    getOrgCampaigns(organizationId)
                                        ?.campaigns as ICampaign[]
                                }
                            />
                        )}
                    </div>
                ))}
        </MainLayout>
    );
};
export default IndexPage;
