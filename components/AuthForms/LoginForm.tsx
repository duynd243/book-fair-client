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
                        className: '!opacity-[0.85]',
                        autoClose: false,
                        theme: 'dark',
                    })
                }
                className="mb-6 text-3xl font-bold text-slate-800"
            >
                Chào bạn trở lại! ✨
            </h1>
            {/* Form */}
            <form onSubmit={form.handleSubmit} className="text-[#475569]">
                <div>
                    <div>
                        <label
                            className="mb-1 block text-sm font-medium"
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
                    <div className="mt-4">
                        <label
                            className="mb-1 block text-sm font-medium"
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
                <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
                    <div className="mr-1">
                        <a className="text-sm underline hover:no-underline">
                            Quên mật khẩu?
                        </a>
                    </div>
                    <button
                        type="submit"
                        disabled={authLoading}
                        className="transform cursor-pointer rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none"
                    >
                        Đăng nhập
                    </button>
                </div>
                <div className="my-5 text-center text-xs font-medium uppercase text-gray-500">
                    Hoặc đăng nhập với
                </div>
                <SocialLoginButton
                    onClick={handleGoogleSignIn}
                    provider={AuthProviders.GOOGLE}
                    actionType={ActionTypes.LOGIN}
                />
                <SocialLoginButton
                    wrapperClasses={'mt-4'}
                    provider={AuthProviders.FACEBOOK}
                    actionType={ActionTypes.LOGIN}
                />
            </form>
            {/* Footer */}
            <div className="mt-6 border-t-[1px] border-slate-200 pt-5">
                <div className="text-sm">
                    Bạn chưa có tài khoản?{' '}
                    <Link
                        className={
                            'font-medium text-indigo-500 hover:text-indigo-600'
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
