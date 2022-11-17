import React, { Fragment, useState } from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../components/Layouts/AdminLayout';
import SearchForm from '../../components/Admin/SearchForm';
import CreateButton from '../../components/Admin/CreateButton';
import { useAuth } from '../../context/AuthContext';
import { IssuerBookService } from '../../services/Issuer/Issuer_BookService';
import { useQuery } from '@tanstack/react-query';
import BookTable from '../../components/Admin/BookTable';
import { Dialog, Transition } from '@headlessui/react';

const IssuerBooksPage: NextPage = () => {
    const { loginUser } = useAuth();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const issuerBookService = new IssuerBookService(loginUser?.accessToken);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data: issuerBooks } = useQuery(['issuer_books', page], () =>
        issuerBookService.getBooks$Issuer({
            page: page,
            size: 12,
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
                        onClick={() => setIsCreateModalOpen(true)}
                        label={'Thêm sách'}
                    />
                    <Transition appear show={isCreateModalOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="relative z-10"
                            onClose={() => setIsCreateModalOpen(false)}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Payment successful
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Your payment has been
                                                    successfully submitted.
                                                    We’ve sent you an email with
                                                    all of the details of your
                                                    order.
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={() =>
                                                        setIsCreateModalOpen(
                                                            false
                                                        )
                                                    }
                                                >
                                                    Got it, thanks!
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
            {issuerBooks && <BookTable data={issuerBooks} />}
        </AdminLayout>
    );
};

export default IssuerBooksPage;
