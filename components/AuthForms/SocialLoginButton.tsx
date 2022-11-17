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
        icon: <BsFacebook className={'!fill-blue-600'} />,
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
            className={`${wrapperClasses} group flex w-full items-center justify-center rounded-full border-2 border-gray-300 py-2 transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100`}
            type="button"
            onClick={onClick}
        >
            <div className="!mr-3 !scale-[1.2]">{provider.icon}</div>
            <span className="text-[0.9rem] font-medium text-gray-500 transition duration-300 group-hover:text-blue-500">{`${actionType} với ${provider.displayName}`}</span>
        </button>
    );
};

export default SocialLoginButton;
