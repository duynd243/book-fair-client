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
            className={`${wrapperClasses} tw-group tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-border-2 tw-border-gray-300 tw-py-2 tw-transition tw-duration-300 hover:tw-border-blue-400 focus:tw-bg-blue-50 active:tw-bg-blue-100`}
            type="button"
            onClick={onClick}
        >
            <div className="!tw-mr-3 !tw-scale-[1.2]">{provider.icon}</div>
            <span className="tw-text-[0.9rem] tw-font-medium tw-text-gray-500 tw-transition tw-duration-300 group-hover:tw-text-blue-500">{`${actionType} với ${provider.displayName}`}</span>
        </button>
    );
};

export default SocialLoginButton;
