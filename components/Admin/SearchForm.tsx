import React from 'react';

type Props = {
    placeholder?: string;
};

const SearchForm: React.FC<Props> = ({ placeholder = 'Tìm kiếm...' }) => {
    return (
        <form className="tw-relative">
            <label htmlFor="action-search" className="tw-sr-only">
                Search
            </label>
            <input
                id="action-search"
                className="tw-form-input tw-rounded tw-border tw-border-slate-200 tw-bg-white tw-py-2 tw-px-3 tw-pl-9 tw-text-sm tw-leading-5 tw-text-slate-800 tw-placeholder-slate-400 tw-shadow-sm hover:tw-border-slate-300 focus:tw-border-slate-500 focus:tw-border-slate-300 focus:tw-ring-0"
                type="search"
                placeholder={placeholder}
            />
            <button
                className="tw-group tw-absolute tw-inset-0 tw-right-auto"
                type="submit"
                aria-label="Search"
            >
                <svg
                    className="tw-ml-3 tw-mr-2 tw-h-4 tw-w-4 tw-shrink-0 tw-fill-current tw-text-slate-400 group-hover:tw-text-slate-500"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
            </button>
        </form>
    );
};

export default SearchForm;
