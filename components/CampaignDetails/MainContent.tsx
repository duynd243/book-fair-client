import React, { useEffect } from 'react';
import Link from 'next/link';
import { IoArrowForward, IoChevronBack } from 'react-icons/io5';
import { getFormattedDate } from '../../utils/helper';
import Image from 'next/image';
import DefaultAvatar from '../../assets/images/default_avatar.png';
import ContentHeader from './ContentHeader';
import Separator from './Seperator';
import { ICampaign } from '../../types/campaign/ICampaign';
import { IoLocationSharp } from 'react-icons/io5';
import StatusLabel from './StatusLabel';
import OrganizationCard from './OrganizationCard';
import { ICampaignPost } from '../../types/joins/ICampaignPost';
import PostCard from './PostCard';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { IPostResponse } from '../../types/response/IPostResponse';
import { useAuth } from '../../context/AuthContext';
import { PostService } from '../../services/PostService';

const EmptySection: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="tw-text-center tw-py-6">
            <p className="tw-text-slate-600">{text}</p>
        </div>
    );
};

type Props = {
    campaign: ICampaign | undefined;
    campaignPost: ICampaignPost | undefined;
};

const MainContent: React.FC<Props> = ({ campaign, campaignPost }) => {
    const { loginUser } = useAuth();
    const postService = new PostService(loginUser?.accessToken);
    const [postIDs, setPostIDs] = React.useState<(number | undefined)[]>([]);
    const queryClient = useQueryClient();
    const organizations = campaign?.organizationCampaigns;
    const posts = campaignPost?.posts;

    useEffect(() => {
        if (campaignPost && campaignPost.posts) {
            const postIDs = campaignPost?.posts?.map((post) => post.id);
            setPostIDs(postIDs);
        } else {
            setPostIDs([]);
        }
    }, [campaignPost]);

    useQueries({
        queries: Array.from(new Set(postIDs)).map((postId) => ({
            queryKey: ['post', postId],
            queryFn: () => postService.getPostById(postId),
        })),
    });

    const getPost = (postId?: number) => {
        return queryClient.getQueryData<IPostResponse>(['post', postId]);
    };

    return (
        <div>
            <div className="tw-mb-6">
                <Link
                    className="tw-flex tw-w-fit tw-items-center tw-justify-between tw-rounded tw-border-slate-200 tw-bg-slate-100 hover:tw-bg-slate-200 tw-px-3.5 tw-py-1.5 tw-text-base tw-font-medium tw-text-slate-600 tw-transition tw-duration-150 tw-ease-in-out hover:tw-border-slate-300"
                    href="/campaigns"
                >
                    <IoChevronBack size={'17'} />
                    <span>Quay lại</span>
                </Link>
            </div>
            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-1 tw-mb-2 tw-text-sm tw-font-semibold tw-uppercase tw-text-indigo-500">
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
                <div className="tw-flex tw-gap-1 tw-items-center sm:tw-mr-4">
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
                    src={`https://picsum.photos/1920/1080?random={${Math.random()}}`}
                    width={640}
                    height={360}
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
                    <div className="tw-grid tw-my-6  sm:tw-grid-cols-2 tw-gap-4">
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
                <ContentHeader text={`Bài đăng (${posts?.length || 0})`} />
                {posts && posts?.length > 0 ? (
                    <div className="tw-my-6 tw-grid tw-grid-cols-12 tw-gap-6">
                        {Array.from(new Set(postIDs)).map((postId, index) => (
                            <PostCard data={getPost(postId)} key={index} />
                        ))}
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
                {/*<div className="tw-my-6 tw-space-y-8 sm:tw-space-y-5 lg:tw-mb-0">*/}
                {/*    /!* Related item *!/*/}
                {/*    <article className="border-slate-200 tw-flex tw-overflow-hidden tw-rounded-sm tw-border tw-bg-white tw-shadow-lg">*/}
                {/*        /!* Image *!/*/}
                {/*        <a*/}
                {/*            className="lg:sidebar-expanded:tw-w-20 xl:sidebar-expanded:tw-w-56 shrink-0 tw-relative tw-block tw-w-24 sm:tw-w-56"*/}
                {/*            href="#0"*/}
                {/*        >*/}
                {/*            <Image*/}
                {/*                className="tw-absolute tw-h-full tw-w-full tw-object-cover tw-object-center"*/}
                {/*                src={''}*/}
                {/*                width="220"*/}
                {/*                height="236"*/}
                {/*                alt="Meetup 02"*/}
                {/*            />*/}
                {/*            /!* Like button *!/*/}
                {/*            <button className="tw-absolute tw-top-0 tw-right-0 tw-mt-4 tw-mr-4">*/}
                {/*                <div className="text-slate-100 tw-rounded-full tw-bg-slate-900 tw-bg-opacity-60">*/}
                {/*                    <span className="tw-sr-only">Like</span>*/}
                {/*                    <svg*/}
                {/*                        className="tw-h-8 tw-w-8 tw-fill-current"*/}
                {/*                        viewBox="0 0 32 32"*/}
                {/*                    >*/}
                {/*                        <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z" />*/}
                {/*                    </svg>*/}
                {/*                </div>*/}
                {/*            </button>*/}
                {/*        </a>*/}
                {/*        /!* Content *!/*/}
                {/*        <div className="grow tw-flex tw-flex-col tw-p-5">*/}
                {/*            <div className="grow">*/}
                {/*                <div className="tw-mb-2 tw-text-sm tw-font-semibold tw-uppercase tw-text-indigo-500">*/}
                {/*                    Mon 27 Dec, 2021*/}
                {/*                </div>*/}
                {/*                <a className="tw-mb-2 tw-inline-flex" href="#0">*/}
                {/*                    <h3 className="text-slate-800 tw-text-lg tw-font-bold">*/}
                {/*                        New York &amp; New Jersey Virtual*/}
                {/*                        Retreat 2021*/}
                {/*                    </h3>*/}
                {/*                </a>*/}
                {/*                <div className="tw-text-sm">*/}
                {/*                    Lorem ipsum is placeholder text commonly*/}
                {/*                    used in the graphic, print, and publishing*/}
                {/*                    industries for previewing layouts.*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            /!* Footer *!/*/}
                {/*            <div className="tw-mt-3 tw-flex tw-justify-between">*/}
                {/*                /!* Tag *!/*/}
                {/*                <div className="text-slate-600 tw-inline-flex tw-items-center tw-rounded-full tw-bg-slate-100 tw-px-2.5 tw-py-1 tw-text-center tw-text-xs tw-font-medium">*/}
                {/*                    <svg*/}
                {/*                        className="fill-slate-400 tw-mr-2 tw-h-3 tw-w-4"*/}
                {/*                        viewBox="0 0 16 12"*/}
                {/*                    >*/}
                {/*                        <path d="m16 2-4 2.4V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.6l4 2.4V2ZM2 10V2h8v8H2Z" />*/}
                {/*                    </svg>*/}
                {/*                    <span>Online Event</span>*/}
                {/*                </div>*/}
                {/*                /!* Avatars *!/*/}
                {/*                <div className="tw-flex tw-items-center tw-space-x-2">*/}
                {/*                    <div className="tw--ml-0.5 tw-flex tw--space-x-3">*/}
                {/*                        <Image*/}
                {/*                            className="tw-box-content tw-rounded-full tw-border-2 tw-border-white"*/}
                {/*                            src={''}*/}
                {/*                            width="28"*/}
                {/*                            height="28"*/}
                {/*                            alt="User 02"*/}
                {/*                        />*/}
                {/*                        <Image*/}
                {/*                            className="tw-box-content tw-rounded-full tw-border-2 tw-border-white"*/}
                {/*                            src={''}*/}
                {/*                            width="28"*/}
                {/*                            height="28"*/}
                {/*                            alt="User 03"*/}
                {/*                        />*/}
                {/*                        <Image*/}
                {/*                            className="tw-box-content tw-rounded-full tw-border-2 tw-border-white"*/}
                {/*                            src={''}*/}
                {/*                            width="28"*/}
                {/*                            height="28"*/}
                {/*                            alt="User 04"*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                    <div className="text-slate-400 tw-text-xs tw-font-medium tw-italic">*/}
                {/*                        +132*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </article>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default MainContent;
