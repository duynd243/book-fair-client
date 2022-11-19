import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { ICampaign } from '../../types/campaign/ICampaign';
import { IParticipation } from '../../types/participation/IParticipation';
import {
    CampaignStatuses,
    ParticipationStatuses,
} from '../../constants/Statuses';
import { useAuth } from '../../context/AuthContext';
import { SystemParticipationService } from '../../services/System/System_ParticipationService';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    campaign: ICampaign | undefined;
    participation: IParticipation | undefined;
};

const AdminParticipationActionModal: React.FC<Props> = ({
    isOpen,
    onClose,
    campaign,
    participation,
}) => {
    const { loginUser } = useAuth();
    const queryClient = new QueryClient();

    const invalidateQuery = () => {
        queryClient.invalidateQueries({
            queryKey: ['admin_campaign', campaign?.id],
        });
    };

    const systemParticipationService = new SystemParticipationService(
        loginUser?.accessToken
    );
    const rejectMutation = useMutation(
        (participationId: number) =>
            systemParticipationService.rejectRequest$System(participationId),
        {
            onSuccess: () => {
                toast.success('Yêu cầu đã được từ chối');
                invalidateQuery();
            },
            onError: (error: any) => {
                toast.error(error?.message);
            },
            onSettled: () => {
                onClose();
            },
        }
    );

    const approveMutation = useMutation(
        (participationId: number) =>
            systemParticipationService.approveRequest$System(participationId),
        {
            onSuccess: () => {
                toast.success('Yêu cầu đã được chấp nhận');
                invalidateQuery();
            },
            onError: (error: any) => {
                toast.error(error?.message);
            },
            onSettled: () => {
                onClose();
            },
        }
    );

    const cancelInvitationMutation = useMutation(
        (participationId: number) =>
            systemParticipationService.cancelInvitation$System(participationId),
        {
            onSuccess: () => {
                toast.success('Lời mời đã được hủy');
                invalidateQuery();
            },
            onError: (error: any) => {
                toast.error(error?.message);
            },
            onSettled: () => {
                onClose();
            },
        }
    );

    const handleReject = () => {
        participation?.id && rejectMutation.mutate(participation?.id);
    };

    const handleApprove = () => {
        participation?.id && approveMutation.mutate(participation?.id);
    };

    const handleCancelInvitation = () => {
        participation?.id && cancelInvitationMutation.mutate(participation?.id);
    };

    function getData() {
        if (
            campaign?.status === CampaignStatuses.NOT_STARTED.id &&
            participation?.status === ParticipationStatuses.WAITING_APPROVAL.id
        ) {
            return {
                title: 'Xét duyệt yêu cầu tham gia',
                description: `Bạn có chắc chắn muốn xét duyệt yêu cầu tham gia của ${participation?.issuer?.name}? Sau khi xét duyệt, ${participation?.issuer?.name} có thể đăng bài bán sách tại sự kiện này.`,
                action1: (
                    <button
                        disabled={
                            rejectMutation.isLoading ||
                            approveMutation.isLoading
                        }
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleApprove}
                    >
                        Xét duyệt
                    </button>
                ),
                action2: (
                    <button
                        disabled={
                            rejectMutation.isLoading ||
                            approveMutation.isLoading
                        }
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={handleReject}
                    >
                        Từ chối
                    </button>
                ),
            };
        }

        if (
            campaign?.status === CampaignStatuses.NOT_STARTED.id &&
            participation?.status ===
                ParticipationStatuses.WAITING_ISSUER_ACCEPT.id
        ) {
            return {
                title: 'Huỷ lời mời đã gửi',
                description:
                    'Bạn có chắc chắn muốn huỷ lời mời đã gửi cho nhà phát hành này?',
                action1: (
                    <button
                        disabled={cancelInvitationMutation.isLoading}
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleCancelInvitation}
                    >
                        Huỷ lời mời
                    </button>
                ),
                action2: (
                    <button
                        disabled={cancelInvitationMutation.isLoading}
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        Huỷ
                    </button>
                ),
            };
        }
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={onClose}
            >
                <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:h-screen sm:align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                <button
                                    type="button"
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    onClick={onClose}
                                >
                                    <span className="sr-only">Close</span>
                                    <IoClose
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {getData()?.title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {getData()?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                {getData()?.action1}
                                {getData()?.action2}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default AdminParticipationActionModal;
