import React from 'react';
import { inputClass } from '../Layouts/LoginSignUpLayout';
import { useAuth } from '../../context/AuthContext';
import SocialLoginButton, {
    ActionTypes,
    AuthProviders,
} from './SocialLoginButton';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Link from 'next/link';

const LoginForm: React.FC = () => {
    const { handleGoogleSignIn, handleEmailPasswordSignIn, authLoading } =
        useAuth();
    const form = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters'),
        }),
        onSubmit: (values) => {
            console.log(values);
            handleEmailPasswordSignIn(values.email, values.password);
        },
    });

    return (
        <>
            <h1
                onClick={() =>
                    toast.success('Login success', {
                        className: '!tw-opacity-[0.85]',
                        autoClose: false,
                        theme: 'dark',
                    })
                }
                className="tw-text-3xl tw-text-slate-800 tw-font-bold tw-mb-6"
            >
                Chào bạn trở lại! ✨
            </h1>
            {/* Form */}
            <form onSubmit={form.handleSubmit} className="tw-text-[#475569]">
                <div>
                    <div>
                        <label
                            className="tw-block tw-text-sm tw-font-medium tw-mb-1"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            value={form.values.email}
                            onChange={form.handleChange}
                            id="email"
                            className={inputClass}
                            type="email"
                        />
                    </div>
                    <div className="tw-mt-4">
                        <label
                            className="tw-block tw-text-sm tw-font-medium tw-mb-1"
                            htmlFor="password"
                        >
                            Mật khẩu
                        </label>
                        <input
                            value={form.values.password}
                            onChange={form.handleChange}
                            id="password"
                            className={inputClass}
                            type="password"
                            autoComplete="on"
                        />

                        {form.errors && <p>{JSON.stringify(form.errors)}</p>}
                    </div>
                </div>
                <div className="tw-flex tw-flex-wrap tw-gap-2 tw-items-center tw-justify-between tw-mt-6">
                    <div className="tw-mr-1">
                        <a className="tw-text-sm tw-underline hover:tw-no-underline">
                            Quên mật khẩu?
                        </a>
                    </div>
                    <button
                        type="submit"
                        disabled={authLoading}
                        className="tw-cursor-pointer tw-px-5 tw-py-2.5 tw-text-sm tw-font-medium tw-tracking-wide tw-text-white tw-transition-colors tw-duration-300 tw-transform tw-bg-indigo-600 tw-rounded-md hover:tw-bg-indigo-500 focus:tw-outline-none focus:tw-bg-indigo-500"
                    >
                        Đăng nhập
                    </button>
                </div>
                <div className="tw-text-center tw-font-medium tw-my-5 tw-text-xs tw-text-gray-500 tw-uppercase">
                    Hoặc đăng nhập với
                </div>
                <SocialLoginButton
                    onClick={handleGoogleSignIn}
                    provider={AuthProviders.GOOGLE}
                    actionType={ActionTypes.LOGIN}
                />
                <SocialLoginButton
                    wrapperClasses={'tw-mt-4'}
                    provider={AuthProviders.FACEBOOK}
                    actionType={ActionTypes.LOGIN}
                />
            </form>
            {/* Footer */}
            <div className="tw-pt-5 tw-mt-6 tw-border-t-[1px] tw-border-slate-200">
                <div className="tw-text-sm">
                    Bạn chưa có tài khoản?{' '}
                    <Link href="/signup">
                        <a className="tw-font-medium tw-text-indigo-500 hover:tw-text-indigo-600">
                            Đăng ký ngay
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
