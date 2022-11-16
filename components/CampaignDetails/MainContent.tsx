import React, { useState } from 'react';
import Link from 'next/link';
import {
    IoArrowForward,
    IoChevronBack,
    IoLocationSharp,
} from 'react-icons/io5';
import { getFormattedDate } from '../../utils/helper';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import ContentHeader from './ContentHeader';
import Separator from './Seperator';
import { ICampaign } from '../../types/campaign/ICampaign';
import StatusLabel from './StatusLabel';
import OrganizationCard from './OrganizationCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import { PostService } from '../../services/PostService';
import { IPostResponse } from '../../types/response/IPostResponse';
import PostCard from './PostCard';

const EmptySection: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="tw-py-6 tw-text-center">
            <p className="tw-text-slate-600">{text}</p>
        </div>
    );
};

type Props = {
    campaign: ICampaign | undefined;
};

const MainContent: React.FC<Props> = ({ campaign }) => {
    const { loginUser } = useAuth();
    const postService = new PostService(loginUser?.accessToken);
    const organizations = campaign?.organizationCampaigns;

    const [postPageSize, setPostPageSize] = useState(4);

    const {
        data: posts,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isInitialLoading,
    } = useInfiniteQuery(
        ['posts', campaign?.id],
        ({ pageParam = 1 }) =>
            postService.getPosts({
                page: pageParam,
                campaignId: campaign?.id,
                size: postPageSize,
            }),
        {
            getNextPageParam: (lastPage) => {
                const currentPage = lastPage?.metadata?.page;
                const totalPages = Math.ceil(
                    lastPage?.metadata?.total / postPageSize
                );
                return currentPage < totalPages ? currentPage + 1 : undefined;
            },
        }
    );

    return (
        <div>
            <div className="tw-mb-6">
                <Link
                    className="tw-flex tw-w-fit tw-items-center tw-justify-between tw-rounded tw-border-slate-200 tw-bg-slate-100 tw-px-3.5 tw-py-1.5 tw-text-base tw-font-medium tw-text-slate-600 tw-transition tw-duration-150 tw-ease-in-out hover:tw-border-slate-300 hover:tw-bg-slate-200"
                    href="/campaigns"
                >
                    <IoChevronBack size={'17'} />
                    <span>Quay lại</span>
                </Link>
            </div>
            <div className="tw-mb-2 tw-flex tw-flex-wrap tw-items-center tw-gap-1 tw-text-sm tw-font-semibold tw-uppercase tw-text-indigo-500">
                {getFormattedDate(campaign?.startDate).fullDate}
                <IoArrowForward className={'tw-fill-indigo-500'} />
                {getFormattedDate(campaign?.endDate).fullDate}
            </div>
            <header className="tw-mb-4">
                {/* Title */}
                <h1 className="text-slate-800 tw-mb-2 tw-text-2xl tw-font-bold md:tw-text-3xl">
                    {campaign?.name}
                </h1>
            </header>

            {/* Meta */}
            <div className="tw-mb-6 tw-space-y-3 sm:tw-flex sm:tw-items-center sm:tw-justify-between sm:tw-space-y-0">
                {/* Location */}
                <div className="tw-flex tw-items-center tw-gap-1 sm:tw-mr-4">
                    <IoLocationSharp size={20} className={'tw-fill-red-700'} />
                    <div className="tw-whitespace-nowrap tw-text-sm">
                        Diễn ra tại{' '}
                        <span className="text-slate-800 tw-font-semibold">
                            {campaign?.address}
                        </span>
                    </div>
                </div>
                {/* Right side */}
                <StatusLabel statusId={campaign?.status} />
            </div>

            {/* Image */}
            <figure className="tw-mb-6">
                <Image
                    className="tw-w-full tw-rounded"
                    src={
                        campaign?.imageUrl ||
                        `https://picsum.photos/1920/1080?random={${Math.random()}}`
                    }
                    width={1000}
                    height={1000}
                    alt=""
                />
            </figure>

            {/* Description */}
            <div>
                <ContentHeader text={'Mô tả sự kiện'} />
                <p className="tw-mt-2 tw-mb-6 tw-break-words">
                    {campaign?.description}
                </p>
            </div>
            <Separator />

            {/*Organizations*/}
            <div>
                <ContentHeader
                    text={`Tổ chức (${organizations?.length || 0})`}
                />
                {organizations && organizations?.length > 0 ? (
                    <div className="tw-my-6 tw-grid  tw-gap-4 sm:tw-grid-cols-2">
                        {organizations.map((org) => (
                            <OrganizationCard organization={org} key={org.id} />
                        ))}
                    </div>
                ) : (
                    <EmptySection
                        text={'Sự kiện này chưa có tổ chức nào tham gia'}
                    />
                )}
            </div>
            <Separator />
            {/* Posts */}

            <div>
                <ContentHeader
                    text={`Bài đăng (${posts?.pages[0]?.metadata.total || 0})`}
                />
                {isInitialLoading ? (
                    <div className={'tw-my-6'}>Đang tải...</div>
                ) : posts && posts?.pages.length > 0 ? (
                    <div className="tw-my-6">
                        <div className="tw-grid tw-grid-cols-12 tw-gap-6">
                            {posts?.pages?.map((value) =>
                                value.data.map((post: IPostResponse) => (
                                    <PostCard data={post} key={post?.id} />
                                ))
                            )}
                        </div>
                        {hasNextPage && (
                            <button
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="tw-mx-auto tw-mt-4 tw-block tw-rounded tw-bg-indigo-50 tw-px-4 tw-py-2 tw-text-base tw-font-medium tw-text-indigo-500 tw-transition disabled:tw-bg-gray-50 disabled:tw-text-gray-500"
                            >
                                {isFetchingNextPage
                                    ? 'Đang tải...'
                                    : 'Xem thêm bài đăng'}
                            </button>
                        )}
                    </div>
                ) : (
                    <EmptySection text={'Sự kiện này chưa có bài đăng nào'} />
                )}
            </div>

            <Separator />

            {/* Comments */}
            <div>
                <ContentHeader text={'Bình luận (3)'} />

                <ul className="tw-my-6 tw-space-y-5">
                    {/* Comment */}
                    <li className="tw-flex tw-items-start">
                        <a className="shrink-0 tw-mr-3 tw-block" href="#0">
                            <Image
                                className="tw-rounded-full"
                                src={DefaultAvatar.src}
                                width="32"
                                height="32"
                                alt="User 07"
                            />
                        </a>
                        <div className="grow">
                            <div className="text-slate-800 tw-mb-2 tw-text-sm tw-font-semibold">
                                Taylor Nieman
                            </div>
                            <div className="tw-italic">
                                “Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam.”
                            </div>
                        </div>
                    </li>
                    {/* Comment */}
                    <li className="tw-flex tw-items-start">
                        <a className="shrink-0 tw-mr-3 tw-block" href="#0">
                            <Image
                                className="tw-rounded-full"
                                src={DefaultAvatar.src}
                                width="32"
                                height="32"
                                alt="User 08"
                            />
                        </a>
                        <div className="grow">
                            <div className="text-slate-800 tw-mb-2 tw-text-sm tw-font-semibold">
                                Meagan Loyst
                            </div>
                            <div className="tw-italic">
                                “Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam.”
                            </div>
                        </div>
                    </li>
                    {/* Comment */}
                    <li className="tw-flex tw-items-start">
                        <a className="shrink-0 tw-mr-3 tw-block" href="#0">
                            <Image
                                className="tw-rounded-full"
                                src={DefaultAvatar.src}
                                width="32"
                                height="32"
                                alt="User 02"
                            />
                        </a>
                        <div className="grow">
                            <div className="text-slate-800 tw-mb-2 tw-text-sm tw-font-semibold">
                                Frank Malik
                            </div>
                            <div className="tw-italic">
                                “Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam.”
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <Separator />

            {/* Similar Meetups */}
            <div>
                <ContentHeader text={'Các sự kiện liên quan'} />
            </div>
        </div>
    );
};

export default MainContent;
