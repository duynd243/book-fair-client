import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { inputClass } from '../Layouts/LoginSignUpLayout';
import SocialLoginButton, {
    ActionTypes,
    AuthProviders,
} from './SocialLoginButton';

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
                className="tw-mb-6 tw-text-3xl tw-font-bold tw-text-slate-800"
            >
                Chào bạn trở lại! ✨
            </h1>
            {/* Form */}
            <form onSubmit={form.handleSubmit} className="tw-text-[#475569]">
                <div>
                    <div>
                        <label
                            className="tw-mb-1 tw-block tw-text-sm tw-font-medium"
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
                            className="tw-mb-1 tw-block tw-text-sm tw-font-medium"
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
                <div className="tw-mt-6 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-2">
                    <div className="tw-mr-1">
                        <a className="tw-text-sm tw-underline hover:tw-no-underline">
                            Quên mật khẩu?
                        </a>
                    </div>
                    <button
                        type="submit"
                        disabled={authLoading}
                        className="tw-transform tw-cursor-pointer tw-rounded-md tw-bg-indigo-600 tw-px-5 tw-py-2.5 tw-text-sm tw-font-medium tw-tracking-wide tw-text-white tw-transition-colors tw-duration-300 hover:tw-bg-indigo-500 focus:tw-bg-indigo-500 focus:tw-outline-none"
                    >
                        Đăng nhập
                    </button>
                </div>
                <div className="tw-my-5 tw-text-center tw-text-xs tw-font-medium tw-uppercase tw-text-gray-500">
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
            <div className="tw-mt-6 tw-border-t-[1px] tw-border-slate-200 tw-pt-5">
                <div className="tw-text-sm">
                    Bạn chưa có tài khoản?{' '}
                    <Link
                        className={
                            'tw-font-medium tw-text-indigo-500 hover:tw-text-indigo-600'
                        }
                        href="/signup"
                    >
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
