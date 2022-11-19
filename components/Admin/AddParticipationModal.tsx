import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { Roles } from '../../constants/Roles';
import { ICampaign } from '../../types/campaign/ICampaign';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import { SystemParticipationService } from '../../services/System/System_ParticipationService';
import { SystemUserService } from '../../services/System/System_UserService';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

type Props = {
    campaign: ICampaign | undefined;
    isOpen: boolean;
    onClose: () => void;
};

const AddParticipationModal: React.FC<Props> = ({
    campaign,
    isOpen,
    onClose,
}) => {
    const queryClient = new QueryClient();
    const { loginUser } = useAuth();
    const systemParticipationService = new SystemParticipationService(
        loginUser?.accessToken
    );
    const systemUserService = new SystemUserService(loginUser?.accessToken);
    const [size, setSize] = useState<number>(20);

    const [selectedParticipations, setSelectedParticipations] = useState<
        (string | undefined)[]
    >([]);

    const addParticipationsMutation = useMutation(
        (payload: any) =>
            systemParticipationService.createParticipation$System(payload),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['admin_campaign', campaign?.id]);
                Swal.fire({
                    title: 'Thành công',
                    text: 'Thêm nhà phát hành thành công',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: (error: any) => {
                toast.error(error?.message);
            },
            onSettled: () => {
                onClose();
            },
        }
    );

    const { data: issuers } = useQuery(['admin_issuers', size], () =>
        systemUserService.getUsers$System({
            role: Roles.ISSUER.id,
            size,
        })
    );

    useEffect(() => {
        if (issuers?.data && issuers?.data?.length < issuers?.metadata?.total) {
            setSize(issuers?.metadata?.total);
        }
    }, [issuers]);

    const handleAddParticipation = () => {
        const payload = selectedParticipations.map((participation) => {
            return {
                campaignId: campaign?.id,
                issuerId: participation,
            };
        });

        if (payload.length === 0) {
            toast.error('Vui lòng chọn nhà phát hành');
            return;
        }
        addParticipationsMutation.mutate(payload);
    };
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
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
                            <Dialog.Panel className="w-full max-w-md transform overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Thêm nhà phát hành
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-base text-slate-800">
                                        Chọn một hoặc nhiều nhà phát hành để
                                        thêm vào sự kiện.
                                    </p>
                                </div>
                                <div className="mt-4 mb-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2">
                                    {issuers?.data
                                        ?.filter(
                                            (i) =>
                                                !campaign?.participations
                                                    ?.map((p) => p.issuer)
                                                    ?.map((i) => i?.id)
                                                    .includes(i?.id)
                                        )
                                        ?.map((issuer) => (
                                            <div
                                                className="flex items-center gap-2.5"
                                                key={issuer?.id}
                                            >
                                                <input
                                                    onChange={() =>
                                                        setSelectedParticipations(
                                                            (prev) =>
                                                                prev.includes(
                                                                    issuer?.id
                                                                )
                                                                    ? prev.filter(
                                                                          (i) =>
                                                                              i !==
                                                                              issuer?.id
                                                                      )
                                                                    : [
                                                                          ...prev,
                                                                          issuer?.id,
                                                                      ]
                                                        )
                                                    }
                                                    className={'rounded'}
                                                    id={`checkbox-${issuer?.id}`}
                                                    type={'checkbox'}
                                                />
                                                <label
                                                    className="flex items-center gap-2"
                                                    htmlFor={`checkbox-${issuer?.id}`}
                                                >
                                                    <Image
                                                        src={
                                                            issuer?.imageUrl ||
                                                            DefaultAvatar.src
                                                        }
                                                        alt={issuer?.name || ''}
                                                        width={100}
                                                        height={100}
                                                        className="h-8 w-8 rounded-full"
                                                    />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {issuer?.name}
                                                    </span>
                                                </label>
                                            </div>
                                        ))}
                                </div>

                                <div className="sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        disabled={
                                            addParticipationsMutation.isLoading
                                        }
                                        onClick={handleAddParticipation}
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Thêm
                                    </button>
                                    <button
                                        disabled={
                                            addParticipationsMutation.isLoading
                                        }
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={onClose}
                                    >
                                        Huỷ
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddParticipationModal;
