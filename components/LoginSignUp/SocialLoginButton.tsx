import React from "react";

type AuthProvider = {
  displayName: string;
  icon: JSX.Element;
};

export class AuthProviders {
  static GOOGLE: AuthProvider = {
    displayName: "Google",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 48 48"
      >
        <defs>
          <path
            id="a"
            d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
          />
        </defs>
        <clipPath id="b">
          <use xlinkHref="#a" overflow="visible" />
        </clipPath>
        <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
        <path
          clipPath="url(#b)"
          fill="#EA4335"
          d="M0 11l17 13 7-6.1L48 14V0H0z"
        />
        <path
          clipPath="url(#b)"
          fill="#34A853"
          d="M0 37l30-23 7.9 1L48 0v48H0z"
        />
        <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
      </svg>
    ),
  };
  static FACEBOOK: AuthProvider = {
    displayName: "Facebook",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Ebene 1"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="#1877f2"
          d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
        />
        <path
          fill="#fff"
          d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
        />
      </svg>
    ),
  };
}
export enum ActionTypes {
  LOGIN = "Đăng nhập",
  SIGNUP = "Đăng ký",
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
      <div className="tw-w-5 tw-mr-2.5">{provider.icon}</div>
      <span className="group-hover:tw-text-blue-500 tw-transition tw-text-[0.9rem] tw-duration-300 tw-font-medium tw-text-gray-500">{`${actionType} với ${provider.displayName}`}</span>
    </button>
  );
};

export default SocialLoginButton;