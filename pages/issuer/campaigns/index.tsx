import React, { Fragment, useState } from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import { useAuth } from '../../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { IssuerCampaignService } from '../../../services/Issuer/Issuer_CampaignService';
import SearchForm from '../../../components/Admin/SearchForm';
import AdminCampaignCard from '../../../components/Admin/AdminCampaignCard';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import Chip from '../../../components/Admin/Chip';

const IssuerCampaignsPage: NextPage = () => {
    const { loginUser } = useAuth();
    const issuerCampaignService = new IssuerCampaignService(
        loginUser?.accessToken
    );
    const router = useRouter();

    const [page, setPage] = React.useState(1);
    const [otherPage, setOtherPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(200);
    const [selectedStatus, setSelectedStatus] = useState<undefined | number>(
        undefined
    );

    const CampaignTabs = [
        {
            id: 0,
            name: 'Sự kiện của tôi',
        },
        {
            id: 1,
            name: 'Các sự kiện khác',
        },
    ];

    const { data: campaigns, isLoading } = useQuery(
        ['issuer_campaigns', page],
        () =>
            issuerCampaignService.getCampaigns$Issuer({
                page: page,
                size: pageSize,
                sort: 'id desc',
            })
    );

    const { data: otherCampaigns, isLoading: isOtherLoading } = useQuery(
        ['issuer_other_campaigns', otherPage],
        () =>
            issuerCampaignService.getOtherCampaigns$Issuer({
                page: otherPage,
                size: pageSize,
                sort: 'id desc',
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

            <Tab.Group>
                <div className="mb-5">
                    <ul className="flex flex-wrap gap-2">
                        {CampaignTabs.map((tab) => (
                            <Tab
                                as={'div'}
                                className={'focus:outline-none'}
                                key={tab.name}
                            >
                                {({ selected }) => {
                                    if (selected) setSelectedStatus(tab.id);
                                    return (
                                        <Chip active={selected}>
                                            {tab.name}
                                        </Chip>
                                    );
                                }}
                            </Tab>
                        ))}
                    </ul>
                </div>

                <Tab.Panel as={Fragment}>
                    <div className="grid grid-cols-12 gap-6">
                        {isLoading ? (
                            <div>Đang tải...</div>
                        ) : (
                            campaigns?.data?.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className={
                                        'col-span-full sm:col-span-6 xl:col-span-4'
                                    }
                                >
                                    <AdminCampaignCard campaign={campaign} />
                                </div>
                            ))
                        )}
                    </div>
                </Tab.Panel>
                <Tab.Panel as={Fragment}>
                    <div className="grid grid-cols-12 gap-6">
                        {isOtherLoading ? (
                            <div>Đang tải...</div>
                        ) : (
                            otherCampaigns?.data?.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className={
                                        'col-span-full sm:col-span-6 xl:col-span-4'
                                    }
                                >
                                    <AdminCampaignCard campaign={campaign} />
                                </div>
                            ))
                        )}
                    </div>
                </Tab.Panel>
            </Tab.Group>
        </AdminLayout>
    );
};

export default IssuerCampaignsPage;
