import React, { useState } from 'react';
import { NextPage } from 'next';
import AdminLayout from '../../../components/Layouts/AdminLayout';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../utils/firebase/initFirebase';
import { useRouter } from 'next/router';
import { PublisherService } from '../../../services/PublisherService';
import { useAuth } from '../../../context/AuthContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthorService } from '../../../services/AuthorService';
import { CategoryService } from '../../../services/CategoryService';
import { IssuerBookService } from '../../../services/Issuer/Issuer_BookService';

const IssuerCreateBookPage: NextPage = () => {
    const { loginUser } = useAuth();
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null);

    const [selectedPublisherId, setSelectedPublisherId] = useState<
        string | null
    >(null);
    const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(
        null
    );

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null
    );

    const publisherService = new PublisherService(loginUser?.accessToken);
    const authorService = new AuthorService(loginUser?.accessToken);
    const categoryService = new CategoryService(loginUser?.accessToken);
    const bookService = new IssuerBookService(loginUser?.accessToken);

    const { data: publishers } = useQuery(['publisher'], () =>
        publisherService.getPublishers({
            size: 1000,
        })
    );
    const { data: authors } = useQuery(['authors'], () =>
        authorService.getAuthors({
            size: 1000,
        })
    );

    const { data: categories } = useQuery(['categories'], () =>
        categoryService.getCategories({
            size: 1000,
        })
    );
    const router = useRouter();

    const createBookMutation = useMutation(
        (values: any) => bookService.createBook$Issuer(values),
        {
            onSuccess: () => {
                toast.success('Tạo sách thành công');
                router.push('/issuer/books');
            },
            onError: (error: any) => {
                toast.error(error?.message);
            },
        }
    );

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
            code: '',
            isbn10: '',
            isbn13: '',
            name: '',
            translator: '',
            price: 0,
            description: '',
            language: '',
            size: '',
            unitInStock: 0,
            releasedYear: new Date().getFullYear(),
            page: 1,
            bookInCombo: true,
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required('Mã sách không được để trống'),
            isbn10: Yup.string()
                .required('ISBN10 không được để trống')
                .length(10, 'ISBN10 phải có 10 ký tự'),
            isbn13: Yup.string()
                .required('ISBN13 không được để trống')
                .length(13, 'ISBN13 phải có 13 ký tự'),
            name: Yup.string().required('Tên sách không được để trống'),
            translator: Yup.string().required(
                'Tên dịch giả không được để trống'
            ),
            price: Yup.number()
                .required('Giá không được để trống')
                .min(0, 'Giá không được nhỏ hơn 0'),
            description: Yup.string().required('Mô tả không được để trống'),
            language: Yup.string().required('Ngôn ngữ không được để trống'),
            size: Yup.string().required('Kích thước không được để trống'),
            unitInStock: Yup.number()
                .required('Số lượng không được để trống')
                .integer('Số lượng phải là số nguyên')
                .min(0, 'Số lượng không được nhỏ hơn 0'),
            releasedYear: Yup.number()
                .required('Năm xuất bản không được để trống')
                .integer('Năm xuất bản phải là số nguyên')
                .min(2010, 'Năm xuất bản không được nhỏ hơn 2010')
                .max(
                    new Date().getFullYear(),
                    'Năm xuất bản không được lớn hơn năm hiện tại'
                ),

            page: Yup.number()
                .required('Số trang không được để trống')
                .min(1, 'Số trang không được nhỏ hơn 1'),
        }),
        onSubmit: async (values) => {
            if (coverPhoto === null) {
                toast.error('Vui lòng chọn ảnh bìa');
                return;
            }

            if (!selectedAuthorId) {
                toast.error('Vui lòng chọn tác giả');
                return;
            }
            if (!selectedPublisherId) {
                toast.error('Vui lòng chọn nhà xuất bản');
                return;
            }
            if (!selectedCategoryId) {
                toast.error('Vui lòng chọn thể loại');
                return;
            }

            let payload = {
                ...values,
                authors: [Number(selectedAuthorId)],
                categoryId: Number(selectedCategoryId),
                publisherId: Number(selectedPublisherId),
            };
            // // upload cover photo to firebase
            //
            firebaseUploadPromise(coverPhoto)
                .then(async (url) => {
                    payload.imageUrl = url as string;
                    createBookMutation.mutate(payload);
                })
                .catch((err) => {
                    toast.error(
                        'Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại'
                    );
                });
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
                                Thông tin cơ bản về sách
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tên sách
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
                                    htmlFor="code"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Mã sách
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.code}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="code"
                                        id="code"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.code && form.touched.code && (
                                    <div className={'input-error'}>
                                        {form.errors.code}
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

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ảnh bìa
                                </label>
                                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        {coverPhoto ? (
                                            <Image
                                                className={
                                                    'mb-4 w-52 rounded-md object-cover object-center'
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
                                        <div className="flex justify-center text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
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
                                            PNG, JPG, GIF tối đa 1MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="isbn10"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    ISBN10
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.isbn10}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="isbn10"
                                        id="isbn10"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.isbn10 && form.touched.isbn10 && (
                                    <div className={'input-error'}>
                                        {form.errors.isbn10}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="isbn13"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    ISBN13
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.isbn13}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="isbn13"
                                        id="isbn13"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.isbn13 && form.touched.isbn13 && (
                                    <div className={'input-error'}>
                                        {form.errors.isbn13}
                                    </div>
                                )}
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="price"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Giá sách
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.price}
                                        onChange={form.handleChange}
                                        type="number"
                                        name="price"
                                        id="price"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.price && form.touched.price && (
                                    <div className={'input-error'}>
                                        {form.errors.price}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="size"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Kích thước
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.size}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="size"
                                        id="size"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.size && form.touched.size && (
                                    <div className={'input-error'}>
                                        {form.errors.size}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="translator"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Dịch giả
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.translator}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="translator"
                                        id="translator"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.translator &&
                                    form.touched.translator && (
                                        <div className={'input-error'}>
                                            {form.errors.translator}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="language"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Ngôn ngữ
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.language}
                                        onChange={form.handleChange}
                                        type="text"
                                        name="language"
                                        id="language"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.language &&
                                    form.touched.language && (
                                        <div className={'input-error'}>
                                            {form.errors.language}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="unitInStock"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Số lượng
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.unitInStock}
                                        onChange={form.handleChange}
                                        type="number"
                                        name="unitInStock"
                                        id="unitInStock"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.unitInStock &&
                                    form.touched.unitInStock && (
                                        <div className={'input-error'}>
                                            {form.errors.unitInStock}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="releasedYear"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Năm xuất bản
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.releasedYear}
                                        onChange={form.handleChange}
                                        type="number"
                                        name="releasedYear"
                                        id="releasedYear"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.releasedYear &&
                                    form.touched.releasedYear && (
                                        <div className={'input-error'}>
                                            {form.errors.releasedYear}
                                        </div>
                                    )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="page"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Số trang
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={form.values.page}
                                        onChange={form.handleChange}
                                        type="number"
                                        name="page"
                                        id="page"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {form.errors.page && form.touched.page && (
                                    <div className={'input-error'}>
                                        {form.errors.page}
                                    </div>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="publisher"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nhà xuất bản
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={(e) =>
                                            setSelectedPublisherId(
                                                e.target.value
                                            )
                                        }
                                        value={selectedPublisherId!}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        name="publisher"
                                        id="publisher"
                                    >
                                        {publishers?.data?.map((publisher) => (
                                            <option
                                                value={publisher?.id}
                                                key={publisher?.id}
                                            >
                                                {publisher?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="author"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tác giả
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={(e) =>
                                            setSelectedAuthorId(e.target.value)
                                        }
                                        value={selectedAuthorId!}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        name="author"
                                        id="author"
                                    >
                                        {authors?.data?.map((author) => (
                                            <option
                                                value={author?.id}
                                                key={author?.id}
                                            >
                                                {author?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Thể loại
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={(e) =>
                                            setSelectedCategoryId(
                                                e.target.value
                                            )
                                        }
                                        value={selectedCategoryId!}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        name="category"
                                        id="category"
                                    >
                                        {categories?.data?.map((category) => (
                                            <option
                                                value={category?.id}
                                                key={category?.id}
                                            >
                                                {category?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Tạo sách
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
};

export default IssuerCreateBookPage;
