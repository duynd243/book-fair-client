import React, { useState } from 'react';
import RequiredAsterisk from '../Commons/RequiredAsterisk';
import { inputClass } from '../Layouts/LoginSignUpLayout';
import SocialLoginButton, {
    ActionTypes,
    AuthProviders,
} from './SocialLoginButton';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

const SignUpForm: React.FC = () => {
    const { handleEmailPasswordSignUp, authLoading } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validation here...
        handleEmailPasswordSignUp(email, password, fullName);
    };

    return (
        <>
            <h1 className="tw-mb-6 tw-text-3xl tw-font-bold tw-text-slate-800">
                Đăng ký Tài khoản ✨
            </h1>
            {/* Form */}
            <form onSubmit={onSubmit} className="tw-text-[#475569]">
                <div>
                    <div>
                        <label
                            className="tw-mb-1 tw-block tw-text-sm tw-font-medium"
                            htmlFor="email"
                        >
                            Email
                            <RequiredAsterisk />
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            className={inputClass}
                            type="email"
                        />
                    </div>
                    <div className="tw-mt-4">
                        <label
                            className="tw-mb-1 tw-block tw-text-sm tw-font-medium"
                            htmlFor="fullName"
                        >
                            Họ và Tên
                            <RequiredAsterisk />
                        </label>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            id="fullName"
                            className={inputClass}
                            type="text"
                            autoComplete="on"
                        />
                    </div>
                    <div className="tw-mt-4">
                        <label
                            className="tw-mb-1 tw-block tw-text-sm tw-font-medium"
                            htmlFor="password"
                        >
                            Mật khẩu
                            <RequiredAsterisk />
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            className={inputClass}
                            type="password"
                            autoComplete="on"
                        />
                    </div>
                    <div className="tw-mt-4">
                        <label
                            className="tw-mb-1 tw-block tw-text-sm tw-font-medium"
                            htmlFor="confirmPassword"
                        >
                            Xác nhận mật khẩu
                            <RequiredAsterisk />
                        </label>
                        <input
                            id="confirmPassword"
                            className={inputClass}
                            type="password"
                            autoComplete="on"
                        />
                    </div>
                </div>
                <div className="tw-mt-6 tw-flex tw-flex-wrap tw-items-center tw-justify-between">
                    <button
                        disabled={authLoading}
                        type={'submit'}
                        className="tw-w-full tw-transform tw-cursor-pointer tw-rounded-md tw-bg-indigo-600 tw-px-5 tw-py-2.5 tw-text-center tw-text-sm tw-font-medium tw-capitalize tw-tracking-wide tw-text-white tw-transition-colors tw-duration-300 hover:tw-bg-indigo-500 focus:tw-bg-indigo-500 focus:tw-outline-none"
                    >
                        Đăng ký
                    </button>
                </div>
                <div className="tw-my-5 tw-text-center tw-text-xs tw-font-medium tw-uppercase tw-text-gray-500">
                    Hoặc đăng ký với
                </div>
                <SocialLoginButton
                    provider={AuthProviders.GOOGLE}
                    actionType={ActionTypes.SIGNUP}
                />
                <SocialLoginButton
                    wrapperClasses={'tw-mt-4'}
                    provider={AuthProviders.FACEBOOK}
                    actionType={ActionTypes.SIGNUP}
                />
            </form>
            {/* Footer */}
            <div className="tw-mt-6 tw-border-t-[1px] tw-border-slate-200 tw-pt-5">
                <div className="tw-text-sm">
                    Bạn đã có tài khoản?{' '}
                    <Link
                        href="/login"
                        className="tw-font-medium tw-text-indigo-500 hover:tw-text-indigo-600"
                    >
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
