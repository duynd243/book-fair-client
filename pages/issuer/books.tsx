import React from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../components/Layouts/AdminLayout';
import SearchForm from '../../components/Admin/SearchForm';
import CreateButton from '../../components/Admin/CreateButton';

const IssuerBooksPage: NextPage = () => {
    return (
        <AdminLayout>
            <div className="sm:tw-flex sm:tw-justify-between sm:tw-items-center tw-mb-8">
                {/* Left: Title */}
                <div className="tw-mb-4 sm:tw-mb-0">
                    <h1 className="tw-text-2xl md:tw-text-3xl tw-text-slate-800 tw-font-bold">
                        Kho sách ✨
                    </h1>
                </div>

                {/* Right: Actions */}
                <div className="tw-grid tw-grid-flow-col sm:tw-auto-cols-max tw-justify-start sm:tw-justify-end tw-gap-2">
                    {/* Search form */}
                    <SearchForm />
                    {/*/!* Filter button *!/*/}
                    {/*<FilterButton align="right" />*/}
                    {/* Create campaign button */}
                    <CreateButton label={'Thêm sách'} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default IssuerBooksPage;
