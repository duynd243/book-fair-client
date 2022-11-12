import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const MyComponent = () => {
    const router = useRouter();

    console.log(router.query.id);

    return (
        <div className="tw-mx-auto tw-flex tw-max-w-5xl tw-flex-col lg:tw-flex-row lg:tw-space-x-8 xl:tw-space-x-16">
            {/* Content */}
            <div>
                <div className="tw-mb-6">
                    <Link
                        className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600 tw-bg-white tw-px-3"
                        href="/community/meetups"
                    >
                        <svg
                            className="text-slate-400 tw-mr-2 tw-fill-current"
                            width="7"
                            height="12"
                            viewBox="0 0 7 12"
                        >
                            <path d="M5.4.6 6.8 2l-4 4 4 4-1.4 1.4L0 6z" />
                        </svg>
                        <span>Back To Meetups</span>
                    </Link>
                </div>
                <div className="tw-mb-2 tw-text-sm tw-font-semibold tw-uppercase tw-text-indigo-500">
                    Mon 27 Dec, 2021 - 9:00 PM -&gt; 10:00 PM
                </div>
                <header className="tw-mb-4">
                    {/* Title */}
                    <h1 className="text-slate-800 tw-mb-2 tw-text-2xl tw-font-bold md:tw-text-3xl">
                        The World of AI and Machine Learning — Open Chat
                    </h1>
                    <p>
                        Lorem ipsum is placeholder text commonly used in the
                        graphic, print, and publishing industries for previewing
                        layouts.
                    </p>
                </header>

                {/* Meta */}
                <div className="tw-mb-6 tw-space-y-3 sm:tw-flex sm:tw-items-center sm:tw-justify-between sm:tw-space-y-0">
                    {/* Author */}
                    <div className="tw-flex tw-items-center sm:tw-mr-4">
                        <a className="shrink-0 tw-mr-2 tw-block" href="#0">
                            <Image
                                className="tw-rounded-full"
                                src={''}
                                width="32"
                                height="32"
                                alt="User 04"
                            />
                        </a>
                        <div className="tw-whitespace-nowrap tw-text-sm">
                            Hosted by{' '}
                            <a
                                className="text-slate-800 tw-font-semibold"
                                href="#0"
                            >
                                Monica Fishkin
                            </a>
                        </div>
                    </div>
                    {/* Right side */}
                    <div className="tw-flex tw-flex-wrap tw-items-center tw-space-x-2 sm:tw-justify-end">
                        {/* Tags */}
                        <div className="text-slate-600 tw-inline-flex tw-items-center tw-rounded-full tw-bg-white tw-px-2.5 tw-py-1 tw-text-center tw-text-xs tw-font-medium">
                            <svg
                                className="fill-slate-400 tw-mr-2 tw-h-3 tw-w-4"
                                viewBox="0 0 16 12"
                            >
                                <path d="m16 2-4 2.4V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.6l4 2.4V2ZM2 10V2h8v8H2Z" />
                            </svg>
                            <span>Online Event</span>
                        </div>
                        <div className="bg-emerald-100 text-emerald-600 tw-inline-flex tw-rounded-full tw-px-2.5 tw-py-1 tw-text-center tw-text-xs tw-font-medium tw-uppercase">
                            Free
                        </div>
                    </div>
                </div>

                {/* Image */}
                <figure className="tw-mb-6">
                    <Image
                        className="tw-w-full tw-rounded-sm"
                        src={''}
                        width="640"
                        height="360"
                        alt="Meetup"
                    />
                </figure>

                {/* Post content */}
                <div>
                    <h2 className="text-slate-800 tw-mb-2 tw-text-xl tw-font-bold tw-leading-snug">
                        Meetup Details
                    </h2>
                    <p className="tw-mb-6">
                        In the world of AI, behavioural predictions are leading
                        the charge to better machine learning.
                    </p>
                    <p className="tw-mb-6">
                        There is so much happening in the AI space. Advances in
                        the economic sectors have seen automated business
                        practices rapidly increasing economic value. While the
                        realm of the human sciences has used the power afforded
                        by computational capabilities to solve many human based
                        dilemmas. Even the art scene has adopted carefully
                        selected ML applications to usher in the technological
                        movement.
                    </p>
                    <p className="tw-mb-6">
                        Join us every second Wednesday as we host an open
                        discussion about the amazing things happening in the
                        world of AI and machine learning. Feel free to share
                        your experiences, ask questions, ponder the
                        possibilities, or just listen as we explore new topics
                        and revisit old ones.
                    </p>
                </div>
                <hr className="border-slate-200 tw-my-6 tw-border-t" />

                {/* Photos */}
                <div>
                    <h2 className="text-slate-800 tw-mb-2 tw-text-xl tw-font-bold tw-leading-snug">
                        Photos (3)
                    </h2>
                    <div className="tw-my-6 tw-grid tw-grid-cols-3 tw-gap-4">
                        <a className="tw-block" href="#0">
                            <Image
                                className="tw-w-full tw-rounded-sm"
                                src={''}
                                width="203"
                                height="152"
                                alt="Meetup photo 01"
                            />
                        </a>
                        <a className="tw-block" href="#0">
                            <Image
                                className="tw-w-full tw-rounded-sm"
                                src={''}
                                width="203"
                                height="152"
                                alt="Meetup photo 02"
                            />
                        </a>
                        <a className="tw-block" href="#0">
                            <Image
                                className="tw-w-full tw-rounded-sm"
                                src={''}
                                width="203"
                                height="152"
                                alt="Meetup photo 03"
                            />
                        </a>
                    </div>
                </div>

                <hr className="border-slate-200 tw-my-6 tw-border-t" />

                {/* Comments */}
                <div>
                    <h2 className="text-slate-800 tw-mb-2 tw-text-xl tw-font-bold tw-leading-snug">
                        Comments (3)
                    </h2>
                    <ul className="tw-my-6 tw-space-y-5">
                        {/* Comment */}
                        <li className="tw-flex tw-items-start">
                            <a className="shrink-0 tw-mr-3 tw-block" href="#0">
                                <Image
                                    className="tw-rounded-full"
                                    src={''}
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
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam.”
                                </div>
                            </div>
                        </li>
                        {/* Comment */}
                        <li className="tw-flex tw-items-start">
                            <a className="shrink-0 tw-mr-3 tw-block" href="#0">
                                <Image
                                    className="tw-rounded-full"
                                    src={''}
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
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam.”
                                </div>
                            </div>
                        </li>
                        {/* Comment */}
                        <li className="tw-flex tw-items-start">
                            <a className="shrink-0 tw-mr-3 tw-block" href="#0">
                                <Image
                                    className="tw-rounded-full"
                                    src={''}
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
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam.”
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <hr className="border-slate-200 tw-my-6 tw-border-t" />

                {/* Similar Meetups */}
                <div>
                    <h2 className="text-slate-800 tw-mb-2 tw-text-xl tw-font-bold tw-leading-snug">
                        Similar Meetups
                    </h2>
                    <div className="tw-my-6 tw-space-y-8 sm:tw-space-y-5 lg:tw-mb-0">
                        {/* Related item */}
                        <article className="border-slate-200 tw-flex tw-overflow-hidden tw-rounded-sm tw-border tw-bg-white tw-shadow-lg">
                            {/* Image */}
                            <a
                                className="lg:sidebar-expanded:tw-w-20 xl:sidebar-expanded:tw-w-56 shrink-0 tw-relative tw-block tw-w-24 sm:tw-w-56"
                                href="#0"
                            >
                                <Image
                                    className="tw-absolute tw-h-full tw-w-full tw-object-cover tw-object-center"
                                    src={''}
                                    width="220"
                                    height="236"
                                    alt="Meetup 02"
                                />
                                {/* Like button */}
                                <button className="tw-absolute tw-top-0 tw-right-0 tw-mt-4 tw-mr-4">
                                    <div className="text-slate-100 bg-slate-900 tw-rounded-full tw-bg-opacity-60">
                                        <span className="tw-sr-only">Like</span>
                                        <svg
                                            className="tw-h-8 tw-w-8 tw-fill-current"
                                            viewBox="0 0 32 32"
                                        >
                                            <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z" />
                                        </svg>
                                    </div>
                                </button>
                            </a>
                            {/* Content */}
                            <div className="grow tw-flex tw-flex-col tw-p-5">
                                <div className="grow">
                                    <div className="tw-mb-2 tw-text-sm tw-font-semibold tw-uppercase tw-text-indigo-500">
                                        Mon 27 Dec, 2021
                                    </div>
                                    <a
                                        className="tw-mb-2 tw-inline-flex"
                                        href="#0"
                                    >
                                        <h3 className="text-slate-800 tw-text-lg tw-font-bold">
                                            New York &amp; New Jersey Virtual
                                            Retreat 2021
                                        </h3>
                                    </a>
                                    <div className="tw-text-sm">
                                        Lorem ipsum is placeholder text commonly
                                        used in the graphic, print, and
                                        publishing industries for previewing
                                        layouts.
                                    </div>
                                </div>
                                {/* Footer */}
                                <div className="tw-mt-3 tw-flex tw-justify-between">
                                    {/* Tag */}
                                    <div className="bg-slate-100 text-slate-600 tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-1 tw-text-center tw-text-xs tw-font-medium">
                                        <svg
                                            className="fill-slate-400 tw-mr-2 tw-h-3 tw-w-4"
                                            viewBox="0 0 16 12"
                                        >
                                            <path d="m16 2-4 2.4V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.6l4 2.4V2ZM2 10V2h8v8H2Z" />
                                        </svg>
                                        <span>Online Event</span>
                                    </div>
                                    {/* Avatars */}
                                    <div className="tw-flex tw-items-center tw-space-x-2">
                                        <div className="tw--ml-0.5 tw-flex tw--space-x-3">
                                            <Image
                                                className="tw-box-content tw-rounded-full tw-border-2 tw-border-white"
                                                src={''}
                                                width="28"
                                                height="28"
                                                alt="User 02"
                                            />
                                            <Image
                                                className="tw-box-content tw-rounded-full tw-border-2 tw-border-white"
                                                src={''}
                                                width="28"
                                                height="28"
                                                alt="User 03"
                                            />
                                            <Image
                                                className="tw-box-content tw-rounded-full tw-border-2 tw-border-white"
                                                src={''}
                                                width="28"
                                                height="28"
                                                alt="User 04"
                                            />
                                        </div>
                                        <div className="text-slate-400 tw-text-xs tw-font-medium tw-italic">
                                            +132
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="tw-space-y-4">
                {/* 1st tw-block */}
                <div className="border-slate-200 tw-rounded-sm tw-border tw-bg-white tw-p-5 tw-shadow-lg lg:tw-w-72 xl:tw-w-80">
                    <div className="tw-space-y-2">
                        <button className="btn tw-w-full tw-bg-indigo-500 tw-text-white hover:tw-bg-indigo-600">
                            <svg
                                className="shrink-0 tw-h-4 tw-w-4 tw-fill-current"
                                viewBox="0 0 16 16"
                            >
                                <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                            </svg>
                            <span className="tw-ml-1">Attending</span>
                        </button>
                        <button className="btn border-slate-200 hover:border-slate-300 text-slate-600 tw-w-full">
                            <svg
                                className="fill-rose-500 shrink-0 tw-h-4 tw-w-4"
                                viewBox="0 0 16 16"
                            >
                                <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                            </svg>
                            <span className="tw-ml-2">Favorite</span>
                        </button>
                    </div>
                </div>

                {/* 2nd tw-block */}
                <div className="border-slate-200 tw-rounded-sm tw-border tw-bg-white tw-p-5 tw-shadow-lg lg:tw-w-72 xl:tw-w-80">
                    <div className="tw-mb-5 tw-flex tw-justify-between tw-space-x-1">
                        <div className="text-slate-800 tw-text-sm tw-font-semibold">
                            Attendees (127)
                        </div>
                        <a
                            className="tw-text-sm tw-font-medium tw-text-indigo-500 hover:tw-text-indigo-600"
                            href="#0"
                        >
                            View All
                        </a>
                    </div>
                    <ul className="tw-space-y-3">
                        <li>
                            <div className="tw-flex tw-justify-between">
                                <div className="grow tw-flex tw-items-center">
                                    <div className="tw-relative tw-mr-3">
                                        <Image
                                            className="tw-h-8 tw-w-8 tw-rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 08"
                                        />
                                    </div>
                                    <div className="tw-truncate">
                                        <span className="text-slate-800 tw-text-sm tw-font-medium">
                                            Carolyn McNeail
                                        </span>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-500 tw-rounded-full">
                                    <span className="tw-sr-only">Menu</span>
                                    <svg
                                        className="tw-h-8 tw-w-8 tw-fill-current"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle cx="16" cy="16" r="2" />
                                        <circle cx="10" cy="16" r="2" />
                                        <circle cx="22" cy="16" r="2" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="tw-flex tw-justify-between">
                                <div className="grow tw-flex tw-items-center">
                                    <div className="tw-relative tw-mr-3">
                                        <Image
                                            className="tw-h-8 tw-w-8 tw-rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 01"
                                        />
                                    </div>
                                    <div className="tw-truncate">
                                        <span className="text-slate-800 tw-text-sm tw-font-medium">
                                            Dominik Lamakani
                                        </span>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-500 tw-rounded-full">
                                    <span className="tw-sr-only">Menu</span>
                                    <svg
                                        className="tw-h-8 tw-w-8 tw-fill-current"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle cx="16" cy="16" r="2" />
                                        <circle cx="10" cy="16" r="2" />
                                        <circle cx="22" cy="16" r="2" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="tw-flex tw-justify-between">
                                <div className="grow tw-flex tw-items-center">
                                    <div className="tw-relative tw-mr-3">
                                        <Image
                                            className="tw-h-8 tw-w-8 tw-rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 03"
                                        />
                                    </div>
                                    <div className="tw-truncate">
                                        <span className="text-slate-800 tw-text-sm tw-font-medium">
                                            Ivan Mesaros
                                        </span>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-500 tw-rounded-full">
                                    <span className="tw-sr-only">Menu</span>
                                    <svg
                                        className="tw-h-8 tw-w-8 tw-fill-current"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle cx="16" cy="16" r="2" />
                                        <circle cx="10" cy="16" r="2" />
                                        <circle cx="22" cy="16" r="2" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="tw-flex tw-justify-between">
                                <div className="grow tw-flex tw-items-center">
                                    <div className="tw-relative tw-mr-3">
                                        <Image
                                            className="tw-h-8 tw-w-8 tw-rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 05"
                                        />
                                    </div>
                                    <div className="tw-truncate">
                                        <span className="text-slate-800 tw-text-sm tw-font-medium">
                                            Maria Martinez
                                        </span>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-500 tw-rounded-full">
                                    <span className="tw-sr-only">Menu</span>
                                    <svg
                                        className="tw-h-8 tw-w-8 tw-fill-current"
                                        viewBox="0 0 32 32"
                                    >
                                        <circle cx="16" cy="16" r="2" />
                                        <circle cx="10" cy="16" r="2" />
                                        <circle cx="22" cy="16" r="2" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* 3rd tw-block */}
                <div className="border-slate-200 tw-rounded-sm tw-border tw-bg-white tw-p-5 tw-shadow-lg lg:tw-w-72 xl:tw-w-80">
                    <div className="tw-mb-5 tw-flex tw-justify-between tw-space-x-1">
                        <div className="text-slate-800 tw-text-sm tw-font-semibold">
                            Invite Friends
                        </div>
                        <a
                            className="tw-text-sm tw-font-medium tw-text-indigo-500 hover:tw-text-indigo-600"
                            href="#0"
                        >
                            View All
                        </a>
                    </div>
                    <ul className="tw-space-y-3">
                        <li>
                            <div className="tw-flex tw-items-center tw-justify-between">
                                <div className="grow tw-flex tw-items-center">
                                    <div className="tw-relative tw-mr-3">
                                        <Image
                                            className="tw-h-8 tw-w-8 tw-rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 02"
                                        />
                                    </div>
                                    <div className="tw-truncate">
                                        <span className="text-slate-800 tw-text-sm tw-font-medium">
                                            Haruki Masuno
                                        </span>
                                    </div>
                                </div>
                                <button className="tw-inline-flex tw-rounded-full tw-bg-indigo-100 tw-px-2.5 tw-py-1 tw-text-center tw-text-xs tw-font-medium tw-text-indigo-600">
                                    Invite
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="tw-flex tw-items-center tw-justify-between">
                                <div className="grow tw-flex tw-items-center">
                                    <div className="tw-relative tw-mr-3">
                                        <Image
                                            className="tw-h-8 tw-w-8 tw-rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 04"
                                        />
                                    </div>
                                    <div className="tw-truncate">
                                        <span className="text-slate-800 tw-text-sm tw-font-medium">
                                            Joe Huang
                                        </span>
                                    </div>
                                </div>
                                <button className="tw-inline-flex tw-rounded-full tw-bg-indigo-100 tw-px-2.5 tw-py-1 tw-text-center tw-text-xs tw-font-medium tw-text-indigo-600">
                                    Invite
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="tw-flex tw-items-center tw-justify-between">
                                <div className="grow tw-flex tw-items-center">
                                    <div className="tw-relative tw-mr-3">
                                        <Image
                                            className="tw-h-8 tw-w-8 tw-rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 06"
                                        />
                                    </div>
                                    <div className="tw-truncate">
                                        <span className="text-slate-800 tw-text-sm tw-font-medium">
                                            Carolyn McNeail
                                        </span>
                                    </div>
                                </div>
                                <button className="tw-inline-flex tw-rounded-full tw-bg-indigo-100 tw-px-2.5 tw-py-1 tw-text-center tw-text-xs tw-font-medium tw-text-indigo-600">
                                    Invite
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="tw-flex tw-items-center tw-justify-between">
                                <div className="grow tw-flex tw-items-center">
                                    <div className="tw-relative tw-mr-3">
                                        <Image
                                            className="tw-h-8 tw-w-8 tw-rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 08"
                                        />
                                    </div>
                                    <div className="tw-truncate">
                                        <span className="text-slate-800 tw-text-sm tw-font-medium">
                                            Lisa Sitwala
                                        </span>
                                    </div>
                                </div>
                                <button className="tw-inline-flex tw-rounded-full tw-bg-indigo-100 tw-px-2.5 tw-py-1 tw-text-center tw-text-xs tw-font-medium tw-text-indigo-600">
                                    Invite
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
