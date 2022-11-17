import React, { ChangeEvent, useState } from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SystemOrganizationService } from '../../../services/System/System_OrganizationService';
import { useAuth } from '../../../context/AuthContext';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../utils/firebase/initFirebase';
import { SystemCampaignService } from '../../../services/System/System_CapaignService';
import { useRouter } from 'next/router';

const AdminCreateCampaignPage: NextPage = () => {
    const { loginUser } = useAuth();
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const firebaseUploadPromise = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileName =
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
            // get file extension
            const fileExtension = file.name.split('.').pop();
            const storageRef = ref(
                storage,
                `images/${fileName}.${fileExtension}`
            );
            const task = uploadBytesResumable(storageRef, file);
            task.on(
                'state_changed',
                (snapshot) => {},
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(task.snapshot.ref)
                        .then((url) => {
                            resolve(url);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            );
        });
    };

    const systemOrganizationService = new SystemOrganizationService(
        loginUser?.accessToken
    );
    const systemCampaignService = new SystemCampaignService(
        loginUser?.accessToken
    );

    // const createCampaignMutation = useMutation(
    //     (payload) => systemCampaignService.createCampaign$System(payload),
    //     {
    //         onSuccess: (data) => {
    //             toast.success('Sự kiện đã được tạo thành công');
    //             router.push('/admin/campaigns');
    //         },
    //         onError: (error) => {
    //             toast.error('Có lỗi xảy ra khi tạo sự kiện. Vui lòng thử lại');
    //         },
    //     }
    // );

    const [orgSize, setOrgSize] = useState(6);
    const [selectedOrgIds, setSelectedOrgIds] = useState<number[]>([]);
    const handleCheckOrganization = (
        e: ChangeEvent<HTMLInputElement>,
        id: number | undefined
    ) => {
        if (e.target.checked) {
            id && setSelectedOrgIds([...selectedOrgIds, id]);
        } else {
            setSelectedOrgIds(selectedOrgIds.filter((orgId) => orgId !== id));
        }
    };
    const {
        data: organizations,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isInitialLoading,
    } = useInfiniteQuery(
        ['organizations'],
        ({ pageParam = 1 }) =>
            systemOrganizationService.getOrganizations$System({
                page: pageParam,
                size: orgSize,
            }),
        {
            getNextPageParam: (lastPage) => {
                const currentPage = lastPage?.metadata?.page;
                const totalPages = Math.ceil(
                    lastPage?.metadata?.total / orgSize
                );
                return currentPage < totalPages ? currentPage + 1 : undefined;
            },
        }
    );

    const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // check file type
            if (!file.type.startsWith('image/')) {
                toast.error('Vui lòng tải lên tệp hình ảnh');
                return;
            }
            // check file size
            if (file.size > 1024 * 1024 * 1) {
                toast.error('Kích thước tệp tối đa là 1MB');
                return;
            }
            setCoverPhoto(file);
        }
    };

    const form = useFormik({
        initialValues: {
            campaignName: '',
            campaignDesc: '',
            startDate: '',
            endDate: '',
            address: '',
        },
        validationSchema: Yup.object().shape({
            campaignName: Yup.string().required('Tên sự kiện là bắt buộc'),
            campaignDesc: Yup.string().required('Mô tả là bắt buộc'),
            startDate: Yup.date()
                .required('Ngày bắt đầu là bắt buộc')
                .min(new Date(), 'Ngày bắt đầu phải sau ngày hiện tại'),
            endDate: Yup.date()
                .required('Ngày kết thúc là bắt buộc')
                .min(
                    Yup.ref('startDate'),
                    'Ngày kết thúc không được trước ngày bắt đầu'
                ),
            address: Yup.string().required('Địa chỉ là bắt buộc'),
        }),
        onSubmit: async (values) => {
            if (coverPhoto === null) {
                toast.error('Vui lòng chọn ảnh bìa');
                return;
            }
            let payload = {
                name: values.campaignName,
                address: values.address,
                preDate: new Date().toJSON(),
                startDate: new Date(values.startDate).toJSON(),
                endDate: new Date(values.endDate).toJSON(),
                description: values.campaignDesc,
                imageUrl: '',
                organizationCampaigns: selectedOrgIds.map((id) => {
                    return { organizationId: id };
                }),
            };
            // upload cover photo to firebase
            setIsCreating(true);
            firebaseUploadPromise(coverPhoto)
                .then(async (url) => {
                    payload.imageUrl = url as string;
                    console.log(url);
                    try {
                        await systemCampaignService.createCampaign$System(
                            payload
                        );
                        toast.success('Sự kiện đã được tạo thành công');
                        router.push('/admin/campaigns');
                    } catch (error) {
                        toast.error('Có lỗi xảy ra khi tạo sự kiện');
                        console.log(error);
                    }
                })
                .catch((err) => {
                    toast.error(
                        'Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại'
                    );
                })
                .finally(() => {
                    setIsCreating(false);
                });
        },
    });

    return (
        <AdminLayout>
            <form
                onSubmit={form.handleSubmit}
                className="bg-white p-10 mx-auto max-w-6xl space-y-8 divide-y divide-gray-200"
            >
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Thông tin chung
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                This information will be displayed publicly so
                                be careful what you share.
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="campaignName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tên sự kiện
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.campaignName}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="campaignName"
                                        id="campaignName"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                {form.errors.campaignName &&
                                    form.touched.campaignName && (
                                        <div className={'input-error'}>
                                            {form.errors.campaignName}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="campaignDesc"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Mô tả
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        value={form.values.campaignDesc}
                                        onChange={form.handleChange}
                                        id="campaignDesc"
                                        name="campaignDesc"
                                        rows={3}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    />
                                </div>
                                {form.errors.campaignDesc &&
                                    form.touched.campaignDesc && (
                                        <div className={'input-error'}>
                                            {form.errors.campaignDesc}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Cover photo
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        {coverPhoto ? (
                                            <Image
                                                className={
                                                    'object-cover mb-4 object-center rounded-md'
                                                }
                                                width={500}
                                                height={500}
                                                src={URL.createObjectURL(
                                                    coverPhoto
                                                )}
                                                alt={''}
                                            />
                                        ) : (
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                        <div className="flex text-sm justify-center text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>
                                                    {coverPhoto
                                                        ? 'Chọn ảnh khác'
                                                        : 'Tải ảnh lên'}
                                                </span>
                                                <input
                                                    onChange={(e) =>
                                                        handleCoverPhotoChange(
                                                            e
                                                        )
                                                    }
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 1MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Thời gian và địa điểm
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Use a permanent address where you can receive
                                mail.
                            </p>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="startDate"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ngày bắt đầu
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.startDate}
                                        onChange={form.handleChange}
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                {form.errors.startDate &&
                                    form.touched.startDate && (
                                        <div className={'input-error'}>
                                            {form.errors.startDate}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="endDate"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ngày kết thúc
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.endDate}
                                        onChange={form.handleChange}
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                {form.errors.endDate &&
                                    form.touched.endDate && (
                                        <div className={'input-error'}>
                                            {form.errors.endDate}
                                        </div>
                                    )}
                            </div>
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Địa chỉ
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.address}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="address"
                                        id="address"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                {form.errors.address &&
                                    form.touched.address && (
                                        <div className={'input-error'}>
                                            {form.errors.address}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Tổ chức
                            </h3>
                        </div>
                        <div className="mt-3">
                            {isInitialLoading ? (
                                <div>Đang tải...</div>
                            ) : (
                                organizations &&
                                organizations?.pages.length > 0 && (
                                    <fieldset>
                                        <legend className="text-base font-medium text-gray-900">
                                            Chọn các tổ chức mà sự kiện này
                                            thuộc về
                                        </legend>
                                        <div className="mt-4 grid gap-x-4 gap-y-6 grid-cols-1 sm:grid-cols-12">
                                            {organizations?.pages.map((value) =>
                                                value.data.map(
                                                    (organization) => (
                                                        <div
                                                            key={
                                                                organization?.id
                                                            }
                                                            className="sm:col-span-6 relative flex items-start"
                                                        >
                                                            <div className="flex items-center h-5">
                                                                <input
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleCheckOrganization(
                                                                            e,
                                                                            organization?.id
                                                                        )
                                                                    }
                                                                    id={`organization-${organization?.id}`}
                                                                    name="organizations"
                                                                    type="checkbox"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                />
                                                            </div>
                                                            <div className="ml-3 text-sm">
                                                                <label
                                                                    htmlFor={`organization-${organization?.id}`}
                                                                    className="font-medium text-gray-700"
                                                                >
                                                                    {
                                                                        organization?.name
                                                                    }
                                                                </label>
                                                                <p className="text-gray-500">
                                                                    {
                                                                        organization?.address
                                                                    }{' '}
                                                                    -{' '}
                                                                    {
                                                                        organization?.phoneNumber
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                )
                                            )}
                                        </div>
                                    </fieldset>
                                )
                            )}
                            {hasNextPage && (
                                <button
                                    disabled={isFetchingNextPage}
                                    className={
                                        'bg-slate-900 text-white py-1 px-2.5 rounded mt-4'
                                    }
                                    onClick={() => fetchNextPage()}
                                >
                                    Xem thêm
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            disabled={isCreating}
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Tạo sự kiện
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
};

export default AdminCreateCampaignPage;
