import React, { useState } from 'react';
import { NextPage } from 'next';
import { useAuth } from '../../../context/AuthContext';
import { IssuerBookService } from '../../../services/Issuer/Issuer_BookService';
import { useQuery } from '@tanstack/react-query';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import SearchForm from '../../../components/Admin/SearchForm';
import CreateButton from '../../../components/Admin/CreateButton';
import BookTable from '../../../components/Admin/BookTable';

const IssuerBooksPage: NextPage = () => {
    const { loginUser } = useAuth();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const issuerBookService = new IssuerBookService(loginUser?.accessToken);

    const { data: issuerBooks } = useQuery(['issuer_books', page], () =>
        issuerBookService.getBooks$Issuer({
            page: page,
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
                        Kho sách ✨
                    </h1>
                </div>

                {/* Right: Actions */}
                <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
                    {/* Search form */}
                    <SearchForm />
                    {/*/!* Filter button *!/*/}
                    {/*<FilterButton align="right" />*/}
                    {/* Create campaign button */}
                    <CreateButton
                        href={'/issuer/books/create'}
                        label={'Thêm sách'}
                    />
                </div>
            </div>
            {issuerBooks && <BookTable data={issuerBooks} />}
        </AdminLayout>
    );
};

export default IssuerBooksPage;
