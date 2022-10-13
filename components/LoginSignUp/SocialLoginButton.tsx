import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';

type AuthProvider = {
    displayName: string;
    icon: JSX.Element;
};

export class AuthProviders {
    static readonly GOOGLE: AuthProvider = {
        displayName: 'Google',
        icon: <FcGoogle />,
    };
    static readonly FACEBOOK: AuthProvider = {
        displayName: 'Facebook',
        icon: <BsFacebook className={'!tw-fill-blue-600'} />,
    };
}

export enum ActionTypes {
    LOGIN = 'Đăng nhập',
    SIGNUP = 'Đăng ký',
}

type Props = {
    provider: AuthProvider;
    onClick?: () => void;
    actionType: ActionTypes;
    wrapperClasses?: string;
};

const SocialLoginButton: React.FC<Props> = ({
    provider,
    onClick,
    actionType,
    wrapperClasses,
}) => {
    return (
        <button
            className={`${wrapperClasses} tw-group tw-border-gray-300 tw-flex tw-w-full tw-py-2 tw-rounded-full tw-border-2 tw-items-center tw-justify-center tw-transition tw-duration-300 hover:tw-border-blue-400 focus:tw-bg-blue-50 active:tw-bg-blue-100`}
            type="button"
            onClick={onClick}
        >
            <div className="!tw-scale-[1.2] !tw-mr-3">{provider.icon}</div>
            <span className="group-hover:tw-text-blue-500 tw-transition tw-text-[0.9rem] tw-duration-300 tw-font-medium tw-text-gray-500">{`${actionType} với ${provider.displayName}`}</span>
        </button>
    );
};

export default SocialLoginButton;
