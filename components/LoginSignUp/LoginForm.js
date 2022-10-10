import React from 'react'
import { inputClass } from './Layout';
import { SocialLoginButton, Providers } from './SocialLoginButton';

const LoginForm = () => {
    return (
        <>
            <h1 className="tw-text-3xl tw-text-slate-800 tw-font-bold tw-mb-6">Welcome back! ✨</h1>
            {/* Form */}
            <form className="tw-text-[#475569]">
                <div>
                    <div>
                        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1" htmlFor="email">Email Address</label>
                        <input id="email" className={inputClass} type="email" />
                    </div>
                    <div className="tw-mt-4">
                        <label className="tw-block tw-text-sm tw-font-medium tw-mb-1" htmlFor="password">Password</label>
                        <input id="password" className={inputClass} type="password" autoComplete="on" />
                    </div>
                </div>
                <div className="tw-flex tw-flex-wrap tw-gap-2 tw-items-center tw-justify-between tw-mt-6">
                    <div className="tw-mr-1">
                        <a className="tw-text-sm tw-underline hover:tw-no-underline" href="reset-password.html">Forgot Password?</a>
                    </div>
                    <a className="tw-px-5 tw-py-2.5 tw-text-sm tw-font-medium tw-tracking-wide tw-text-white tw-capitalize tw-transition-colors tw-duration-300 tw-transform tw-bg-indigo-600 tw-rounded-md hover:tw-bg-indigo-500 focus:tw-outline-none focus:tw-bg-indigo-500" href="index.html">Sign In</a>
                </div>
                <div className='tw-text-center tw-font-medium tw-my-3 tw-text-xs tw-text-gray-500 tw-uppercase'>Or Sign-In with</div>
                <SocialLoginButton provider={Providers.google} />
            </form>
            {/* Footer */}
            <div className="tw-pt-5 tw-mt-6 tw-border-t-[1px] tw-border-slate-200">
                <div className="tw-text-sm">
                    Don’t you have an account? <a className="tw-font-medium tw-text-indigo-500 hover:tw-text-indigo-600" href="/signup">Sign Up</a>
                </div>
            </div>
        </>
    )
}

export default LoginForm;