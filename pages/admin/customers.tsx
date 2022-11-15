import AdminLayout from 'components/Layouts/AdminLayout';
import { NextPage } from 'next';
import React from 'react';
import SearchForm from '../../components/Admin/SearchForm';
import { useAuth } from '../../context/AuthContext';
import { SystemUserService } from '../../services/System/System_UserService';
import { useQuery } from '@tanstack/react-query';
import { Roles } from '../../constants/Roles';
import CustomerTable from '../../components/Admin/CustomerTable';

const AdminUsersPage: NextPage = () => {
    const { loginUser } = useAuth();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(20);
    const systemUserService = new SystemUserService(loginUser?.accessToken);
    const { data: customers } = useQuery(['admin_customers', page], () =>
        systemUserService.getUsers$System({
            role: Roles.CUSTOMER.id,
            page: page,
            size: pageSize,
        })
    );
    return (
        <AdminLayout>
            <div className="tw-mb-8 sm:tw-flex sm:tw-items-center sm:tw-justify-between">
                {/* Left: Title */}
                <div className="tw-mb-4 sm:tw-mb-0">
                    <h1 className="tw-text-2xl tw-font-bold tw-text-slate-800 md:tw-text-3xl">
                        Khách hàng ✨
                    </h1>
                </div>

                {/* Right: Actions */}
                <div className="tw-grid tw-grid-flow-col tw-justify-start tw-gap-2 sm:tw-auto-cols-max sm:tw-justify-end">
                    {/* Search form */}
                    <SearchForm />
                    {/*/!* Filter button *!/*/}
                    {/*<FilterButton align="right" />*/}
                    {/* Create campaign button */}
                </div>
            </div>
            {customers && <CustomerTable data={customers} />}
        </AdminLayout>
    );
};

export default AdminUsersPage;
