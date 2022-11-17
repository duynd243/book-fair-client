import React from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../components/Layouts/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { IssuerCampaignService } from '../../services/Issuer/Issuer_CampaignService';
import SearchForm from '../../components/Admin/SearchForm';
import AdminCampaignCard from '../../components/Admin/AdminCampaignCard';

const IssuerCampaignsPage: NextPage = () => {
    const { loginUser } = useAuth();
    const issuerCampaignService = new IssuerCampaignService(
        loginUser?.accessToken
    );

    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(20);

    const { data: campaigns } = useQuery(['issuer_campaigns', page], () =>
        issuerCampaignService.getCampaigns$Issuer({
            page: page,
            size: pageSize,
        })
    );
    return (
        <AdminLayout>
            <div className="mb-8 sm:flex sm:items-center sm:justify-between">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                        Sự kiện ✨
                    </h1>
                </div>

                {/* Right: Actions */}
                <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
                    {/* Search form */}
                    <SearchForm />
                    {/*/!* Filter button *!/*/}
                    {/*<FilterButton align="right" />*/}
                    {/* Create campaign button */}
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                {campaigns?.data?.map((campaign) => (
                    <div
                        key={campaign.id}
                        className={'col-span-full sm:col-span-6 xl:col-span-4'}
                    >
                        <AdminCampaignCard campaign={campaign} />
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default IssuerCampaignsPage;
