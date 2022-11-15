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
            <div className="tw-mb-8 sm:tw-flex sm:tw-items-center sm:tw-justify-between">
                {/* Left: Title */}
                <div className="tw-mb-4 sm:tw-mb-0">
                    <h1 className="tw-text-2xl tw-font-bold tw-text-slate-800 md:tw-text-3xl">
                        Kho sách ✨
                    </h1>
                </div>

                {/* Right: Actions */}
                <div className="tw-grid tw-grid-flow-col tw-justify-start tw-gap-2 sm:tw-auto-cols-max sm:tw-justify-end">
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
                            className="tw-relative tw-z-10"
                            onClose={() => setIsCreateModalOpen(false)}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="tw-ease-out tw-duration-300"
                                enterFrom="tw-opacity-0"
                                enterTo="tw-opacity-100"
                                leave="tw-ease-in tw-duration-200"
                                leaveFrom="tw-opacity-100"
                                leaveTo="tw-opacity-0"
                            >
                                <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-25" />
                            </Transition.Child>

                            <div className="tw-fixed tw-inset-0 tw-overflow-y-auto">
                                <div className="tw-flex tw-min-h-full tw-items-center tw-justify-center tw-p-4 tw-text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="tw-ease-out tw-duration-300"
                                        enterFrom="tw-opacity-0 tw-scale-95"
                                        enterTo="tw-opacity-100 tw-scale-100"
                                        leave="tw-ease-in tw-duration-200"
                                        leaveFrom="tw-opacity-100 tw-scale-100"
                                        leaveTo="tw-opacity-0 tw-scale-95"
                                    >
                                        <Dialog.Panel className="tw-w-full tw-max-w-md tw-transform tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-p-6 tw-text-left tw-align-middle tw-shadow-xl tw-transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="tw-text-lg tw-font-medium tw-leading-6 tw-text-gray-900"
                                            >
                                                Payment successful
                                            </Dialog.Title>
                                            <div className="tw-mt-2">
                                                <p className="tw-text-sm tw-text-gray-500">
                                                    Your payment has been
                                                    successfully submitted.
                                                    We’ve sent you an email with
                                                    all of the details of your
                                                    order.
                                                </p>
                                            </div>

                                            <div className="tw-mt-4">
                                                <button
                                                    type="button"
                                                    className="tw-inline-flex tw-justify-center tw-rounded-md tw-border tw-border-transparent tw-bg-blue-100 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-blue-900 hover:tw-bg-blue-200 focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-blue-500 focus-visible:tw-ring-offset-2"
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
