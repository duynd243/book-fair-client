import React from 'react'
const Providers = {
    google: {
        displayName: 'Google',
        icon: <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible" /></clipPath><path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" /><path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" /><path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg>,
    },
}
const SocialLoginButton = ({ provider, onClick }) => {

    return (
        <button className='tw-group tw-border-gray-300 tw-flex tw-w-full tw-py-2 tw-rounded-full tw-border-2 tw-items-center tw-justify-center tw-transition tw-duration-300 hover:tw-border-blue-400 focus:tw-bg-blue-50 active:tw-bg-blue-100' type='button' onClick={onClick}>
            <div className='tw-w-5 tw-mr-2'>
                {provider.icon}
            </div>
            <span className='group-hover:tw-text-blue-500 tw-transition tw-duration-300 tw-font-medium tw-text-gray-500'>{`Continue with ${provider.displayName}`}</span>
        </button>
    )
}

export {
    SocialLoginButton,
    Providers
} 