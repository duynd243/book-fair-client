import { NextPage } from 'next';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
const IndexPage: NextPage = () => {
    const navigation = [
        { title: 'Customers', path: '#' },
        { title: 'Careers', path: '#' },
    ];

    const { user, authLoading, logOut } = useAuth();

    return (
        <div className="tw-bg-gray-900">
            <header>
                <nav className="tw-items-center tw-pt-5 tw-px-4 tw-mx-auto tw-max-w-screen-xl sm:tw-px-8 sm:tw-flex sm:tw-space-x-6">
                    <a href="#">
                        <picture>
                            <img
                                src="https://www.floatui.com/images/logo.svg"
                                width={120}
                                height={50}
                                alt="Float UI logo"
                            />
                        </picture>
                    </a>
                    <ul className="tw-py-4 tw-flex-1 tw-items-center tw-flex tw-space-x-3 sm:tw-space-x-6 sm:tw-justify-end">
                        {navigation.map((item, idx) => (
                            <li className="tw-text-gray-200" key={idx}>
                                <a href={item.path}>{item.title}</a>
                            </li>
                        ))}
                        <li>
                            {!authLoading && !user && (
                                <Link href={'/login'}>
                                    <a className="tw-flex tw-items-center tw-text-gray-200">
                                        Log In
                                        <FiLogIn className={'tw-ml-3'} />
                                    </a>
                                </Link>
                            )}
                            {!authLoading && user && (
                                <a
                                    onClick={logOut}
                                    className="tw-cursor-pointer tw-flex tw-items-center tw-text-gray-200"
                                >
                                    Log Out
                                    <FiLogOut className={'tw-ml-3'} />
                                </a>
                            )}
                        </li>
                    </ul>
                </nav>
            </header>
            <section className="tw-mt-24 tw-mx-auto tw-max-w-screen-xl tw-pb-12 tw-px-4 tw-items-center lg:tw-flex md:tw-px-8">
                <div className="tw-space-y-4 tw-flex-1 sm:tw-text-center lg:tw-text-left">
                    <h1 className="tw-text-white tw-font-bold tw-text-4xl xl:tw-text-5xl">
                        One page Template for
                        <span className="tw-text-indigo-400">
                            {' '}
                            Digital agency
                        </span>
                    </h1>
                    <p className="tw-text-gray-300 tw-max-w-xl tw-leading-relaxed sm:tw-mx-auto lg:tw-ml-0">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum
                    </p>
                    <div className="tw-pt-10 tw-items-center tw-justify-center tw-space-y-3 sm:tw-space-x-6 sm:tw-space-y-0 sm:tw-flex lg:tw-justify-start">
                        <a
                            href="#"
                            className="tw-px-7 tw-py-3 tw-w-full tw-bg-white tw-text-gray-800 tw-text-center tw-rounded-md tw-shadow-md tw-block sm:tw-w-auto"
                        >
                            Get started
                        </a>
                        <a
                            href="#"
                            className="tw-px-7 tw-py-3 tw-w-full tw-bg-gray-700 tw-text-gray-200 tw-text-center tw-rounded-md tw-block sm:tw-w-auto"
                        >
                            Try it out
                        </a>
                    </div>
                </div>
                <div className="tw-flex-1 tw-text-center tw-mt-7 lg:tw-mt-0 lg:tw-ml-3">
                    <picture>
                        <img
                            alt={''}
                            src="https://i.postimg.cc/HxHyt53c/undraw-heatmap-uyye.png"
                            className="tw-w-full tw-mx-auto sm:tw-w-10/12  lg:tw-w-full"
                        />
                    </picture>
                </div>
            </section>
        </div>
    );
};

export default IndexPage;
