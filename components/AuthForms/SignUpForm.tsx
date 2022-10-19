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
            <h1 className="tw-text-3xl tw-text-slate-800 tw-font-bold tw-mb-6">
                Đăng ký Tài khoản ✨
            </h1>
            {/* Form */}
            <form onSubmit={onSubmit} className="tw-text-[#475569]">
                <div>
                    <div>
                        <label
                            className="tw-block tw-text-sm tw-font-medium tw-mb-1"
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
                            className="tw-block tw-text-sm tw-font-medium tw-mb-1"
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
                            className="tw-block tw-text-sm tw-font-medium tw-mb-1"
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
                            className="tw-block tw-text-sm tw-font-medium tw-mb-1"
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
                <div className="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-mt-6">
                    <button
                        disabled={authLoading}
                        type={'submit'}
                        className="tw-cursor-pointer tw-w-full tw-text-center tw-px-5 tw-py-2.5 tw-text-sm tw-font-medium tw-tracking-wide tw-text-white tw-capitalize tw-transition-colors tw-duration-300 tw-transform tw-bg-indigo-600 tw-rounded-md hover:tw-bg-indigo-500 focus:tw-outline-none focus:tw-bg-indigo-500"
                    >
                        Đăng ký
                    </button>
                </div>
                <div className="tw-text-center tw-font-medium tw-my-5 tw-text-xs tw-text-gray-500 tw-uppercase">
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
            <div className="tw-pt-5 tw-mt-6 tw-border-t-[1px] tw-border-slate-200">
                <div className="tw-text-sm">
                    Bạn đã có tài khoản?{' '}
                    <Link href="/login">
                        <a className="tw-font-medium tw-text-indigo-500 hover:tw-text-indigo-600">
                            Đăng nhập
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
