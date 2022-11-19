import React from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../context/AuthContext';
import { IssuerBookService } from '../../../services/Issuer/Issuer_BookService';
import { IssuerPostService } from '../../../services/Issuer/Issuer_PostService';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { getFormattedPrice } from '../../../utils/helper';
import { toast } from 'react-toastify';

const IssuerCreatePostPage: NextPage = () => {
    const { loginUser } = useAuth();
    const router = useRouter();
    //get query params
    const { campaignId } = router.query;

    const bookService = new IssuerBookService(loginUser?.accessToken);
    const postService = new IssuerPostService(loginUser?.accessToken);
    const [selectedBookId, setSelectedBookId] = React.useState<any>(null);

    const { data: books, isLoading } = useQuery(['issuer_books'], () =>
        bookService.getBooks$Issuer({
            size: 1000,
        })
    );

    const createPostMutation = useMutation(
        (data: any) => postService.createPost$Issuer(data),
        {
            onSuccess: () => {
                toast.success('Tạo bài viết thành công');
                router.push(`/issuer/campaigns/${campaignId}`);
            },
            onError: (error: any) => {
                toast.error(error?.message);
            },
        }
    );

    const form = useFormik({
        initialValues: {
            campaignId: campaignId,
            name: '',
            description: '',
            saleQuantity: 0,
            discount: 0,
            coverPrice: 0,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Vui lòng nhập tên bài viết'),
            description: Yup.string().required('Vui lòng nhập mô tả'),
            saleQuantity: Yup.number()
                .required('Vui lòng nhập số lượng')
                .min(1, 'Số lượng phải lớn hơn 0')
                .integer('Số lượng phải là số nguyên'),
            discount: Yup.number()
                .min(0, 'Giảm giá phải lớn hơn 0')
                .max(100, 'Giảm giá phải nhỏ hơn 100'),
            coverPrice: Yup.number()
                .required('Vui lòng nhập giá bìa')
                .min(1, 'Giá bìa phải lớn hơn 0'),
        }),
        onSubmit: async (values) => {
            if (!selectedBookId) {
                toast.error('Vui lòng chọn sách');
                return;
            }
            let payload = {
                campaignId: values.campaignId,
                name: values.name,
                description: values.description,
                campaignBooks: [
                    {
                        bookId: selectedBookId,
                        saleQuantity: values.saleQuantity,
                        discount: values.discount,
                        coverPrice: values.coverPrice,
                    },
                ],
            };
            createPostMutation.mutate(payload);
        },
    });
    return (
        <AdminLayout>
            <form
                onSubmit={form.handleSubmit}
                className="mx-auto max-w-6xl space-y-8 divide-y divide-gray-200 bg-white p-10"
            >
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Thông tin chung
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Thông tin cơ bản về bài viết
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tiêu đề
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.name}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.name && form.touched.name && (
                                    <div className={'input-error'}>
                                        {form.errors.name}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Mô tả
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        value={form.values.description}
                                        onChange={form.handleChange}
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.description &&
                                    form.touched.description && (
                                        <div className={'input-error'}>
                                            {form.errors.description}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 ">
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="saleQuantity"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Số lượng bán
                            </label>
                            <div className="mt-1">
                                <input
                                    value={form.values.saleQuantity}
                                    onChange={form.handleChange}
                                    type="number"
                                    name="saleQuantity"
                                    id="saleQuantity"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            {form.errors.saleQuantity &&
                                form.touched.saleQuantity && (
                                    <div className={'input-error'}>
                                        {form.errors.saleQuantity}
                                    </div>
                                )}
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="discount"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Giảm gía (%)
                            </label>
                            <div className="mt-1">
                                <input
                                    value={form.values.discount}
                                    onChange={form.handleChange}
                                    type="number"
                                    name="discount"
                                    id="discount"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            {form.errors.discount && form.touched.discount && (
                                <div className={'input-error'}>
                                    {form.errors.discount}
                                </div>
                            )}
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="coverPrice"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Giá bìa
                            </label>
                            <div className="mt-1">
                                <input
                                    value={form.values.coverPrice}
                                    onChange={form.handleChange}
                                    type="number"
                                    name="coverPrice"
                                    id="coverPrice"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            {form.errors.coverPrice &&
                                form.touched.coverPrice && (
                                    <div className={'input-error'}>
                                        {form.errors.coverPrice}
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <div className="space-y-8 divide-y divide-gray-200 pt-8">
                    <div>
                        <div>
                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Chọn sách cho bài viết
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Sách được chọn sẽ được hiển thị trong bài viết
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            {isLoading ? (
                                <div>Đang tải...</div>
                            ) : (
                                books?.data?.map((book) => (
                                    <div
                                        key={book?.id}
                                        className={'flex sm:col-span-3'}
                                    >
                                        <Image
                                            width={200}
                                            height={300}
                                            src={book?.imageUrl || ''}
                                            alt={''}
                                        />
                                        <div>
                                            <h1
                                                className={
                                                    'text-lg font-medium text-gray-900'
                                                }
                                            >
                                                {book?.name}
                                            </h1>
                                            <p
                                                className={
                                                    'text-sm text-gray-500'
                                                }
                                            >
                                                {book?.price &&
                                                    getFormattedPrice(
                                                        book?.price
                                                    )}
                                            </p>
                                            <input
                                                onChange={(e) => {
                                                    // set state
                                                    setSelectedBookId(book?.id);
                                                }}
                                                checked={
                                                    selectedBookId === book?.id
                                                }
                                                className={'mt-2 rounded'}
                                                type="checkbox"
                                                name="books"
                                                value={book?.id}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Tạo bài viết
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
};

export default IssuerCreatePostPage;
