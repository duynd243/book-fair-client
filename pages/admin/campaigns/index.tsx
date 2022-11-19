import AdminLayout from 'components/Layouts/AdminLayout';
import { NextPage } from 'next';
import React, { Fragment, useEffect, useState } from 'react';
import CreateButton from '../../../components/Admin/CreateButton';
import SearchForm from '../../../components/Admin/SearchForm';
import { useAuth } from '../../../context/AuthContext';
import { SystemCampaignService } from '../../../services/System/System_CapaignService';
import { useQuery } from '@tanstack/react-query';
import AdminCampaignCard from '../../../components/Admin/AdminCampaignCard';
import Chip from '../../../components/Admin/Chip';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';

const AdminCampaignsPage: NextPage = () => {
    const { loginUser } = useAuth();
    const systemCampaignService = new SystemCampaignService(
        loginUser?.accessToken
    );
    const router = useRouter();

    const [page, setPage] = React.useState(1);
    const [search, setSearch] = useState<string>('');
    const [pageSize, setPageSize] = React.useState(200);
    const [selectedStatus, setSelectedStatus] = useState<undefined | number>(
        undefined
    );

    useEffect(() => {
        const searchKeyword = router.query.search;
        if (searchKeyword) {
            setSearch(searchKeyword as string);
        }
    }, [router.query.search]);

    const CampaignStatusTabs = [
        {
            id: undefined,
            name: 'Tất cả',
        },
        {
            id: 0,
            name: 'Chưa bắt đầu',
        },
        {
            id: 1,
            name: 'Đang diễn ra',
        },
        {
            id: 2,
            name: 'Đã kết thúc',
        },
    ];

    const { data: campaigns, isLoading } = useQuery(
        ['admin_campaigns', selectedStatus, search, page],
        () =>
            systemCampaignService.getCampaigns$System({
                page: page,
                size: pageSize,
                status: selectedStatus,
                name: search,
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
                    <SearchForm value={search} />
                    <CreateButton
                        href={'/admin/campaigns/create'}
                        label={'Thêm sự kiện'}
                    />
                </div>
            </div>
            <Tab.Group>
                <div className="mb-5">
                    <ul className="flex flex-wrap gap-2">
                        {CampaignStatusTabs.map((tab) => (
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
            </Tab.Group>
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
        </AdminLayout>
    );
};

export default AdminCampaignsPage;
