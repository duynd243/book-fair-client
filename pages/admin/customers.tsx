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
            <div className="mb-8 sm:flex sm:items-center sm:justify-between">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                        Khách hàng ✨
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
            {customers && <CustomerTable data={customers} />}
        </AdminLayout>
    );
};

export default AdminUsersPage;
