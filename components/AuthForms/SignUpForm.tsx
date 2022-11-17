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
            <h1 className="mb-6 text-3xl font-bold text-slate-800">
                Đăng ký Tài khoản ✨
            </h1>
            {/* Form */}
            <form onSubmit={onSubmit} className="text-[#475569]">
                <div>
                    <div>
                        <label
                            className="mb-1 block text-sm font-medium"
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
                    <div className="mt-4">
                        <label
                            className="mb-1 block text-sm font-medium"
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
                    <div className="mt-4">
                        <label
                            className="mb-1 block text-sm font-medium"
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
                    <div className="mt-4">
                        <label
                            className="mb-1 block text-sm font-medium"
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
                <div className="mt-6 flex flex-wrap items-center justify-between">
                    <button
                        disabled={authLoading}
                        type={'submit'}
                        className="w-full transform cursor-pointer rounded-md bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-indigo-500 focus:bg-indigo-500 focus:outline-none"
                    >
                        Đăng ký
                    </button>
                </div>
                <div className="my-5 text-center text-xs font-medium uppercase text-gray-500">
                    Hoặc đăng ký với
                </div>
                <SocialLoginButton
                    provider={AuthProviders.GOOGLE}
                    actionType={ActionTypes.SIGNUP}
                />
                <SocialLoginButton
                    wrapperClasses={'mt-4'}
                    provider={AuthProviders.FACEBOOK}
                    actionType={ActionTypes.SIGNUP}
                />
            </form>
            {/* Footer */}
            <div className="mt-6 border-t-[1px] border-slate-200 pt-5">
                <div className="text-sm">
                    Bạn đã có tài khoản?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-indigo-500 hover:text-indigo-600"
                    >
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
