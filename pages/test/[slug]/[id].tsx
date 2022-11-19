import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const MyComponent = () => {
    const router = useRouter();

    console.log(router.query.id);

    return (
        <div className="mx-auto flex max-w-5xl flex-col lg:flex-row lg:space-x-8 xl:space-x-16">
            {/* Content */}
            <div>
                <div className="mb-6">
                    <Link
                        className="btn-sm border-slate-200 bg-white px-3 text-slate-600 hover:border-slate-300"
                        href="/community/meetups"
                    >
                        <svg
                            className="mr-2 fill-current text-slate-400"
                            width="7"
                            height="12"
                            viewBox="0 0 7 12"
                        >
                            <path d="M5.4.6 6.8 2l-4 4 4 4-1.4 1.4L0 6z" />
                        </svg>
                        <span>Back To Meetups</span>
                    </Link>
                </div>
                <div className="mb-2 text-sm font-semibold uppercase text-indigo-500">
                    Mon 27 Dec, 2021 - 9:00 PM -&gt; 10:00 PM
                </div>
                <header className="mb-4">
                    {/* Title */}
                    <h1 className="mb-2 text-2xl font-bold text-slate-800 md:text-3xl">
                        The World of AI and Machine Learning — Open Chat
                    </h1>
                    <p>
                        Lorem ipsum is placeholder text commonly used in the
                        graphic, print, and publishing industries for previewing
                        layouts.
                    </p>
                </header>

                {/* Meta */}
                <div className="mb-6 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-y-0">
                    {/* Author */}
                    <div className="flex items-center sm:mr-4">
                        <a className="mr-2 block shrink-0" href="#0">
                            <Image
                                className="rounded-full"
                                src={''}
                                width="32"
                                height="32"
                                alt="User 04"
                            />
                        </a>
                        <div className="whitespace-nowrap text-sm">
                            Hosted by{' '}
                            <a
                                className="font-semibold text-slate-800"
                                href="#0"
                            >
                                Monica Fishkin
                            </a>
                        </div>
                    </div>
                    {/* Right side */}
                    <div className="flex flex-wrap items-center space-x-2 sm:justify-end">
                        {/* Tags */}
                        <div className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-center text-xs font-medium text-slate-600">
                            <svg
                                className="mr-2 h-3 w-4 fill-slate-400"
                                viewBox="0 0 16 12"
                            >
                                <path d="m16 2-4 2.4V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.6l4 2.4V2ZM2 10V2h8v8H2Z" />
                            </svg>
                            <span>Online Event</span>
                        </div>
                        <div className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-center text-xs font-medium uppercase text-emerald-600">
                            Free
                        </div>
                    </div>
                </div>

                {/* Image */}
                <figure className="mb-6">
                    <Image
                        className="w-full rounded-sm"
                        src={''}
                        width="640"
                        height="360"
                        alt="Meetup"
                    />
                </figure>

                {/* Post content */}
                <div>
                    <h2 className="mb-2 text-xl font-bold leading-snug text-slate-800">
                        Meetup Details
                    </h2>
                    <p className="mb-6">
                        In the world of AI, behavioural predictions are leading
                        the charge to better machine learning.
                    </p>
                    <p className="mb-6">
                        There is so much happening in the AI space. Advances in
                        the economic sectors have seen automated business
                        practices rapidly increasing economic value. While the
                        realm of the human sciences has used the power afforded
                        by computational capabilities to solve many human based
                        dilemmas. Even the art scene has adopted carefully
                        selected ML applications to usher in the technological
                        movement.
                    </p>
                    <p className="mb-6">
                        Join us every second Wednesday as we host an open
                        discussion about the amazing things happening in the
                        world of AI and machine learning. Feel free to share
                        your experiences, ask questions, ponder the
                        possibilities, or just listen as we explore new topics
                        and revisit old ones.
                    </p>
                </div>
                <hr className="my-6 border-t border-slate-200" />

                {/* Photos */}
                <div>
                    <h2 className="mb-2 text-xl font-bold leading-snug text-slate-800">
                        Photos (3)
                    </h2>
                    <div className="my-6 grid grid-cols-3 gap-4">
                        <a className="block" href="#0">
                            <Image
                                className="w-full rounded-sm"
                                src={''}
                                width="203"
                                height="152"
                                alt="Meetup photo 01"
                            />
                        </a>
                        <a className="block" href="#0">
                            <Image
                                className="w-full rounded-sm"
                                src={''}
                                width="203"
                                height="152"
                                alt="Meetup photo 02"
                            />
                        </a>
                        <a className="block" href="#0">
                            <Image
                                className="w-full rounded-sm"
                                src={''}
                                width="203"
                                height="152"
                                alt="Meetup photo 03"
                            />
                        </a>
                    </div>
                </div>

                <hr className="my-6 border-t border-slate-200" />

                {/* Comments */}
                <div>
                    <h2 className="mb-2 text-xl font-bold leading-snug text-slate-800">
                        Comments (3)
                    </h2>
                    <ul className="my-6 space-y-5">
                        {/* Comment */}
                        <li className="flex items-start">
                            <a className="mr-3 block shrink-0" href="#0">
                                <Image
                                    className="rounded-full"
                                    src={''}
                                    width="32"
                                    height="32"
                                    alt="User 07"
                                />
                            </a>
                            <div className="grow">
                                <div className="mb-2 text-sm font-semibold text-slate-800">
                                    Taylor Nieman
                                </div>
                                <div className="italic">
                                    “Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam.”
                                </div>
                            </div>
                        </li>
                        {/* Comment */}
                        <li className="flex items-start">
                            <a className="mr-3 block shrink-0" href="#0">
                                <Image
                                    className="rounded-full"
                                    src={''}
                                    width="32"
                                    height="32"
                                    alt="User 08"
                                />
                            </a>
                            <div className="grow">
                                <div className="mb-2 text-sm font-semibold text-slate-800">
                                    Meagan Loyst
                                </div>
                                <div className="italic">
                                    “Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam.”
                                </div>
                            </div>
                        </li>
                        {/* Comment */}
                        <li className="flex items-start">
                            <a className="mr-3 block shrink-0" href="#0">
                                <Image
                                    className="rounded-full"
                                    src={''}
                                    width="32"
                                    height="32"
                                    alt="User 02"
                                />
                            </a>
                            <div className="grow">
                                <div className="mb-2 text-sm font-semibold text-slate-800">
                                    Frank Malik
                                </div>
                                <div className="italic">
                                    “Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam.”
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <hr className="my-6 border-t border-slate-200" />

                {/* Similar Meetups */}
                <div>
                    <h2 className="mb-2 text-xl font-bold leading-snug text-slate-800">
                        Similar Meetups
                    </h2>
                    <div className="my-6 space-y-8 sm:space-y-5 lg:mb-0">
                        {/* Related item */}
                        <article className="flex overflow-hidden rounded-sm border border-slate-200 bg-white shadow-lg">
                            {/* Image */}
                            <a
                                className="lg:sidebar-expanded:w-20 xl:sidebar-expanded:w-56 relative block w-24 shrink-0 sm:w-56"
                                href="#0"
                            >
                                <Image
                                    className="absolute h-full w-full object-cover object-center"
                                    src={''}
                                    width="220"
                                    height="236"
                                    alt="Meetup 02"
                                />
                                {/* Like button */}
                                <button className="absolute top-0 right-0 mt-4 mr-4">
                                    <div className="rounded-full bg-slate-900 bg-opacity-60 text-slate-100">
                                        <span className="sr-only">Like</span>
                                        <svg
                                            className="h-8 w-8 fill-current"
                                            viewBox="0 0 32 32"
                                        >
                                            <path d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z" />
                                        </svg>
                                    </div>
                                </button>
                            </a>
                            {/* Content */}
                            <div className="flex grow flex-col p-5">
                                <div className="grow">
                                    <div className="mb-2 text-sm font-semibold uppercase text-indigo-500">
                                        Mon 27 Dec, 2021
                                    </div>
                                    <a className="mb-2 inline-flex" href="#0">
                                        <h3 className="text-lg font-bold text-slate-800">
                                            New York &amp; New Jersey Virtual
                                            Retreat 2021
                                        </h3>
                                    </a>
                                    <div className="text-sm">
                                        Lorem ipsum is placeholder text commonly
                                        used in the graphic, print, and
                                        publishing industries for previewing
                                        layouts.
                                    </div>
                                </div>
                                {/* Footer */}
                                <div className="mt-3 flex justify-between">
                                    {/* Tag */}
                                    <div className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-center text-xs font-medium text-slate-600">
                                        <svg
                                            className="mr-2 h-3 w-4 fill-slate-400"
                                            viewBox="0 0 16 12"
                                        >
                                            <path d="m16 2-4 2.4V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.6l4 2.4V2ZM2 10V2h8v8H2Z" />
                                        </svg>
                                        <span>Online Event</span>
                                    </div>
                                    {/* Avatars */}
                                    <div className="flex items-center space-x-2">
                                        <div className="-ml-0.5 flex -space-x-3">
                                            <Image
                                                className="box-content rounded-full border-2 border-white"
                                                src={''}
                                                width="28"
                                                height="28"
                                                alt="User 02"
                                            />
                                            <Image
                                                className="box-content rounded-full border-2 border-white"
                                                src={''}
                                                width="28"
                                                height="28"
                                                alt="User 03"
                                            />
                                            <Image
                                                className="box-content rounded-full border-2 border-white"
                                                src={''}
                                                width="28"
                                                height="28"
                                                alt="User 04"
                                            />
                                        </div>
                                        <div className="text-xs font-medium italic text-slate-400">
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
            <div className="space-y-4">
                {/* 1st block */}
                <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-lg lg:w-72 xl:w-80">
                    <div className="space-y-2">
                        <button className="btn w-full bg-indigo-500 text-white hover:bg-indigo-600">
                            <svg
                                className="h-4 w-4 shrink-0 fill-current"
                                viewBox="0 0 16 16"
                            >
                                <path d="m2.457 8.516.969-.99 2.516 2.481 5.324-5.304.985.989-6.309 6.284z" />
                            </svg>
                            <span className="ml-1">Attending</span>
                        </button>
                        <button className="btn w-full border-slate-200 text-slate-600 hover:border-slate-300">
                            <svg
                                className="h-4 w-4 shrink-0 fill-rose-500"
                                viewBox="0 0 16 16"
                            >
                                <path d="M14.682 2.318A4.485 4.485 0 0 0 11.5 1 4.377 4.377 0 0 0 8 2.707 4.383 4.383 0 0 0 4.5 1a4.5 4.5 0 0 0-3.182 7.682L8 15l6.682-6.318a4.5 4.5 0 0 0 0-6.364Zm-1.4 4.933L8 12.247l-5.285-5A2.5 2.5 0 0 1 4.5 3c1.437 0 2.312.681 3.5 2.625C9.187 3.681 10.062 3 11.5 3a2.5 2.5 0 0 1 1.785 4.251h-.003Z" />
                            </svg>
                            <span className="ml-2">Favorite</span>
                        </button>
                    </div>
                </div>

                {/* 2nd block */}
                <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-lg lg:w-72 xl:w-80">
                    <div className="mb-5 flex justify-between space-x-1">
                        <div className="text-sm font-semibold text-slate-800">
                            Attendees (127)
                        </div>
                        <a
                            className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                            href="#0"
                        >
                            View All
                        </a>
                    </div>
                    <ul className="space-y-3">
                        <li>
                            <div className="flex justify-between">
                                <div className="flex grow items-center">
                                    <div className="relative mr-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 08"
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            Carolyn McNeail
                                        </span>
                                    </div>
                                </div>
                                <button className="rounded-full text-slate-400 hover:text-slate-500">
                                    <span className="sr-only">Menu</span>
                                    <svg
                                        className="h-8 w-8 fill-current"
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
                            <div className="flex justify-between">
                                <div className="flex grow items-center">
                                    <div className="relative mr-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 01"
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            Dominik Lamakani
                                        </span>
                                    </div>
                                </div>
                                <button className="rounded-full text-slate-400 hover:text-slate-500">
                                    <span className="sr-only">Menu</span>
                                    <svg
                                        className="h-8 w-8 fill-current"
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
                            <div className="flex justify-between">
                                <div className="flex grow items-center">
                                    <div className="relative mr-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 03"
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            Ivan Mesaros
                                        </span>
                                    </div>
                                </div>
                                <button className="rounded-full text-slate-400 hover:text-slate-500">
                                    <span className="sr-only">Menu</span>
                                    <svg
                                        className="h-8 w-8 fill-current"
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
                            <div className="flex justify-between">
                                <div className="flex grow items-center">
                                    <div className="relative mr-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 05"
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            Maria Martinez
                                        </span>
                                    </div>
                                </div>
                                <button className="rounded-full text-slate-400 hover:text-slate-500">
                                    <span className="sr-only">Menu</span>
                                    <svg
                                        className="h-8 w-8 fill-current"
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

                {/* 3rd block */}
                <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-lg lg:w-72 xl:w-80">
                    <div className="mb-5 flex justify-between space-x-1">
                        <div className="text-sm font-semibold text-slate-800">
                            Invite Friends
                        </div>
                        <a
                            className="text-sm font-medium text-indigo-500 hover:text-indigo-600"
                            href="#0"
                        >
                            View All
                        </a>
                    </div>
                    <ul className="space-y-3">
                        <li>
                            <div className="flex items-center justify-between">
                                <div className="flex grow items-center">
                                    <div className="relative mr-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 02"
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            Haruki Masuno
                                        </span>
                                    </div>
                                </div>
                                <button className="inline-flex rounded-full bg-indigo-100 px-2.5 py-1 text-center text-xs font-medium text-indigo-600">
                                    Invite
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center justify-between">
                                <div className="flex grow items-center">
                                    <div className="relative mr-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 04"
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            Joe Huang
                                        </span>
                                    </div>
                                </div>
                                <button className="inline-flex rounded-full bg-indigo-100 px-2.5 py-1 text-center text-xs font-medium text-indigo-600">
                                    Invite
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center justify-between">
                                <div className="flex grow items-center">
                                    <div className="relative mr-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 06"
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            Carolyn McNeail
                                        </span>
                                    </div>
                                </div>
                                <button className="inline-flex rounded-full bg-indigo-100 px-2.5 py-1 text-center text-xs font-medium text-indigo-600">
                                    Invite
                                </button>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center justify-between">
                                <div className="flex grow items-center">
                                    <div className="relative mr-3">
                                        <Image
                                            className="h-8 w-8 rounded-full"
                                            src={''}
                                            width="32"
                                            height="32"
                                            alt="User 08"
                                        />
                                    </div>
                                    <div className="truncate">
                                        <span className="text-sm font-medium text-slate-800">
                                            Lisa Sitwala
                                        </span>
                                    </div>
                                </div>
                                <button className="inline-flex rounded-full bg-indigo-100 px-2.5 py-1 text-center text-xs font-medium text-indigo-600">
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
