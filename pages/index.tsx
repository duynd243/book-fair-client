import { useQuery } from '@tanstack/react-query';
import CampaignSlides from 'components/Home/CampaignSlides';
import { useAuth } from 'context/AuthContext';
import { NextPage } from 'next';
import { CampaignService } from 'services/CampaignService';
import Banner from '../components/Home/Banner';
import MainLayout from '../components/Layouts/MainLayout';
import { CampaignStatuses } from '../constants/Statuses';

const IndexPage: NextPage = () => {
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
        </MainLayout>
    );
};

export default IndexPage;
