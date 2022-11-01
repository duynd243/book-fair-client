import { useQuery, useQueryClient } from '@tanstack/react-query';
import Header from 'components/Commons/Header/Header';
import CampaignSlides from 'components/Home/CampaignSlides';
import { getRoleById } from 'constants/Roles';
import { useAuth } from 'context/AuthContext';
import { GetServerSideProps, NextPage } from 'next';
import { CampaignService } from 'services/CampaignService';
import Banner from '../components/Home/Banner';

const IndexPage: NextPage = () => {
    const { loginUser } = useAuth();

    console.log('loginUser: ', getRoleById(loginUser?.role));
    const campaignService = new CampaignService(loginUser?.accessToken);
    const { data: campaigns } = useQuery(['campaigns'], () =>
        campaignService.getCampaigns()
    );
    const qc = useQueryClient();
    console.log(campaigns);
    return (
        <>
            <Header />
            <div
                className={
                    'tw-mx-auto tw-h-[2000px] tw-max-w-screen-xl tw-px-4 tw-py-4'
                }
            >
                <Banner />

                {/* <div className="tw-my-6 tw-grid tw-gap-4 sm:tw-grid-cols-2 lg:tw-grid-cols-3">
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                </div> */}
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
            </div>
        </>
    );
};

export default IndexPage;
