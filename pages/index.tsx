import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from 'components/Commons/Header/Header';
import CampaignSlides from 'components/Home/CampaignSlides';
import { getRoleById } from 'constants/Roles';
import { useAuth } from 'context/AuthContext';
import { GetServerSideProps, NextPage } from 'next';
import { CampaignService } from 'services/CampaignService';
import Banner from '../components/Home/Banner';
import MainLayout from '../components/Layouts/MainLayout';

const IndexPage: NextPage = () => {
    const { loginUser } = useAuth();

    console.log('loginUser: ', getRoleById(loginUser?.role));
    const campaignService = new CampaignService(loginUser?.accessToken);
    const { data: campaigns } = useQuery(['campaigns'], () =>
        campaignService.getCampaigns()
    );
    console.log(campaigns);
    return (
        <MainLayout>
            {campaigns && campaigns?.data?.length > 0 && (
                <CampaignSlides
                    label="Sự kiện đang diễn ra"
                    campaigns={campaigns?.data}
                />
            )}

            {campaigns && campaigns?.data?.length > 0 && (
                <CampaignSlides
                    label="Sự kiện sắp diễn ra"
                    campaigns={campaigns?.data}
                />
            )}
        </MainLayout>
    );
};

export default IndexPage;
